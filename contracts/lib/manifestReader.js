const fs = require("fs");
const { dirname } = require('path');
const uploadManifestJSONFile = __basedir+"/lib/upload_manifest.json";

exports.updateUploadManifest = function(uploadManifest){
  fs.writeFileSync(uploadManifestJSONFile, JSON.stringify(uploadManifest));
}

exports.retrieveUploadManifest = function(){
  const jsonFileHandle = fs.readFileSync(uploadManifestJSONFile);
  const jsonData = JSON.parse(jsonFileHandle);
  return jsonData;
}