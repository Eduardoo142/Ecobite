// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

contract ProductRegistry {
    struct Product {
        uint id;
        string name;
        string description;
        uint price;
        address restaurant;
    }

    Product[] public products;
    uint public nextId = 1;

    event ProductAdded(uint id, string name, string description, uint price, address restaurant);

    function addProduct(string memory _name, string memory _description, uint _price) public {
        products.push(Product(nextId, _name, _description, _price, msg.sender));
        emit ProductAdded(nextId, _name, _description, _price, msg.sender);
        nextId++;
    }

    function getProducts() public view returns (Product[] memory) {
        return products;
    }
}
