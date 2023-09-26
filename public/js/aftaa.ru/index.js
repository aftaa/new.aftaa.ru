$(function () {
        window.functions = {
            getData: async function () {
                window.data = await jwtFetch('/private/index');
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
                            conversion(event) {
                                let id = event.target.dataset.id;
                                (async function () {
                                    await jwtFetch('/private/link/view/' + id);
                                })();
                            },
                            loadIndexData() {
                                vm.columns = data.data.columns;
                                vm.top = data.data.top;
                                console.log(data)
                            }
                        }
                    });

                    vm.loadIndexData();
                } else {
                    modal.show();
                }
            }
        }
        ;

        (async () => await functions.getData())();
    }
)
;
