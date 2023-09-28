$(function () {
    window.vmBlock = new Vue({
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
            new: function () {
                this.id = null;
                for (let key of this.keys) {
                    this[key] = null;
                }
                this.modal.show();
            },

            add: function () {
                disInputs();
                spinner();
                let body = {};
                for (let key of this.keys) {
                    body[key] = this[key];
                }

                if (!body.private) body.private = false;

                console.log('add:', body);
                jwtFetch(this.api, 'POST', body)
                    .then(() => {
                        stopSpinner();
                        this.modal.hide();
                        enInputs();
                        vm.loadAdminData();
                    });
                return false;
            },

            load: function (event) {
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

            save: function (event) {
                disInputs();
                spinner();
                let body = {};
                for (let key of this.keys) {
                    body[key] = this[key];
                }
                console.log('save:', body);
                jwtFetch(this.api + this.id, 'PUT', body)
                    .then(() => {
                        stopSpinner();
                        this.modal.hide();
                        enInputs();
                        vm.loadAdminData();
                    });
                return false;
            },

            unlink: function (event) {
                spinner();
                jwtFetch(this.api + event.target.dataset.id, 'DELETE')
                    .then(() => {
                        stopSpinner();
                        vm.loadAdminData();
                    });
            },

            recovery: function () {
                spinner();
                jwtFetch(this.api + event.target.dataset.id, 'PATCH')
                    .then(() => {
                        stopSpinner();
                        vm.loadAdminData();
                    });
            },

            submit: function (event) {
                this.id ? this.save(event) : this.add();
            }
        }
    });
});

