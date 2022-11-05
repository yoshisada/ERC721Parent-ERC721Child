const fs = require("fs");
const { network } = require("hardhat");
const { dirname } = require('path');
const contractJSONFile = __basedir+"/lib/deployedContracts.json";

exports.recordContractAddress = function(contractName, contractAddress){
  const jsonFileHandle = fs.readFileSync(contractJSONFile);
  const jsonData = JSON.parse(jsonFileHandle);
  jsonData[network.name][contractName] = contractAddress;
  fs.writeFileSync(contractJSONFile, JSON.stringify(jsonData));
}

exports.retrieveContractAddress = function(contractName){
  const jsonFileHandle = fs.readFileSync(contractJSONFile);
  const jsonData = JSON.parse(jsonFileHandle);
  console.log(network.name)
  if(network.name in jsonData){
    if(contractName in jsonData[network.name]){
      return jsonData[network.name][contractName];
    }
  }
  return "";
}