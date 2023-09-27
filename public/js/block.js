$(function () {
    window.vmBlock = new Vue({
        el: '#modalBlock',
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

            load: async function (event) {
                showSpinner();
                let id = event.target.dataset.id;
                jwtFetch('/private/blocks/' + id)
                    .then((block) => {
                        this.id = block.id;
                        alert([block.name, this.name])
                        this.name = block.name;
                        this.col = block.col;
                        this.sort = block.sort;
                        this.private = block.private;
                        this.modal.show();
                        hideSpinner();
                    });
            },

            save: function () {

            },

            unlink: function () {

            },

            recovery: function () {

            }
        }
    });
});

