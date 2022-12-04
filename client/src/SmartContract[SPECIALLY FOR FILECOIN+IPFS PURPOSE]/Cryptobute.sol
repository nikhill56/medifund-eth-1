//NOTE: 
//Basically we don't publish the contract in our github code.As FILECOIN+IPFS judges said, we are now representing the Contract here. 

pragma solidity ^0.4.17;

contract CampaignFactory{
    address[] public deployedCampaigns;
    event NewDeployedAddress(address deployedAddress);
    function createCampaign(uint totFund) public{
    address newCampaign=new Campaign(totFund,msg.sender,block.timestamp);
    deployedCampaigns.push(newCampaign);
    emit NewDeployedAddress(newCampaign);
}
function getDeployedCampaigns() public view returns(address[]){
    return deployedCampaigns;
}
}


contract Campaign{
    struct Request{
    string description;
    uint value;
    string recipientName;
    address recipient;
    bool complete; 
    uint approvalCount;
    mapping(address=>bool) approvals;
    //keeping 2 decimal points, 10000 = 100%
    uint ratioApproved;
}

Request[] public requests;
    address public manager;
    
    uint public approversCount; 
    uint public collectedFund=0;
    uint public totalFund;
    uint public createdAt;
    address[] public approversAddress;
    mapping(address=>bool) public approvers;
    mapping(address=>uint) public donated;
    uint32 public requestCount=0;
    event showRequestCount(uint32 requestCount);
function Campaign(uint totFund,address creator,uint256 time) public{
    manager=creator;
   
    totalFund=totFund;
    createdAt=time;
}
modifier restricted(){
    require(msg.sender==manager);
_;
}
function contibute() public payable{
    require(msg.value>=0*1000000000000000000);
    approvers[msg.sender]=true;
    approversCount++;
    collectedFund+=msg.value;
    approversAddress.push(msg.sender);
    donated[msg.sender]=msg.value;
}
function createRequest(string description,string recipientName,address recipient) public restricted payable{
    Request memory newRequest=Request({
    description:description,
    value:msg.value,
    recipientName:recipientName,
    recipient:recipient,
    complete:false,
    approvalCount:0,
    ratioApproved:0
});
    requests.push(newRequest);
    emit showRequestCount(requestCount);
    requestCount++; 
} 
function getVotingPower(address apprv) internal view returns(uint){
    return ((donated[apprv] * 10000) / collectedFund );
}
function approveRequest(uint index) public{
    Request storage request=requests[index];
    require(request.value<=collectedFund);
    require(approvers[msg.sender]);
    require(!request.approvals[msg.sender]);
    request.approvals[msg.sender]=true;
    request.approvalCount++;
    request.ratioApproved+= getVotingPower(msg.sender);
}
function spendAmount(uint index) public payable restricted{
    Request storage request=requests[index];
    require(!request.complete);
    require(request.approvalCount>0);
    request.recipient.transfer((request.value*(request.approvalCount/approversCount)));
    request.complete=true;
    collectedFund-=request.value;
    request.ratioApproved=0;
    request.approvalCount=0;
}
}
