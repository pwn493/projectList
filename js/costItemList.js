function CostItemList(name) {
    this.items = [];
    this.name = name;
}

CostItemList.prototype.add = function (item) {
    this.items.push(item);
}

CostItemList.prototype.remove = function (id) {
    var i = 0;
    for (; i< this.items.length; i++) {
        if (this.items[i].id == id) {
            this.items.splice(i, 1);
        }
    }
}

CostItemList.prototype.getTotal = function () {
    var cost = 0;
    var i = 0;
    for (; i < this.items.length; i++) {
        cost += this.items[i].cost;
    }
    
    return cost;
}

CostItemList.prototype.getItem = function (id) {
    var i = 0;
    for (; i< this.items.length; i++) {
        if (this.items[i].id == id) {
            return this.items[i];
        }
    }
    
    return null;
}

CostItemList.prototype.save = function () {
    console.log(this.items);
    var json = JSON.stringify(this.items);
    localStorage.setItem(this.name, json);
}

CostItemList.prototype.load = function () {
    var json = localStorage.getItem(this.name);
    this.items = JSON.parse(json);
    if (!this.items) {
        this.items = [];
    }
}

CostItemList.prototype.loadFromList = function(list) {
    if (list) {
        this.items = list.items;
    }
}