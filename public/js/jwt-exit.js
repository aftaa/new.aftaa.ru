function jwtExit() {
    delete localStorage.username;
    delete localStorage.password;
    delete localStorage.token;
    vmPrivate.loadIndexData();
}
