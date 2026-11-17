let vmLink = new Vue({
    el: '#formLink',
    data: {
        id: null,
        block_id: 0,
        name: '',
        href: '',
        icon: '',
        private: false,
        blocks: null,
        disabled: false,
        api: '/private/link/',
        keys: ['name', 'href', 'icon', 'private'],
        modal: new bootstrap.Modal('#modalLink')
    },
    methods: {
        new(event) {
            vm.spinner = true;
            this.id = null;
            this.block_id = Number(event.target.dataset.blockId);
            this.name = '';
            this.href = '';
            this.icon = '';
            this.private = false;

            this.loadBlocks()
                .then(() => {
                    this.modal.show();
                })
                .catch(error => {
                    console.error('Не удалось загрузить блоки:', error);
                    alert('Не удалось загрузить блоки');
                })
                .finally(() => {
                    vm.spinner = false;
                });
        },

        add(event) {
            event.preventDefault();
            this.disabled = true;
            vm.spinner = true;

            const body = {
                block_id: Number(this.block_id),
                name: this.name,
                href: this.href,
                icon: this.icon ?? '',
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
                    console.error('Не удалось добавить ссылку:', error);
                    alert('Не удалось добавить ссылку');
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

            this.loadBlocks()
                .then(() => jwtFetch(this.api + this.id))
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP ${response.status}`);
                    }
                    return response.json();
                })
                .then(link => {
                    this.name = link.name;
                    this.href = link.href;
                    this.icon = link.icon;
                    this.private = link.private;
                    this.block_id = Number(link.block.id);
                    this.modal.show();
                })
                .catch(error => {
                    console.error('Не удалось загрузить ссылку:', error);
                    alert('Не удалось загрузить ссылку');
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
                block_id: Number(this.block_id),
                name: this.name,
                href: this.href,
                icon: this.icon ?? '',
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
                    console.error('Не удалось сохранить ссылку:', error);
                    alert('Не удалось сохранить ссылку');
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
                    console.error('Не удалось удалить ссылку:', error);
                    alert('Не удалось удалить ссылку');
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
                    console.error('Не удалось восстановить ссылку:', error);
                    alert('Не удалось восстановить ссылку');
                })
                .finally(() => {
                    vm.spinner = false;
                });
        },

        submit(event) {
            this.id ? this.save(event) : this.add(event);
        },

        loadBlocks() {
            return jwtFetch('/private/block/')
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP ${response.status}`);
                    }
                    return response.json();
                })
                .then(blocks => {
                    this.blocks = blocks;
                });
        }
    }
});
