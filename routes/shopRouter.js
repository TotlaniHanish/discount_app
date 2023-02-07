var express = require('express');
var router = express.Router();
const db = require('../models');
const { verifyToken } = require('../utils/jwtUtil');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public");
    },
    filename: (req, file, cb) => {
        cb(null, `files/${file.originalname}`);
        req.sendFileName = file.originalname;
    },
});

const AWS = require('aws-sdk');
const s3 = new AWS.S3({
    accessKeyId: 'AKIA2XHCJNMMHWVTSKHD',
    secretAccessKey: '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',
});

const upload = multer({ storage: multerStorage });

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

router.post('/update/:id', async (req, res) => {
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

router.get('/get/:id', async (req, res) => {
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

router.get('/getShopByUserId', async (req, res) => {
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

router.get('/getShopByCategoryId/:id', async (req, res) => {
    try {
        console.log(req.params.id);
        const shops = await db.shop.findAll({
            where: {
                category: req.params.id
            }
        });
        if (shops) {
            return res.send(
                {
                    status: "success",
                    statusCode: "201",
                    data: shops
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


router.post('/imageUpload', upload.single('myFile'), async (req, res) => {

    try {
        console.log(req);
        console.log("Inside upload image request!!");
        const blob = fs.readFileSync(`public/files/${req.sendFileName}`);

        const uploadedImage = s3.upload({
            Bucket: 'discountappbucket',
            Key: Date.now() + '.'+ req.sendFileName.split(".")[1],
            Body: blob,
        }).promise();
        var fileLocation;
        uploadedImage.then(async (data) => {
            console.log(data);
            fileLocation = data.Location;
            try {
                await fs.unlinkSync(`public/files/${req.sendFileName}`);
                console.log("File deleted!");
            }
            catch (error) {
                console.log("Something went wrong while deleting the file...", error);
            }
            return res.send(
                {
                status: "success",
                statusCode: "200",
                data: {
                    image: req.sendFileName,
                    location: fileLocation
                    }
            });
        }).catch(error => {
            console.log(error);
            return res.send(
            {
                status: "error",
                statusCode: 501,
                msg: error.message
            })
        }) ;

    } catch (error) {
        console.log(error);
        return res.send(
            {
                status: "error",
                statusCode: 501,
                msg: error.message
            }
        );
    }
});

module.exports = router;