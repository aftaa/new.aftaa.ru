function spinner() {
    $('#spinner').show();
}

function stopSpinner() {
    $('#spinner').hide();
}

function disInputs() {
    $('input,textarea,select,button').attr({disabled: true});
}

function enInputs() {
    $('input,textarea,select,button').attr({disabled: false});
}
