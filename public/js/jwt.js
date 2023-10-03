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
        console.log('Received token ' + answer.token);
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
function jwtFetchResponse(uri, method = 'GET', body = null) {
    let options = {
        method: method,
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
            'Content-Type': 'application/json'
        }
    };

    if (body) {
        options.body = JSON.stringify(body);
    }
    return fetch(host + uri, options);
}

/**
 * @param uri
 * @param method
 * @param body
 * @returns {Promise<any>}
 */
async function jwtFetch(uri, method = 'GET', body = null) {
    await jwtLogin();
    return jwtFetchResponse(uri, method, body);
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

function jwtExit() {
    delete localStorage.username;
    delete localStorage.password;
    delete localStorage.token;
    modalLogin.show();
}

// function jwtFetch1(url, method = 'GET', body = null) {
//
//     let options = {
//         method: method,
//         headers: {
//             'Accept': 'application/json',
//             'Authorization': 'Bearer ' + localStorage.getItem('token'),
//             'Content-Type': 'application/json'
//         }
//     };
//
//     if (null !== body) {
//         options.body = JSON.stringify(body);
//     }
//
//     fetch(url, options)
//         .then(response => {
//             if (401 === response.status) {
//                 fetch('/login_check', {
//                     method: 'POST',
//                     headers: {'Content-Type': 'application/json'},
//                     body: JSON.stringify({
//                         username: localStorage.username,
//                         password: localStorage.password
//                     }).then(() => );
//                 })
//             } else {
//                 return response.json();
//             }
//         });
// }