$(function () {
    window.vm = new Vue({
        el: '#app',
        data: {
            columns: {},
            trash: {},
            views: {},

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
            loadAdminData() {
                spinner();
                jwtFetch('/private/data/admin')
                    .then((data) => {
                        console.log(data)
                        vm.columns = data.data.columns;
                        vm.trash = data.data.trash;
                        vm.views = data.data.views;
                        stopSpinner();
                    });
            },

            loadBlock: vmBlock.load,
            unlinkBlock: vmBlock.unlink,
            newBlock: vmBlock.new,

            loadLink: vmLink.load,
            unlinkLink: vmLink.unlink,
            newLink: vmLink.new
        }
    });

    vm.loadAdminData();
});
