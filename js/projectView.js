function displayItem(project, type) {
    return '<div class="' + type + ' item" id="' + project.id + '">' +
        project.description + ' ' + project.cost + displayControls(project.checked) + '</div>';
}

function displayControls(isChecked) {
    var checkedString = isChecked ? "checked" : "";
    return '<input type="button" class="checkable saveAction ' + checkedString + '"/> <input type="button" name="remove" value="-" class="remove saveAction" />';
}