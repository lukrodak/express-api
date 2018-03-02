const router = require('express').Router();
const {mongoose} = require('../db/mongoose');
const {Data} = require('../models/data');
const {ObjectID} = require('mongodb');
const bodyParser = require('body-parser');
router.use(bodyParser.json());

const _ = require('lodash');

// const {Data} = require('./models/data');
// const helper = require('../shared/helpFunctions');
const helper = require('../validators/dataValidator');
// fetch all data
router.get('/', (req, res) => {
    Data.find().then((data) => {
        res.send({data});
    }, (err) => {
        res.status(400).send(err);
    });
});

//add new data
router.post('/', (req, res) => {
    Data.insertMany(req.body).then((docs) => {
        res.status(200).send(docs);
    }).catch((err) => {
        res.status(400).send(err);
    })

    // req.body.forEach(function (value) {
    //     helper.validateData(value)
    //         .then(() => {
    //             const data = new Data({
    //                 partNumber: value.partNumber,
    //                 totalChecked: value.totalChecked,
    //                 reworked: value.reworked,
    //                 nok: value.nok,
    //                 remarks: value.remarks,
    //                 totalOk: value.totalOk,
    //                 fromThisOk: value.fromThisOk
    //             });
    //             data.save().then(
    //                 () => {},
    //                 (err) => {
    //
    //                 return res.status(400).send(err);
    //             });
    //         }).catch((err) => {
    //         console.log('Data should be rollback');
    //         return res.status(400).send(err);
    //     }).then(()=>{
    //         return res.status(200).send(req.body);
    //     });
    // });


});
//update data // @Todo fix status response if is bad request
router.patch('/', (req, res) => {

    req.body.forEach(function (value) {
        // helper.validateData(value.partNumber, value.totalChecked, value.reworked, value.nok, value.remarks, value.totalOk, value.fromThisOk)
        helper.validateData(value)
            .then(() => {
                Data.findOneAndUpdate({
                    _id: value._id,
                }, {
                    $set: value
                }, {
                    new: true
                    // runValidators: true
                }).then((data) => {
                    if (!data) return res.status(404).send();

                }, (err) => {
                    console.log('err');
                    return res.status(400).send();
                });
            }).catch((e) => {
            console.log('Data should be rollback');
            return res.status(404).send(e);
        }).then(()=>{
            return res.status(200).send(req.body);
        });
    });
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