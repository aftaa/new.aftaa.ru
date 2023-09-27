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
                let id = event.target.dataset.id;
                let t = this;
                jwtFetch('/blocks/' + id)
                    .then((data) => {
                        t.id = data.id;
                        t.name = data.name;
                        t.col = data.col;
                        t.sort = data.sort;
                        t.private = data.private;
                        this.modal.show();
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

