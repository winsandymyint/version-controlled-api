"use strict";

const KvData = require('../models/keyValData');

function getAllKeyValData( req, res ){
  KvData.find().then((data)=>{
    return res.status(200).json(data);
  })
  .catch((err)=>{
    return(res.status(500).json(err));
  })
}

function upsertKeyValData( req, res ){
  let key = Object.keys(req.body)[0];
  let dataObj = {
    key : key,
    values : [{
      value : req.body[key],
      createdAt: Date.now()
    }]
  }
  KvData.findOne({key: key})
  .then(data=>{
    if(data){
      //Update the values
      data.values.push(dataObj.values[0])
      data.save((err,data)=>{
        if(err)
          return(res.status(500).json(err));
        return res.status(200).json(dataObj.values[0]['value']);
      });
    }else{
      //Insert new record
      let newKvData = new KvData(dataObj);
      newKvData.save((err,data)=>{
        if(err)
          return(res.status(500).json(err));
        return res.status(200).json(dataObj.values[0]['value']);
      });
    }
  })
  .catch(err=>{
    return res.status(500).json(err);
  })
}

function getKeyValDataByKey( req, res ){
  let searchQuery = {};
  let key = req.params.key;
  let timestamp = req.query.timestamp? (new Date(parseInt(req.query.timestamp))) : '' ;
  searchQuery.key = key;

  KvData.findOne(searchQuery).then((data)=>{
    //NEED to check for timestamp
    //timestamp present, filter and response back value
    if(data){
      if(timestamp){
        let returnData = data.values.filter(function (val) {
          return val.createdAt+'' == timestamp+'';
        }).pop();
        return res.status(200).json(returnData.value);
      }else{
        //if not, get the last value from the values array which is the latest
        return res.status(200).json(getLatestValue(data.values));
      }
    }else{
      return res.status(404).json({message : 'No record found.'});
    }
  })
  .catch((err)=>{
    return(res.status(500).json(err));
  })
}

function getLatestValue(arr){
  return arr[arr.length-1]['value'];
}

module.exports = {
  getAllKeyValData,
  upsertKeyValData,
  getKeyValDataByKey
}
