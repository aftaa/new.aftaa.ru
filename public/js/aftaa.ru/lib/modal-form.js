$(function () {
    if (true) {
        // localStorage.token += 'asd';
        // delete localStorage.username;
        // delete localStorage.password;
    }

    $('#email').val(localStorage.username);
    $('#password').val(localStorage.password);

    $('#email,#password').on('focus keyup', function () {
        $(this).removeClass('is-invalid');
    })

    $('#form').on('submit', function () {
        localStorage.username = $('#email').val();
        localStorage.password = $('#password').val();
        (async function () {
            await jwtFetchToken();
            if (jwtSuccess()) {
                $('#email,#password').addClass('is-valid');
                setTimeout(function () {
                    modal.hide();
                    $('#email,#password').removeClass('is-valid');
                }, 1500);
                await functions.getData();
            } else {
                $('#email,#password').addClass('is-invalid');
            }
        })();
        return false;
    })
});
