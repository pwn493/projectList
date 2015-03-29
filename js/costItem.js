function CostItem(description, cost) {
    this.id = description.concat(Date.now()).replace(/\s/g, '-');
    this.description = description;
    this.cost = parseInt(cost);
    this.checked = false;
}

CostItem.prototype.isChecked = function() {
    return this.checked;
}

CostItem.prototype.check = function () {
    this.checked = true;
}

CostItem.prototype.uncheck = function () {
    this.checked = false;
}