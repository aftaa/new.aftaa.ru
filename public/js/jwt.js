/**
 * @param credentials
 * @returns {Promise<void>}
 */
async function jwtFetchToken(credentials) {
    let response = await fetch(host + '/login_check', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(credentials)
    })
    let answer = await response.json();
    localStorage.setItem('token', answer.token);
    console.log('Received access token ' + localStorage.token);
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
async function jwtFetch(uri, method = 'GET', body = null){
    return await jwtFetchResponse(uri, method, body)
        .then((response) => response.json());
}

/**
 * @param credentials
 * @returns {Promise<void>}
 */
async function jwtLogin(credentials) {
    if (!localStorage.getItem('token')) {
        await jwtFetchToken(credentials);
    } else {
        let response = await jwtFetchResponse('/private/test');
        if (401 === response.status) {
            await jwtFetchToken(credentials);
        }
    }
}
