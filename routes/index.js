const router = require('express').Router();
// Import all of the API routes from /api/index.js
// Note in Pizza program says: "no need for index.js becuase it's implied"
// is this a express.js feature/function???

const apiRoutes = require('./api');

// add prefix of '/api' to all of the api routes imported from the api directory
router.use('/api', apiRoutes);

router.use((req, res) => {
    res.status(404).send('<h1>404 error</h1>')
});

module.exports = router;