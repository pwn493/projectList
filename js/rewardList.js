RewardList.prototype = new CostItemList()
RewardList.prototype.constructor = RewardList;
function RewardList() {
    this.name = 'rewardList';
    this.type = 'reward';
}