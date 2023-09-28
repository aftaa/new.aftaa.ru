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
                spinner();
                let body = {};
                for (let key of this.keys) {
                    body[key] = this[key];
                }
                jwtFetch(this.api, 'POST', body)
                    .then(() => {
                        stopSpinner();
                        this.modal.hide();
                        vm.loadAdminData();
                    });
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

                        this.modal.show();
                        stopSpinner();
                    });
            },

            save: function (event) {
                $('input,textarea,select,button').attr({disabled: true});
                spinner();
                let body = {};
                for (let key of this.keys) {
                    body[key] = this[key];
                }
                jwtFetch(this.api + this.id, 'PUT', body)
                    .then(() => {
                        stopSpinner();
                        this.modal.hide();
                        $('input,textarea,select,button').attr({disabled: false});
                        vm.loadAdminData();
                    });
            },

            unlink: function () {

            },

            recovery: function () {

            },

            submit: function (event) {
                console.log('id=', this.id);
                this.id ? this.save(event) : this.add();
            }
        }
    });
});

