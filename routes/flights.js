var express = require('express');
var router = express.Router();
var app = require('../app.js');
var FLIGHTS_COLLECTION = 'flights';
var mongodb = require('mongodb');
var ObjectID = mongodb.ObjectID;
var db;
mongodb.MongoClient.connect(process.env.MONGO_CONNECTION_URI, function (err, database) {
    if (err) {
        console.log(err);
        process.exit(1);
    }

    // Save database object from the callback for reuse.
    db = database;
    console.log("/flights Database connection ready");
});
// Generic error handler used by all endpoints.
var handleError = function handleError(res, reason, message, code) {
    console.log("ERROR: " + reason);
    res.status(code || 500).json({"error": message});
};

/* GET single FLIGHTS by id listing. */
router.get('/:id', function(req, res, next) {
    var id = req.params.id;
    db.collection(FLIGHTS_COLLECTION).findOne({ _id: new ObjectID(id) }, function(err, doc) {
        if (err) {
            app.handleError(res, err.message, "Failed to find FLIGHTS");
        } else {
            res.status(200).json(doc);
        }
    });
});

/* GET all FLIGHTSs */
router.get('/', function (req, res, next){

    db.collection(FLIGHTS_COLLECTION).find({}).toArray(function (err, docs) {
        if (err){
            app.handleError(res, err.message, "Failed to get FLIGHTSs");
        }

        else {
            res.status(200).json(docs)
        }
    })
});

/*POST FLIGHTS */
router.post('/', function(req, res, next){
    var newFlight = req.body;


    db.collection(FLIGHTS_COLLECTION).insertOne(newFlight, function(err, doc) {
        if (err) {
            handleError(res, err.message, "Failed to create new contact.");
        } else {
            res.status(201).json(doc.ops[0]);
        }
    });
});
/*UPDATE FLIGHTS */
router.put('/:id', function (req, res, next){
    var updateDoc = req.body;
    delete updateDoc._id;

    db.collection(FLIGHTS_COLLECTION).updateOne({_id: new ObjectID(req.params.id)}, updateDoc, function(err, doc) {
        if (err) {
            handleError(res, err.message, "Failed to update FLIGHTS");
        } else {
            updateDoc._id = req.params.id;
            res.status(200).json(updateDoc);
        }
    });
})
/*DELETE FLIGHTS */

router.delete('/:id', function (req, res, next){
    db.collection(FLIGHTS_COLLECTION).deleteOne({_id: new ObjectID(req.params.id)}, function(err, result) {
        if (err) {
            handleError(res, err.message, "Failed to delete FLIGHTS");
        } else {
            res.status(200).json(req.params.id);
        }
    });
})


module.exports = router;
