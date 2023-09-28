function spinner() {
    $('#spinner').show();
}

function stopSpinner() {
    $('#spinner').hide();
}

function disableInputs() {
    $('input,textarea,select,button').attr({disabled: true});
}

function enableInputs() {
    $('input,textarea,select,button').attr({disabled: false});
}
