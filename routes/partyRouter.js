const { response } = require('express');
var express = require('express');
const { NULL } = require('mysql/lib/protocol/constants/types');
var router = express.Router();
const db = require('../models');
const { generateToke, verifyToken } = require('../utils/jwtUtil');

router.get('/getAll', async (req, res) => {
    try {
        const parties = await db.party.findAll({ raw: true });
        if (parties) {
            return res.send(
                {
                    status: "success",
                    statusCode: 200,
                    msg: "Party details!!",
                    data: parties
                }
            );
        }
        else {
            return res.send({
                status: "success",
                statusCode: 404,
                msg: "Parties not found!!"
            });
        }
    } catch (error) {
        console.log(error);
        return res.send(
            {
                status: "error",
                statusCode: 501,
                msg: "Something went wrong!!"
            }
        );
    }
});

router.post('/add', async (req, res) => {
    try {
        const party = await db.party.create(req.body);
        if (party) {
            return res.send(
                {
                    status: "success",
                    statusCode: "201",
                    msg: "Party added successfully!!",
                    data: party
                }
            );
        }
        else {
            return res.send(
                {
                    status: "error",
                    statusCode: 400,
                    msg: "Can not add party!!"
                }
            );
        }
    } catch (error) {
        console.log(error);
        return res.send(
            {
                status: "success",
                statusCode: 501,
                msg: "Something went wrong!!"
            }
        );
    }
});

router.get('/getByEmail', async (req, res) => {
    try {
        const party = await db.party.findOne({
            where: {
                email: req.query.email
            }
        });
        if (party) {
            return res.send(
                {
                    status: "success",
                    statusCode: 200,
                    msg: "Party details!!",
                    data: party
                }
            );
        }
        else {
            return res.send(
                {
                    status: "success",
                    statusCode: 404,
                    msg: "Data not found!!"
                }
            );
        }
    } catch (error) {
        console.log(error);
        return res.send(
            {
                status: "error",
                statusCode: 501,
                msg: "Something went wrong!!"
            }
        );
    }
});

module.exports = router;