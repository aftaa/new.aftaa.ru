$(function () {
    window.functions = {
        getData: async function () {
            window.blocks = await jwtFetch('/private/blocks');
            if (jwtSuccess()) {
                console.log(blocks);
            } else {
                modal.show();
            }
        }
    };

    (async () => await functions.getData())();
});
