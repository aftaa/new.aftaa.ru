class jwt {
    constructor(getCredentialsFunction, debug = true) {
        this.getCredentialsFunction = getCredentialsFunction;
        this.debug = debug;
    }

    async tryFetch(uri, method = 'GET', body = null) {
        let token = localStorage.getItem('token');

        if (!token) {
            if (this.debug) {
                console.log('No token in local storage');
            }
            token = this.getToken();
        } else {
            if (this.debug) {
                console.log('Token found in local storage');
            }
        }

        let options = {
            method: method,
            headers: {
                'Authorization': 'Bearer ' + token
            }
        };
        if (body) {
            options.body = JSON.stringify(body);
        }

        let response = await fetch(host + '/' + uri, options);
        let answer = await response.json();
        console.log('answer: ', answer);
        return answer;

        // let response = await this.innerTryFetch(uri, method, body, token);
        // let answer = await response.json();

        // if (401 == response.status) {
        //     if (this.debug) {
        //         console.log(answer.message);
        //     }
        //     token = this.getToken();
        //     let response = await this.innerTryFetch(uri, method, body, token);
        // } else {
        //     return answer;
        // }
    }

    async innerTryFetch(uri, method, body, token) {
        let options = {
            method: method,
            headers: {
                'Authorization': 'Bearer ' + token
            }
        };
        if (body) {
            options.body = JSON.stringify(body);
        }
        return await fetch(host + '/' + uri, options);
    }

    async getToken() {
        let getCredentialsFunction = this.getCredentialsFunction;
        let credentials = getCredentialsFunction();

        if (this.debug) {
            console.log('Credentials: username=' + credentials.username + ', password=' + credentials.password);
        }

        let response = await fetch(host + '/login_check', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: credentials.username,
                password: credentials.password
            })
        });
        let answer = await response.json();

        if (this.debug) {
            console.log('Received token: ', answer.token);
        }

        localStorage.setItem('token', answer.token);
        return answer.token;
    }
}

async function jwtFetchToken(credentials) {
    let response = await fetch(host + '/login_check', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(credentials)
    })
    let answer = await response.json();
    localStorage.setItem('token', answer.token);
}

async function jwtFetchResponse(uri, method, body = null) {
    if (!localStorage.getItem('token')) {
        await jwtFetchToken();
    }

    let options = {
        method: method,
        headers: {
            'Authorisation': 'Beaver ' + localStorage.getItem('token');
        }
    };

    if (body) {
        options.body = JSON.stringify(body);
    }

    return await fetch(host + uri, options);
}

async function jwtTestFetch() {
    let response = await jwtFetchResponse('/private/blocks', 'POST');
    if (401 === response.status) {

    }
}