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

        api: '/private/link/',
        keys: ['block_id', 'name', 'href', 'icon', 'private'],
        modal: new bootstrap.Modal('#modalLink')
    },
    methods: {
        new(event) {
            spinner();
            this.loadBlocks()
                .then(() => {
                    this.id = null;
                    for (let key of this.keys) {
                        this[key] = null;
                    }
                    this.block_id = event.target.dataset.blockId;
                    stopSpinner();
                    this.modal.show();
                });
        },

        add(event) {
            event.preventDefault();
            disInputs();
            spinner();
            let body = {
                block_id: Number(this.block_id),
                name: this.name,
                href: this.href,
                icon: this.icon ?? '',
                private: this.private ?? false
            };

            console.log('body:', body);

            jwtFetch(this.api, 'POST', body)
                .then((response) => {
                    console.log('status:', response.status);
                    stopSpinner();
                    this.modal.hide();
                    enInputs();
                    vm.loadAdminData();
                });
            return false;
        },

        load(event) {
            spinner();
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
                            stopSpinner();
                            this.modal.show();
                        });
                });
        },

        save(event) {
            event.preventDefault();
            disInputs();
            spinner();
            let body = {};
            for (let key of this.keys) {
                body[key] = this[key];
            }
            jwtFetch(this.api + this.id, 'PUT', body)
                .then(() => {
                    stopSpinner();
                    this.modal.hide();
                    enInputs();
                    vm.loadAdminData();
                });
            return false;
        },

        unlink() {
            spinner();
            jwtFetch(this.api + event.target.dataset.id, 'DELETE')
                .then(() => {
                    stopSpinner();
                    vm.loadAdminData();
                });
        },

        recovery() {
            spinner();
            jwtFetch(this.api + event.target.dataset.id, 'PATCH')
                .then(() => {
                    stopSpinner();
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
