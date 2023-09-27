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

            },

            add: function () {

            },

            load: function (event) {
                spinner();
                this.id = event.target.dataset.id;
                jwtFetch(this.api + this.id)
                    .then(block => {
                        for (let key of this.keys) {
                            this[key] = block[key];
                        }

                        this.modal.show();
                        stopSpinner();
                    });
            },

            save: function (event) {
                spinner();
                let body = {};
                for (let key of this.keys) {
                    body[key] = this[key];
                }
                jwtFetch(this.api + this.id, 'PUT', body)
                    .catch(() => {
                        stopSpinner();
                        this.modal.hide();
                    });
            },

            unlink: function () {

            },

            recovery: function () {

            }
        }
    });
});

