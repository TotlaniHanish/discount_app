var express = require('express');
var router = express.Router();
const db = require('../models');
const { verifyToken } = require('../utils/jwtUtil');

router.post('/add', async (req, res) => {
    try {
        const body = req.body;
        body.userId = req.userId;
        const shop = await db.shop.create(body);
        if (shop) {
            return res.send(
                {
                    status: "success",
                    statusCode: "201",
                    msg: "Shop created successfully!!",
                    data: shop
                }
            );
        } else {
            return res.send(
                {
                    status: "success",
                    statusCode: 400,
                    msg: "Can not add shop!!"
                }
            );
        }
    } catch (error) {
        console.log(error);
        return res.send({
            status: "error",
            statusCode: 501,
            msg: "Something went wrong!!"
        });
    }
});

router.post('/update/:id', async(req, res) => {
    try {
        const body = req.body;
        body.userId = req.userId;
        await db.shop.update(body, {
            where: {
                id: req.params.id
            }
        });
        const shop = await db.shop.findOne({
            where: {
                id: req.params.id
            }
        });
        if (shop) {
            return res.send(
                {
                    status: "success",
                    statusCode: "201",
                    msg: "Shop updated successfully!!",
                    data: shop
                }
            );
        } else {
            return res.send(
                {
                    status: "success",
                    statusCode: 400,
                    msg: "Can not be updated shop!!"
                }
            );
        }
    } catch (error) {
        console.log(error);
        return res.send({
            status: "error",
            statusCode: 501,
            msg: "Something went wrong!!"
        });
    }
});

router.get('/get/:id', async(req, res) => {
    try {
        console.log(req.params.id);
        const shop = await db.shop.findOne({
            where: {
                id: req.params.id
            }
        });
        if (shop) {
            return res.send(
                {
                    status: "success",
                    statusCode: "201",
                    data: shop
                }
            );
        } else {
            return res.send(
                {
                    status: "error",
                    statusCode: 400,
                    msg: "Shop not found!!"
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
});

router.get('/getShopByUserId', async(req, res) => {
    try {
        console.log(req.params.id);
        const shop = await db.shop.findOne({
            where: {
                userId: req.userId
            }
        });
        if (shop) {
            return res.send(
                {
                    status: "success",
                    statusCode: "201",
                    data: shop
                }
            );
        } else {
            return res.send(
                {
                    status: "error",
                    statusCode: 400,
                    msg: "Shop not found!!"
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
});

module.exports = router;