$(function () {
    window.vmBlock = new Vue({
        el: '#formBlock',
        data: {
            id: null,
            name: '',
            col: 0,
            sort: 0,
            private: false,

            modal: new bootstrap.Modal('#modalBlock')
        },
        methods: {
            new: function () {

            },

            add: function () {

            },

            load: function (event) {
                spinner();
                let id = event.target.dataset.id;
                jwtFetch('/private/block/' + id)
                    .then(block => {
                        this.id = block.id;
                        this.name = block.name;
                        this.col = block.col;
                        this.sort = block.sort;
                        this.private = block.private;
                        this.modal.show();
                        stopSpinner();
                    });
            },

            save: function (event) {
                spinner();
                jwtFetch('')
            },

            unlink: function () {

            },

            recovery: function () {

            }
        }
    });
});

