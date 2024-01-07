let vm = new Vue({
    el: '#app',
    data: {
        columns: {},
        trash: {},
        views: {},
        spinner: true
    },
    methods: {
        conversion(event) {
            let id = event.target.dataset.id;
            jwtFetch('/private/view/' + id)
                .then(response => response.json())
                .then((data) => vm.top['_' + id].count = data.views);
        },

        loadAdminData() {
            jwtFetch('/private/data/admin')
                .then(response => response.json())
                .then(data => {
                    this.columns = data.columns;
                    this.trash = data.trash;
                    this.views = data.views;
                    this.spinner = false;
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
