let express = require('express');
let router = express.Router();

// path for /social-slide
router.get('/', (req, res) => {
    res.render('settings',{
        title: 'Settings'
    });
});

router.post('/', (req, res) => {

});

router.put('/', (req, res) => {

});

router.delete('/', (req, res) => {

});

module.exports = router;