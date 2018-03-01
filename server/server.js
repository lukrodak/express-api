const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');
const {ObjectID} = require('mongodb');

const port = 8080;
const {mongoose} = require('./db/mongoose');
const {Data} = require('./models/data');
const helper = require('./helpFunctions');

const app = express();
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//add new data
app.post('/data', (req, res) => {
    Data.insertMany(req.body).then((docs) => {
        res.status(200).send(docs);
    }).catch((err) => {
        res.status(400).send(err);
    })
});

//fetch all data
app.get('/data', (req, res) => {
    Data.find().then((docs) => {
        res.send({docs});
    }, (err) => {
        res.status(400).send(err);
    });
});

//delete data by id
app.delete('/data/:id', (req, res) => {
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

//update data // @Todo fix status response if is bad request
app.patch('/data', (req, res) => {
    req.body.forEach(function(value){
        helper.validateData(value.partNumber, value.totalChecked, value.reworked, value.nok, value.remarks)
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
            return res.status(404).send(e);
        });
    });
    return res.status(200).send(req.body);
});

app.patch('/data/:id', (req, res) => {
    const id = req.params.id;
    const {partNumber, totalChecked, reworked, nok, remarks} = req.body;
    const body = _.pick(req.body, ['partNumber', 'totalChecked', 'reworked', 'nok', 'remarks']);

    //Valid id 
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    //Validate data   
    helper.validateData(partNumber, totalChecked, reworked, nok, remarks).then(() => {
        Data.findOneAndUpdate({
            _id: id,
        }, {
            $set: body
        }, {
            new: true
        }).then((data) => {
            if (!data) return res.status(404).send();

            res.send({data});
        }, (err) => {
            res.status(400).send();
        });
    }).catch((e) => {
        return res.status(404).send(e);
    });
});


app.listen(port, () => {
    console.log(`Starting server on ${port}`);
});