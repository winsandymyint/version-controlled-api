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
  let body = {
    key : key,
    value : req.body[key],
    $setOnInsert: {
      createdAt: Date.now()
    }
  }
  KvData.findOneAndUpdate({ key : key }, body , { upsert:true, new : true}, function(err, data){
    if(err)
     return res.status(500).json(err);
    return res.status(200).json(data.value);
  });
}

function getKeyValDataByKey( req, res ){
  let searchQuery = {};
  let key = req.params.key;
  let timestamp = req.query.timestamp? (new Date(parseInt(req.query.timestamp))).toISOString() : '' ;
  searchQuery.key = key;
  timestamp ? searchQuery.createdAt = {$eq : timestamp} : '';

  KvData.findOne(searchQuery).then((data)=>{
    return res.status(200).json(data.value);
  })
  .catch((err)=>{
    return(res.status(500).json(err));
  })
}

module.exports = {
  getAllKeyValData,
  upsertKeyValData,
  getKeyValDataByKey
}
