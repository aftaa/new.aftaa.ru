let vmIndex = new Vue({
    el: '#app',
    data: {
        columns: {},
        spinner: true
    },
    methods: {
        loadIndexData() {
            fetch(window.host + '/public/data/index')
                .then(response => response.json())
                .then(data => {
                    this.columns = data;
                    this.spinner = false;
                });
        }
    }
});

vmIndex.loadIndexData();
