$(function () {
        window.functions = {
            getData: async function () {
                spinner();
                await jwtFetch('/private/data/index')
                    .then(response => response.json())
                    .then(data => window.data = data);
                if (jwtSuccess()) {
                    let vm = new Vue({
                        el: '#app',
                        data: {
                            columns: {},
                            top: {},
                            last: {},

                            debug: true,
                            requestDataFail: false,
                            status: 200,

                            seen: true,
                        },
                        methods: {
                            async conversion(event) {
                                let id = event.target.dataset.id;
                                jwtFetch('/private/view/' + id)
                                    .then(response => response.json())
                                    .then(data => vm.top['_' + id].count = data.views);
                            },
                            updateLast: (event) => {
                                jwtFetch('/private/data/last')
                                    .then(response => response.json())
                                    .then(data => vm.last = data);
                                let id = event.target.dataset.id;
                                jwtFetch('/private/view/' + id);
                            },
                            loadIndexData() {
                                vm.columns = data.data.columns;
                                vm.top = data.data.top;
                                vm.last = data.data.last;
                                $('#app').removeClass('display-none');
                                stopSpinner();
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
