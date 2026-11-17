function jwtExit() {
    localStorage.removeItem('username');
    localStorage.removeItem('password');
    localStorage.removeItem('token');

    // Если мы на странице private — перезагружаем данные
    if (typeof vmPrivate !== 'undefined' && typeof vmPrivate.loadPrivateIndexData === 'function') {
        vmPrivate.loadPrivateIndexData();
    }
}
