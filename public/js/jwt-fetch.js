/**
 * Обёртка над fetch с автоматическим обновлением JWT.
 *
 * @param {string} url      Путь относительно host
 * @param {string} method   HTTP-метод
 * @param {object|null} body Тело запроса (будет JSON.stringify)
 * @param {number} retriesLeft Сколько раз можно попробовать обновить токен
 * @returns {Promise<Response>}
 */
function jwtFetch(url, method = 'GET', body = null, retriesLeft = 1) {
    if (retriesLeft <= 0) {
        return Promise.reject(new Error('Количество попыток авторизоваться исчерпано'));
    }

    const options = {
        method,
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + (localStorage.token || ''),
            'Content-Type': 'application/json'
        }
    };

    if (body !== null) {
        options.body = JSON.stringify(body);
    }

    return fetch(host + url, options)
        .then(response => {
            if (response.status !== 401) {
                return response;
            }

            // Токен невалиден — пробуем логин
            if (!localStorage.username) localStorage.username = 'test';
            if (!localStorage.password) localStorage.password = 'test';

            return fetch(host + '/login_check', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    username: localStorage.username,
                    password: localStorage.password
                })
            })
                .then(loginResponse => {
                    if (loginResponse.status === 401) {
                        // Логин не удался — показываем модалку и отклоняем промис
                        modalLogin.show();
                        $('#email').val(localStorage.username);
                        $('#password').val(localStorage.password);

                        // Навешиваем обработчик один раз, предварительно снимая старый
                        $('#formLogin')
                            .off('submit.jwtFetch')
                            .on('submit.jwtFetch', () => {
                                localStorage.username = $('#email').val();
                                localStorage.password = $('#password').val();
                            });

                        return Promise.reject(new Error('Authentication failed'));
                    }

                    return loginResponse.json()
                        .then(data => {
                            localStorage.token = data.token;
                            return jwtFetch(url, method, body, retriesLeft - 1);
                        });
                });
        });
}
