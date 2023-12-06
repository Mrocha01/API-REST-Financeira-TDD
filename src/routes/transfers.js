const express = require('express');
// const RecursoIndevidoError = require("../errors/RecursoIndevidoError");

module.exports = (app) => {
    const router = express.Router();

    router.get('/', (req, res, next) => {
        app.services.transfers.find({user_id: req.user.id})
            .then(result => res.status(200).json(result))
            .catch(err => next(err));
    });

   
    return router;
};