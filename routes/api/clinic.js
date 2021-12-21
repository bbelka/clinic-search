const router = require('express').Router();
const clinicController = require('../../controllers/clinicController');


// '/api/clinic/'
router.route('/')
    .get(clinicController.search);

module.exports = router;