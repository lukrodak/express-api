const router = require('express').Router();
const cors = require('cors');

router.use(cors());
router.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

router.use('/api/v0/data', require('./dataController'));

router.get('/api/v0/', (req, res) => {
    res.status(200).json({message: 'Connected to Api!'});
});

module.exports = router;