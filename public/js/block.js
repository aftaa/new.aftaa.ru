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
            for (let key of this.keys) {
                this[key] = null;
            }
            this.modal.show();
        },

        add(event) {
            event.preventDefault();
            this.disabled = true;
            vm.spinner = true;
            let body = {};
            for (let key of this.keys) {
                body[key] = this[key];
            }

            if (!body.private) body.private = false;

            jwtFetch(this.api, 'POST', body)
                .then(() => {
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
            jwtFetch(this.api + this.id)
                .then(response => response.json())
                .then(block => {
                    for (let key of this.keys) {
                        this[key] = block[key];
                    }
                    vm.spinner = false;
                    this.modal.show();
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

        unlink(event) {
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
        }
    }
});
