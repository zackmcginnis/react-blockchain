pragma solidity ^0.4.2;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/StoreData.sol";

contract TestStoreData {

  function testValueStore() {
    StoreData storeData = StoreData(DeployedAddresses.StoreData());

    storeData.set(100);

    uint expected = 100;

    Assert.equal(storeData.get(), expected, "...it should store value 100.");
  }

}
