// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title ModelNFT - AI Diagnostic Model NFTs
 * @notice ERC-1155 tokens representing AI models with metadata and FDA clearance
 */
contract ModelNFT is ERC1155, Ownable, ReentrancyGuard {
    
    struct Model {
        uint256 id;
        string name;
        string modelHash; // IPFS hash (SHA-256 signed)
        string description;
        address creator;
        uint256 inferencePrice;
        uint256 totalInferences;
        uint256 reputationScore;
        bool isVerified;
        bool fdaCleared;
        string clearanceDocUrl;
        uint256 createdAt;
    }
    
    uint256 public modelCount;
    mapping(uint256 => Model) public models;
    mapping(uint256 => mapping(address => uint256)) public modelUsage;
    mapping(address => uint256) public creatorReputation;
    
    uint256 public constant VERIFICATION_FEE = 2000 ether;
    
    event ModelMinted(uint256 indexed modelId, address indexed creator, string name);
    event ModelVerified(uint256 indexed modelId);
    event InferenceRecorded(uint256 indexed modelId, address indexed user);
    event ReputationUpdated(address indexed creator, uint256 score);
    
    constructor() ERC1155("https://api.medichain.ai/metadata/{id}.json") Ownable(msg.sender) {}
    
    function mintModel(
        string memory _name,
        string memory _modelHash,
        string memory _description,
        uint256 _inferencePrice,
        bool _fdaCleared,
        string memory _clearanceDocUrl
    ) external returns (uint256) {
        uint256 modelId = modelCount++;
        
        models[modelId] = Model({
            id: modelId,
            name: _name,
            modelHash: _modelHash,
            description: _description,
            creator: msg.sender,
            inferencePrice: _inferencePrice,
            totalInferences: 0,
            reputationScore: 0,
            isVerified: false,
            fdaCleared: _fdaCleared,
            clearanceDocUrl: _clearanceDocUrl,
            createdAt: block.timestamp
        });
        
        _mint(msg.sender, modelId, 1, "");
        emit ModelMinted(modelId, msg.sender, _name);
        return modelId;
    }
    
    function grantAccess(uint256 _modelId, address _user) external {
        require(msg.sender == models[_modelId].creator || msg.sender == owner(), "Not authorized");
        _mint(_user, _modelId, 1, "");
    }
    
    function recordInference(uint256 _modelId, address _user) external {
        require(balanceOf(_user, _modelId) > 0, "No access");
        
        models[_modelId].totalInferences++;
        modelUsage[_modelId][_user]++;
        
        if (models[_modelId].totalInferences % 10 == 0) {
            creatorReputation[models[_modelId].creator]++;
            models[_modelId].reputationScore++;
            emit ReputationUpdated(models[_modelId].creator, creatorReputation[models[_modelId].creator]);
        }
        
        emit InferenceRecorded(_modelId, _user);
    }
    
    function purchaseVerification(uint256 _modelId) external payable {
        require(msg.sender == models[_modelId].creator, "Not creator");
        require(msg.value >= VERIFICATION_FEE, "Insufficient fee");
        require(!models[_modelId].isVerified, "Already verified");
        
        models[_modelId].isVerified = true;
        emit ModelVerified(_modelId);
    }
    
    function hasAccess(uint256 _modelId, address _user) external view returns (bool) {
        return balanceOf(_user, _modelId) > 0;
    }
    
    function getModel(uint256 _modelId) external view returns (Model memory) {
        return models[_modelId];
    }
    
    function withdrawFees() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }
}
