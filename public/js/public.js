let vmIndex = new Vue({
    el: '#app',
    data: {
        columns: {},
        spinner: true
    },
    methods: {
        loadIndexData() {
            this.spinner = true;

            fetch(window.host + '/public/data/index')
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    this.columns = data;
                })
                .catch(error => {
                    console.error('Не удалось загрузить данные:', error);
                })
                .finally(() => {
                    this.spinner = false;
                });
        }
    }
});

vmIndex.loadIndexData();
