$(function () {
        window.functions = {
            getData: async function () {
                window.data = await jwtFetch('/private/data/index');
                if (jwtSuccess()) {
                    let vm = new Vue({
                        el: '#app',
                        data: {
                            columns: {},
                            top: {},

                            debug: true,
                            requestDataFail: false,
                            status: 200,

                            seen: true,
                        },
                        methods: {
                            async conversion(event) {
                                let id = event.target.dataset.id;
                                await jwtFetch('/private/link/view/' + id);
                            },
                            loadIndexData() {
                                vm.columns = data.data.columns;
                                vm.top = data.data.top;
                            }
                        }
                    });

                    vm.loadIndexData();
                } else {
                    modalLogin.show();
                }
            }
        }
        ;

        (async () => await functions.getData())();
    }
);
