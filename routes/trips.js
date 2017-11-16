var express = require('express');
var router = express.Router();
var app = require('../app.js');
var TRIPS_COLLECTION = 'trips';
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
    console.log("/trips Database connection ready");
});
// Generic error handler used by all endpoints.
var handleError = function handleError(res, reason, message, code) {
    console.log("ERROR: " + reason);
    res.status(code || 500).json({"error": message});
};

/* GET single TRIPS by id listing. */
router.get('/:id', function(req, res, next) {
    var id = req.params.id;
    db.collection(TRIPS_COLLECTION).findOne({ _id: new ObjectID(id) }, function(err, doc) {
        if (err) {
            app.handleError(res, err.message, "Failed to find TRIPS");
        } else {
            res.status(200).json(doc);
        }
    });
});

/* GET all TRIPSs */
router.get('/', function (req, res, next){

    db.collection(TRIPS_COLLECTION).find({}).toArray(function (err, docs) {
        if (err){
            app.handleError(res, err.message, "Failed to get TRIPSs");
        }

        else {
            res.status(200).json(docs)
        }
    })
});

/*POST TRIPS */
router.post('/', function(req, res, next){
    var newTrip = req.body;


    db.collection(TRIPS_COLLECTION).insertOne(newTrip, function(err, doc) {
        if (err) {
            handleError(res, err.message, "Failed to create new contact.");
        } else {
            res.status(201).json(doc.ops[0]);
        }
    });
});
/*UPDATE TRIPS */
router.put('/:id', function (req, res, next){
    var updateDoc = req.body;
    delete updateDoc._id;

    db.collection(TRIPS_COLLECTION).updateOne({_id: new ObjectID(req.params.id)}, updateDoc, function(err, doc) {
        if (err) {
            handleError(res, err.message, "Failed to update TRIPS");
        } else {
            updateDoc._id = req.params.id;
            res.status(200).json(updateDoc);
        }
    });
})
/*DELETE TRIPS */

router.delete('/:id', function (req, res, next){
    db.collection(TRIPS_COLLECTION).deleteOne({_id: new ObjectID(req.params.id)}, function(err, result) {
        if (err) {
            handleError(res, err.message, "Failed to delete TRIPS");
        } else {
            res.status(200).json(req.params.id);
        }
    });
})


module.exports = router;
