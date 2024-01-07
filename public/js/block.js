let vmBlock = new Vue({
    el: '#formBlock',
    data: {
        id: null,
        name: '',
        col: 0,
        sort: 0,
        private: false,

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
            disInputs();
            spinner();
            let body = {};
            for (let key of this.keys) {
                body[key] = this[key];
            }

            if (!body.private) body.private = false;

            jwtFetch(this.api, 'POST', body)
                .then(() => {
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
            jwtFetch(this.api + this.id)
                .then(response => response.json())
                .then(block => {
                    for (let key of this.keys) {
                        this[key] = block[key];
                    }
                    stopSpinner();
                    this.modal.show();
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

        unlink(event) {
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
        }
    }
});
