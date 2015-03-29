function PersistanceList() {
    this.items = [];
}

PersistanceList.prototype.add = function(item) {
    this.items.push(item);
}

PersistanceList.prototype.buildSaveUrl = function() {
    var json = JSON.stringify(this.items);
    var blob = new Blob([json], {type: "application/json"});
    return URL.createObjectURL(blob);
}

PersistanceList.prototype.buildFromJSON = function (json) {
    this.items = JSON.parse(json);
    if (!this.items) {
        this.items = [];
    }
}

PersistanceList.prototype.getItemWithName = function (name) {
    var i = 0;
    for (; i < this.items.length; i++) {
        if (this.items[i].name == name) {
            return this.items[i];
        }
    }
    
    return null;
}