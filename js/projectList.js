ProjectList.prototype = new CostItemList()
ProjectList.prototype.constructor = ProjectList;
function ProjectList() {
    this.name = 'projectList';
    this.type = 'project';
}