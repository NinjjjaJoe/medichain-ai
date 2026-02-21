// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./ModelNFT.sol";
import "./InferToken.sol";

/**
 * @title MediChainMarketplace
 */
contract MediChainMarketplace is Ownable, ReentrancyGuard {
    
    ModelNFT public modelNFT;
    InferToken public inferToken;
    
    uint256 public marketplaceFeePercent = 5;
    uint256 public totalVolume;
    uint256 public totalInferences;
    
    mapping(address => uint256) public creatorEarnings;
    mapping(address => uint256) public userSpending;
    
    event ModelPurchased(uint256 indexed modelId, address indexed buyer, uint256 price);
    event InferencePaid(uint256 indexed modelId, address indexed user, uint256 amount);
    event EarningsWithdrawn(address indexed creator, uint256 amount);
    
    constructor(address _modelNFT, address _inferToken) Ownable(msg.sender) {
        modelNFT = ModelNFT(_modelNFT);
        inferToken = InferToken(_inferToken);
    }
    
    function purchaseModelAccess(uint256 _modelId, uint256 _accessPrice) external nonReentrant {
        require(inferToken.balanceOf(msg.sender) >= _accessPrice, "Insufficient tokens");
        
        ModelNFT.Model memory model = modelNFT.getModel(_modelId);
        
        uint256 fee = (_accessPrice * marketplaceFeePercent) / 100;
        uint256 creatorAmount = _accessPrice - fee;
        
        require(inferToken.transferFrom(msg.sender, address(this), _accessPrice), "Transfer failed");
        
        creatorEarnings[model.creator] += creatorAmount;
        totalVolume += _accessPrice;
        
        modelNFT.grantAccess(_modelId, msg.sender);
        
        emit ModelPurchased(_modelId, msg.sender, _accessPrice);
    }
    
    function payForInference(uint256 _modelId) external nonReentrant {
        require(modelNFT.hasAccess(_modelId, msg.sender), "No access");
        
        ModelNFT.Model memory model = modelNFT.getModel(_modelId);
        uint256 price = model.inferencePrice;
        
        require(inferToken.balanceOf(msg.sender) >= price, "Insufficient tokens");
        
        uint256 fee = (price * marketplaceFeePercent) / 100;
        uint256 creatorAmount = price - fee;
        
        require(inferToken.transferFrom(msg.sender, address(this), price), "Transfer failed");
        
        creatorEarnings[model.creator] += creatorAmount;
        userSpending[msg.sender] += price;
        totalVolume += price;
        totalInferences++;
        
        modelNFT.recordInference(_modelId, msg.sender);
        
        emit InferencePaid(_modelId, msg.sender, price);
    }
    
    function withdrawEarnings() external nonReentrant {
        uint256 earnings = creatorEarnings[msg.sender];
        require(earnings > 0, "No earnings");
        
        creatorEarnings[msg.sender] = 0;
        require(inferToken.transfer(msg.sender, earnings), "Transfer failed");
        
        emit EarningsWithdrawn(msg.sender, earnings);
    }
    
    function getMarketplaceStats() external view returns (uint256, uint256, uint256, uint256) {
        return (totalVolume, totalInferences, modelNFT.modelCount(), marketplaceFeePercent);
    }
    
    function withdrawMarketplaceFees() external onlyOwner {
        uint256 balance = inferToken.balanceOf(address(this));
        require(inferToken.transfer(owner(), balance), "Transfer failed");
    }
}
