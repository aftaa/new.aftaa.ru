let vmIndex = new Vue({
    el: '#app',
    data: {
        columns: {},
        top: {},
        last: {},
    },
    methods: {
        loadIndexData() {
            fetch('/public/data/index')
                .then(response => response.json())
                .then(data => {
                    vm.columns = data.data.columns;
                    $('#app').removeClass('display-none');
                    stopSpinner();
                });
        }
    }
});

vmIndex.loadIndexData();
