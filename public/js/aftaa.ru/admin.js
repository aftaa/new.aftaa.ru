$(function () {
        window.functions = {
            getData: async function () {
                window.data = await jwtFetch('/private/data/admin');
                if (jwtSuccess()) {
                    let vm = new Vue({
                        el: '#app',
                        data: {
                            columns: {},
                            trash: {},
                            views: {},

                            // debug: true,
                            requestDataFail: false,
                            status: 200,

                            seen: true,
                        },
                        methods: {
                            async conversion(event) {
                                let id = event.target.dataset.id;
                                await jwtFetch('/private/link/view/' + id);
                            },
                            loadAdminData() {
                                vm.columns = data.data.columns;
                                vm.trash = data.data.trash;
                                vm.views = data.data.views;
                            },

                            blocks: {
                                new: vmBlock.new,
                                add: vmBlock.add,
                                load: vmBlock.load,
                                save: vmBlock.save,
                            },

                            loadBlock: vmBlock.load
                        }
                    });

                    vm.loadAdminData();
                } else {
                    modalLogin.show();
                }
            }
        }
        ;

        (async () => await functions.getData())();
    }
);
