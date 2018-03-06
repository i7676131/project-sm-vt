var express = require('express');
var router = express.Router();
var SmPostModel = require('../public/javascripts/models/sm-post-model');
var slideController = require('../public/javascripts/controllers/slide-controller');

router.get('/', slideController.loadPage);

router.get('/api/get/next-post', slideController.nextPost);

module.exports = router;