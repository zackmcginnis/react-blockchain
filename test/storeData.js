var StoreData = artifacts.require("./StoreData.sol");

contract('StoreData', function(accounts) {

  it("should store value 100", function() {
    return StoreData.deployed().then(function(instance) {
      storeDataInstance = instance;
      return storeDataInstance.set(100, {from: accounts[0]});
    }).then(function() {
      return storeDataInstance.get.call();
    }).then(function(data) {
      assert.equal(data, 100, "value 100 was not stored");
    });
  });

});
