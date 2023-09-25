/**
 * @returns {Promise<void>}
 */
async function jwtFetchToken() {
    if (!localStorage.username || !localStorage.password) {
        console.log('Bad credentials');
        localStorage.setItem('token', 'invalid');
        return;
    }
    let response = await fetch(host + '/login_check', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            username: localStorage.username,
            password: localStorage.password
        })
    })
    let answer = await response.json();
    if (answer.token) {
        console.log('Received token');
        localStorage.setItem('token', answer.token);
    } else {
        localStorage.setItem('token', 'invalid');
    }
}

/**
 * @param uri
 * @param method
 * @param body
 * @returns {Promise<Response>}
 */
async function jwtFetchResponse(uri, method = 'GET', body = null) {
    let options = {
        method: method,
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    };

    if (body) {
        options.body = JSON.stringify(body);
    }
    return await fetch(host + uri, options);
}

/**
 * @param uri
 * @param method
 * @param body
 * @returns {Promise<any>}
 */
async function jwtFetch(uri, method = 'GET', body = null) {
    await jwtLogin();
    return await jwtFetchResponse(uri, method, body)
        .then((response) => response.json());
}

/**
 * @returns {Promise<void>}
 */
async function jwtLogin() {
    if (!localStorage.getItem('token')) {
        await jwtFetchToken();
    } else {
        let response = await jwtFetchResponse('/private/test');
        if (401 === response.status) {
            await jwtFetchToken();
        }
    }
}

/**
 * @returns {boolean}
 */
function jwtSuccess() {
    return localStorage.token !== 'invalid';
}
