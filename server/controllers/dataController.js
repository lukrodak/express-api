const router = require('express').Router();
const {mongoose} = require('../db/mongoose');
const {Data} = require('../models/dataModel');
const {ObjectID} = require('mongodb');
const bodyParser = require('body-parser');
router.use(bodyParser.json());

const _ = require('lodash');

const helper = require('../validators/dataValidator');

//get all date
router.get('/', (req, res) => {
    Data.find().then((data) => {
        res.send({data});
    }, (err) => {
        res.status(400).send(err);
    });
});

//add date
router.post('/', (req, res) => {
    Data.insertMany(req.body).then((docs) => {
        res.status(200).send(docs);
    }).catch((err) => {
        res.status(400).send(err);
    })
});

//update data
router.patch('/', (req, res) => {
    if (req.body && req.body.length != 0) {
        req.body.forEach(function (value) {
            helper.validateData(value)
                .then(() => {
                    Data.findOneAndUpdate({
                        _id: value._id,
                    }, {
                        $set: value
                    }, {
                        new: true
                    }).then((data) => {
                        if (!data) return res.status(404).send();

                    }, (err) => {
                        console.log('err');
                        return res.status(400).send();
                    });
                }).catch((e) => {
                console.log('Data should be rollback');
                return res.status(404).send(e);
            }).then(() => {
                return res.status(200).send(req.body);
            });
        });
    } else {
        return res.send('[]');
    }
});

// delete data by id
router.delete('/:id', (req, res) => {
    const id = req.params.id;

    //Valid id
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    //find data and delete
    Data.findOneAndRemove({
        _id: id
    }).then((data) => {
        if (!data) return res.status(404).send();

        res.status(200).send({data});
    }, (err) => {
        res.status(400).send();
    });
});

module.exports = router;