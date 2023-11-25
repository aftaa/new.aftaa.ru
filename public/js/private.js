let vmPrivate = new Vue({
    el: '#app',
    data: {
        columns: {},
        top: {},
        last: {},
    },
    methods: {
        conversion(event) {
            let id = event.target.dataset.id;
            jwtFetch('/private/view/' + id)
                .then(response => response.json())
                .then(data => {
                    if (vmPrivate.top['_' + id]) {
                        vmPrivate.top['_' + id].count = data.views;
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
                    vmPrivate.columns = data.data.columns;
                    vmPrivate.top = data.data.top;
                    vmPrivate.last = data.data.last;
                    $('#app').removeClass('display-none');
                    stopSpinner();

                });
        }
    }
});

vmPrivate.loadPrivateIndexData();
