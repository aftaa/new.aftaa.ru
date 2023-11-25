function jwtFetch(url, method = 'GET', body = null, repeat = 10) {

    if (0 === repeat--) {
        throw new Error('Количество попыток авторизоваться исчерпано');
    }

    let options = {
        method: method,
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + localStorage.token,
            'Content-Type': 'application/json'
        }
    };

    if (null !== body) {
        options.body = JSON.stringify(body);
    }

    return fetch(host + url, options)
        .then(response => {
            if (200 !== response.status) {
                return fetch(host + '/login_check', {
                    body: JSON.stringify({
                        username: localStorage.username,
                        password: localStorage.password
                    }),
                    headers: {'Content-Type': 'application/json'},
                    method: 'POST'
                })
                    .then(response => {
                        if (200 !== response.status) {
                            // $('#email,#password').addClass('is-invalid');
                            modalLogin.show();
                            $('#email').val(localStorage.username);
                            $('#password').val(localStorage.password);
                            $('#formLogin').on('submit', () => {
                                localStorage.username = $('#email').val();
                                localStorage.password = $('#password').val();
                            })
                        } else {
                            return response.json()
                                .then(data => {
                                    localStorage.token = data.token
                                    return jwtFetch(url, method, body, repeat);
                                })
                        }
                    })
            } else {
                $('#email,#password').addClass('is-valid');
                setTimeout(function () {
                    modalLogin.hide();
                    $('#email,#password').removeClass('is-valid');
                }, 1500);
                return response;
            }
        })
}
