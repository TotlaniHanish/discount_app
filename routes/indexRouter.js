var express = require('express');
const { NULL } = require('mysql/lib/protocol/constants/types');
// const { Op } = require('sequelize/types');
var router = express.Router();
// var connection = require('../lib/dbCon');
const db = require('../models');
const { generateToken, verifyToken } = require('../utils/jwtUtil');

router.get('/', (req, res) => {
    const resp = {
        "status": "success",
        "msg": "request reached successfully!!"
    };
    return res.send(resp);
});

router.post('/login', async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        console.log(email + "  " + password);
        const user = db.user;
        const userFromDB = await user.findOne(
            {
                where:
                {
                    email: email,
                    password: password
                },
                raw: true
            }
        );
        if (userFromDB && email == userFromDB.email && password == userFromDB.password) {
            const token = generateToken({ id: userFromDB.id, email: userFromDB.email });
            const cond = {
                email: email
            };
            const updateUser = await user.update(
                {
                    token: token
                },
                {
                    where: cond
                }
            );
            if (!updateUser) {
                throw new Error();
            }
            const resp = {
                "status": "success",
                "statusCode": 200,
                "msg": "Login successfull!!",
                "data": {
                    "token": token,
                    "user": updateUser
                }
            };
            return res.status(200).send(resp);
        }
        throw new Error();
    } catch (error) {
        console.log(error);
        const resp = {
            "status": "error",
            "msg": "Wrong credentials!!"
        };
        return res.status(400).send(resp);
    }
});

router.post('/signup', async (req, res) => {
    try {
        const user = await db.user.create(req.body);
        if (user) {
            return res.send(
                {
                    status: "success",
                    statusCode: "201",
                    msg: "User created successfully!!",
                    data: user
                }
            );
        } else {
            return res.send(
                {
                    status: "error",
                    statusCode: 400,
                    msg: "Can not add user!!"
                }
            );
        }
    } catch (error) {
        console.log(error);
        return res.send({
            status: "success",
            statusCode: 501,
            msg: "Something went wrong!!"
        });
    }
})

router.post('/logout', verifyToken, (req, res) => {
    const id = req.userId;
    const email = req.email;
    const user = db.user;
    const updateUser = user.update(
        {
            token: null
        },
        {
            where: {
                email: email,
                id: id
            }
        }
    );
    var resp = {};
    if (updateUser) {
        resp = {
            "status": "success",
            "statusCode": 200,
            "msg": "logout success"
        }
    }
    else {
        resp = {
            "status": "error",
            "statusCode": 501,
            "msg": "something went wrong!!"
        };
    }
    return res.send(resp);
});

module.exports = router;