function jwtExit() {
    delete localStorage.username;
    delete localStorage.password;
    delete localStorage.token;
    vm.loadIndexData();
}
