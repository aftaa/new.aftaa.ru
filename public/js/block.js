let vmBlock = new Vue({
    el: '#formBlock',
    data: {
        id: null,
        name: '',
        col: 0,
        sort: 0,
        private: false,
        disabled: false,
        api: '/private/block/',
        keys: ['name', 'col', 'sort', 'private'],
        modal: new bootstrap.Modal('#modalBlock')
    },
    methods: {
        new() {
            this.id = null;
            this.name = '';
            this.col = 0;
            this.sort = 0;
            this.private = false;
            this.modal.show();
        },

        add(event) {
            event.preventDefault();
            this.disabled = true;
            vm.spinner = true;

            const body = {
                name: this.name,
                col: this.col,
                sort: this.sort,
                private: this.private ?? false
            };

            jwtFetch(this.api, 'POST', body)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP ${response.status}`);
                    }
                    this.modal.hide();
                    vm.loadAdminData();
                })
                .catch(error => {
                    console.error('Не удалось добавить блок:', error);
                    alert('Не удалось добавить блок');
                })
                .finally(() => {
                    this.disabled = false;
                    vm.spinner = false;
                });

            return false;
        },

        load(event) {
            vm.spinner = true;
            this.id = event.target.dataset.id;

            jwtFetch(this.api + this.id)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP ${response.status}`);
                    }
                    return response.json();
                })
                .then(block => {
                    this.name = block.name;
                    this.col = block.col;
                    this.sort = block.sort;
                    this.private = block.private;
                    this.modal.show();
                })
                .catch(error => {
                    console.error('Не удалось загрузить блок:', error);
                    alert('Не удалось загрузить блок');
                })
                .finally(() => {
                    vm.spinner = false;
                });
        },

        save(event) {
            event.preventDefault();
            this.disabled = true;
            vm.spinner = true;

            const body = {
                name: this.name,
                col: this.col,
                sort: this.sort,
                private: this.private ?? false
            };

            jwtFetch(this.api + this.id, 'PUT', body)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP ${response.status}`);
                    }
                    this.modal.hide();
                    vm.loadAdminData();
                })
                .catch(error => {
                    console.error('Не удалось сохранить блок:', error);
                    alert('Не удалось сохранить блок');
                })
                .finally(() => {
                    this.disabled = false;
                    vm.spinner = false;
                });

            return false;
        },

        unlink(event) {
            vm.spinner = true;

            jwtFetch(this.api + event.target.dataset.id, 'DELETE')
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP ${response.status}`);
                    }
                    vm.loadAdminData();
                })
                .catch(error => {
                    console.error('Не удалось удалить блок:', error);
                    alert('Не удалось удалить блок');
                })
                .finally(() => {
                    vm.spinner = false;
                });
        },

        recovery(event) {
            vm.spinner = true;

            jwtFetch(this.api + event.target.dataset.id, 'PATCH')
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP ${response.status}`);
                    }
                    vm.loadAdminData();
                })
                .catch(error => {
                    console.error('Не удалось восстановить блок:', error);
                    alert('Не удалось восстановить блок');
                })
                .finally(() => {
                    vm.spinner = false;
                });
        },

        submit(event) {
            this.id ? this.save(event) : this.add(event);
        }
    }
});
