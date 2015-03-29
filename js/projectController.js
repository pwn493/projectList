$(document).ready(function() {
    var projectList = new ProjectList();
    projectList.load();
    refreshList(projectList);
    
    var oldProjectList = new ProjectList();
    oldProjectList.name = "oldProjectList";
    oldProjectList.load();
    refreshList(oldProjectList);
    
    var rewardList = new RewardList();
    rewardList.load();
    refreshList(rewardList)
    
    var oldRewardList = new RewardList();
    oldRewardList.name = "oldRewardList";
    oldRewardList.load();
    refreshList(oldRewardList);
    
    updateTotal();
    updateSave();
    
    $('.loadDiv').hide();
    
    $('.newProject .add').click(function () {
       addNewItem('.newProject', projectList);
    });

    $('.newReward .add').click(function () {
       addNewItem('.newReward', rewardList);
    });
    
    $('#loadButton').click(function () {
        $('.loadDiv').show();
        $(this).hide();
    });
    
    $('#noLoadButton').click(function () {
       $('.loadDiv').hide();
       $('#loadButton').show();
    });
    
    $('#yesLoadButton').click(function () {
       $('.loadDiv').hide();
       $('#loadButton').show();
       
       var text = $('#loadBox').val();
       var persistance = new PersistanceList();
       persistance.buildFromJSON(text);
       
       loadStoredList(projectList, (persistance.getItemWithName("projectList")));
       loadStoredList(rewardList, (persistance.getItemWithName("rewardList")));
       loadStoredList(oldProjectList, (persistance.getItemWithName("oldProjectList")));
       loadStoredList(oldRewardList, (persistance.getItemWithName("oldRewardList")));
    });
    
    function loadStoredList(currentList, newList) {
        if (newList) {
            currentList.loadFromList(newList);
            refreshList(currentList);
            console.log(currentList);
            currentList.save();
        }
    }
    
    $(document).on('click', '.saveAction', function () {
        updateSave();
    })
    
    $(document).on('click', '.projectList .remove', function () {
        removeItem($(this).parent(), projectList);
        updateTotal();
    });

    $(document).on('click', '.rewardList .remove', function () {
        removeItem($(this).parent(), rewardList);
    });

    $(document).on('click', '.oldProjectList .remove', function () {
        removeItem($(this).parent(), oldProjectList);
        updateTotal();
    });

    $(document).on('click', '.oldRewardList .remove', function () {
        removeItem($(this).parent(), oldRewardList);
    });
    
    $(document).on('click', '.projectList .checkable', function() {
        $(this).toggleClass("checked");
        var itemDiv = $(this).parent();
        
        getItem(itemDiv, projectList).checked = true;
        moveToList(itemDiv, projectList, oldProjectList);
        updateTotal();
    });
    
    $(document).on('click', '.oldProjectList .checkable', function() {
        $(this).toggleClass("checked");
        var itemDiv = $(this).parent();
        
        getItem(itemDiv, oldProjectList).checked = false;
        moveToList(itemDiv, oldProjectList, projectList);
        updateTotal();
    });
    
    $(document).on('click', '.rewardList .checkable', function() {
        $(this).toggleClass("checked");
        var itemDiv = $(this).parent();
        
        getItem(itemDiv, rewardList).checked = true;
        moveToList(itemDiv, rewardList, oldRewardList);
    });
    
    $(document).on('click', '.oldRewardList .checkable', function() {
        $(this).toggleClass("checked");
        var itemDiv = $(this).parent();
        
        getItem(itemDiv, oldRewardList).checked = false;
        moveToList(itemDiv, oldRewardList, rewardList);
    });
    
    function updateTotal() {
        $('#totalPoints').text(oldProjectList.getTotal());
    }
    
    function updateSave() {
        console.log('update save');
        var persistanceList = new PersistanceList();
        persistanceList.add(projectList);
        persistanceList.add(rewardList);
        persistanceList.add(oldProjectList);
        persistanceList.add(oldRewardList);
        
        var a = $('#saveLink');
        var url = persistanceList.buildSaveUrl();
        console.log(url);
        a.prop("href", url);
    }
});

function moveToList(item, sourceList, targetList) {
    var itemObj = getItem(item, sourceList);
    console.log(itemObj);
    if (itemObj) {
        addItem(itemObj, targetList);
        removeItem(item, sourceList);
    }
}

function refreshList(list) {
    var listSelector = '.' + list.name;
    $(listSelector).children('.item').remove();
    
    console.log('adding ' + list.items.length + ' items');
    var i = 0;
    for (;i < list.items.length; i++) {
        console.log('adding ' + list.items[i].id);
        $(listSelector).append(displayItem(list.items[i], list.type));
    }
}

function getItem(itemDiv, sourceList) {
    var id = $(itemDiv).attr('id');
    var item = sourceList.getItem(id);
    return item;
}

function addItem(item, list) {
    list.add(item);
    list.save();
    refreshList(list);
}

function addNewItem(listSelector, list) {
    var description = $(listSelector + ' .description').val();
    var cost = $(listSelector + ' .cost').val();
    
    list.add(new CostItem(description, cost));
    
    refreshList(list);
    $(listSelector + ' .description').val('');
    $(listSelector + ' .cost').val('');
    list.save();
}

function removeItem(selected, list) {
    var id = $(selected).attr('id');
    list.remove(id);
    $(selected).remove();
    list.save();
    refreshList(list);
}