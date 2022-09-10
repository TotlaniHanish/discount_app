var express = require('express');
var router = express.Router();
const db = require('../models');
const { verifyToken } = require('../utils/jwtUtil');

router.post('/shop/add', verifyToken, async (req, res) => {
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
                    status: "error",
                    statusCode: 400,
                    msg: "Can not add shop!!"
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

router.put('shop/update/:id', verifyToken, async(req, res) => {
    try {
        const shop = await db.shop.update(req.body, {
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
                    status: "error",
                    statusCode: 400,
                    msg: "Can not be updated shop!!"
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