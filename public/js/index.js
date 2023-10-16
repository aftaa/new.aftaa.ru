let vm = new Vue({
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
                    vm.top['_' + id].count = data.views;
                    jwtFetch('/private/data/last')
                        .then(response => response.json())
                        .then(data => vm.last = data);
                });
        },

        loadIndexData() {
            jwtFetch('/private/data/index')
                .then(response => response.json())
                .then(data => {
                    vm.columns = data.data.columns;
                    vm.top = data.data.top;
                    vm.last = data.data.last;
                    $('#app').removeClass('display-none');
                    stopSpinner();

                });
        }
    }
});

vm.loadIndexData();
