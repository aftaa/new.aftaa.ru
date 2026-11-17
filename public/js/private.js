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
            const id = event.target.dataset.id;

            jwtFetch('/private/view/' + id)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    if (this.top['_' + id]) {
                        this.top['_' + id].count = data.views;
                    }
                    return jwtFetch('/private/data/last');
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    this.last = data;
                })
                .catch(error => {
                    console.error('Ошибка при обновлении просмотров:', error);
                });
        },

        loadPrivateIndexData() {
            this.spinner = true;

            jwtFetch('/private/data/index')
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    this.columns = data.data.columns;
                    this.top = data.data.top;
                    this.last = data.data.last;
                })
                .catch(error => {
                    console.error('Не удалось загрузить данные:', error);
                    alert('Не удалось загрузить данные');
                })
                .finally(() => {
                    this.spinner = false;
                });
        }
    }
});

vmPrivate.loadPrivateIndexData();
