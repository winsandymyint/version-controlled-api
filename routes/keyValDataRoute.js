const router = require('express').Router();
const kvCtrl = require('../app/controllers/keyValDataController');

router.route( '/object' )
  .get( kvCtrl.getAllKeyValData )
  .post( kvCtrl.upsertKeyValData );

router.route( '/object/:key' )
  .get( kvCtrl.getKeyValDataByKey )

module.exports = function(app){
	app.use('/', router);
};