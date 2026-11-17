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
            const id = event.target.dataset.id;

            jwtFetch('/private/view/' + id)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    this.views[id] = data.views;
                })
                .catch(error => {
                    console.error('Не удалось обновить просмотры:', error);
                });
        },

        loadAdminData() {
            this.spinner = true;

            jwtFetch('/private/data/admin')
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    this.columns = data.columns;
                    this.trash = data.trash;
                    this.views = data.views;
                })
                .catch(error => {
                    console.error('Не удалось загрузить данные админки:', error);
                    alert('Не удалось загрузить данные админки');
                })
                .finally(() => {
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
