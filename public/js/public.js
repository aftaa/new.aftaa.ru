let vmIndex = new Vue({
    el: '#app',
    data: {
        columns: {},
        top: {},
        last: {},
    },
    methods: {
        loadIndexData() {
            fetch(window.host + '/public/data/index')
                .then(response => response.json())
                .then(data => {
                    vmIndex.columns = data;
                    $('#app').removeClass('display-none');
                    stopSpinner();
                });
        }
    }
});

vmIndex.loadIndexData();
