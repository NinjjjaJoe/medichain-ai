// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title InferToken - Payment token for AI inference
 */
contract InferToken is ERC20, Ownable {
    
    uint256 public constant INITIAL_SUPPLY = 1_000_000_000 * 10**18;
    uint256 public constant BULK_DISCOUNT_THRESHOLD = 100_000 * 10**18;
    uint256 public constant BULK_DISCOUNT_PERCENT = 10;
    
    mapping(address => bool) public isEnterprise;
    
    event EnterpriseLicenseGranted(address indexed enterprise);
    event BulkPurchase(address indexed buyer, uint256 amount, uint256 discount);
    
    constructor() ERC20("InferToken", "INFER") Ownable(msg.sender) {
        _mint(msg.sender, INITIAL_SUPPLY);
    }
    
    function purchaseTokens(uint256 _amount) external payable {
        uint256 price = _amount;
        uint256 discount = 0;
        
        if (_amount >= BULK_DISCOUNT_THRESHOLD) {
            discount = (_amount * BULK_DISCOUNT_PERCENT) / 100;
            price = _amount - discount;
            emit BulkPurchase(msg.sender, _amount, discount);
        }
        
        require(msg.value >= price, "Insufficient payment");
        _mint(msg.sender, _amount);
        
        if (msg.value > price) {
            payable(msg.sender).transfer(msg.value - price);
        }
    }
    
    function grantEnterpriseLicense(address _enterprise) external onlyOwner {
        isEnterprise[_enterprise] = true;
        emit EnterpriseLicenseGranted(_enterprise);
    }
    
    function mint(address _to, uint256 _amount) external onlyOwner {
        _mint(_to, _amount);
    }
    
    function burn(uint256 _amount) external {
        _burn(msg.sender, _amount);
    }
    
    function withdrawETH() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }
}
