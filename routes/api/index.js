const router = require('express').Router();
const clinicRoutes = require('./clinic');

//Clinic routes
// '/api/clinic'
router.use('/clinic', clinicRoutes);

module.exports = router;