$(function () {
    window.functions = {
        getData: async function () {
            window.data = await jwtFetch('/private/index');
            if (jwtSuccess()) {
                console.log(data);
            } else {
                modal.show();
            }
        }
    };

    (async () => await functions.getData())();
});
