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

            seen: false,
        },
        methods: {
            async conversion(event) {
                let id = event.target.dataset.id;
                jwtFetch('/private/link/view/' + id)
                    .then(response => response.json())
                    .then((data) => vm.top['s' + id].count = data.views);
            },
            loadAdminData() {
                spinner();
                jwtFetch('/private/data/admin')
                    .then(response => response.json())
                    .then(data => {
                        this.columns = data.columns;
                        this.trash = data.trash;
                        this.views = data.views;
                        $('#app').removeClass('display-none');
                        stopSpinner();
                    });
            },

            loadBlock: vmBlock.load,
            unlinkBlock: vmBlock.unlink,
            newBlock: vmBlock.new,
            recoveryBlock: vmBlock.recovery,

            loadLink: vmLink.load,
            unlinkLink: vmLink.unlink,
            newLink: vmLink.new,
            recoveryLink: vmLink.recovery
        }
    });

    vm.loadAdminData();
});
