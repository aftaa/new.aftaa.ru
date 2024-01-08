let vmPrivate = new Vue({
    el: '#app',
    data: {
        columns: {},
        top: {},
        last: {},
        spinner: true
    },
    methods: {
        conversion(event) {
            let id = event.target.dataset.id;
            jwtFetch('/private/view/' + id)
                .then(response => response.json())
                .then(data => {
                    if (this.top['_' + id]) {
                        this.top['_' + id].count = data.views;
                    }
                    jwtFetch('/private/data/last')
                        .then(response => response.json())
                        .then(data => vmPrivate.last = data);
                });
        },

        loadPrivateIndexData() {
            jwtFetch('/private/data/index')
                .then(response => response.json())
                .then(data => {
                    this.columns = data.data.columns;
                    this.top = data.data.top;
                    this.last = data.data.last;
                    this.spinner = false;
                });
        }
    }
});

vmPrivate.loadPrivateIndexData();
