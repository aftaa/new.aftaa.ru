let vmLink = new Vue({
    el: '#formLink',
    data: {
        id: 0,
        block_id: 0,
        name: '',
        href: '',
        icon: '',
        private: false,
        blocks: null,
        disabled: false,
        api: '/private/link/',
        keys: ['block_id', 'name', 'href', 'icon', 'private'],
        modal: new bootstrap.Modal('#modalLink')
    },
    methods: {
        new(event) {
            vm.spinner = true;
            this.loadBlocks()
                .then(() => {
                    this.id = null;
                    for (let key of this.keys) {
                        this[key] = null;
                    }
                    this.block_id = event.target.dataset.blockId;
                    vm.spinner = false;
                    this.modal.show();
                });
        },

        add(event) {
            event.preventDefault();
            this.disabled = true;
            vm.spinner = true;
            let body = {
                block_id: Number(this.block_id),
                name: this.name,
                href: this.href,
                icon: this.icon ?? '',
                private: this.private ?? false
            };

            jwtFetch(this.api, 'POST', body)
                .then((response) => {
                    vm.spinner = false;
                    this.modal.hide();
                    this.disabled = false;
                    vm.loadAdminData();
                });
            return false;
        },

        load(event) {
            vm.spinner = true;
            this.id = event.target.dataset.id;
            this.loadBlocks()
                .then(() => {
                    jwtFetch(this.api + this.id)
                        .then(response => response.json())
                        .then(link => {
                            for (let key of this.keys) {
                                this[key] = link[key];
                            }
                            this.block_id = link.block.id;
                            vm.spinner = false;
                            this.modal.show();
                        });
                });
        },

        save(event) {
            event.preventDefault();
            this.disabled = true;
            vm.spinner = true;
            let body = {};
            for (let key of this.keys) {
                body[key] = this[key];
            }
            jwtFetch(this.api + this.id, 'PUT', body)
                .then(() => {
                    vm.spinner = false;
                    this.modal.hide();
                    this.disabled = false;
                    vm.loadAdminData();
                });
            return false;
        },

        unlink() {
            vm.spinner = true;
            jwtFetch(this.api + event.target.dataset.id, 'DELETE')
                .then(() => {
                    vm.spinner = false;
                    vm.loadAdminData();
                });
        },

        recovery() {
            vm.spinner = true;
            jwtFetch(this.api + event.target.dataset.id, 'PATCH')
                .then(() => {
                    vm.spinner = false;
                    vm.loadAdminData();
                });
        },

        submit(event) {
            this.id ? this.save(event) : this.add(event);
        },

        loadBlocks() {
            return jwtFetch('/private/block/')
                .then(response => response.json())
                .then(blocks => this.blocks = blocks);
        }
    }
});
