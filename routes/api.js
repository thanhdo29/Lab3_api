var express=require('express');
var router=express.Router();

const Distributors=require('../models/distributors');
const Fruits=require('../models/fruits');
const fruits = require('../models/fruits');

//thêm distributor
router.post('/add-distributor', async(req,res)=>{
    try {
        const data=req.body;
        const newDistributor=new Distributors({
            name:data.name
        });
        const result=await newDistributor.save();

        if (result) {
            res.json({
                "status":200,
                "messenger":"Thêm thành công",
                "data":result
            })
        } else {
            res.json({
                "status":400,
                "messenger":"Thêm không thành công",
                "data": []
            })
        }
    } catch (error) {
        console.log(error);
    }
})

//thêm fruits
router.post("/add-fruit", async(req,res)=>{
    try {
        const data=req.body;
        const newFruit=new fruits({
            name:data.name,
            quantity:data.quantity,
            price:data.price,
            status:data.status,
            image:data.image,
            description:data.description,
            id_distributor:data.id_distributor
        });
        const result=newFruit.save();

        if (result) {
            res.json({
                "status":200,
                "messenger":"Thêm thành công",
                "data":result 
            })
        } else {
            res.json({
                "status":400,
                "messenger":"Thêm không thành công",
                "data": [] 
            })
        }
    } catch (error) {
        console.log(error);
    }
});


//get ds fruit
router.get("/get-list-fruit", async(req,res)=>{
    try {
        const data=await Fruits.find().populate('id_distributor');
        res.json({
            "status":200,
            "messenger":"Danh sách Fruit",
            "data":data
        })
    } catch (error) {
        console.log(error);
    }
})


router.get("/get-list-fruit-in-price",async(req,res)=>{
    try {
        const[price_start, price_end]=req.query;

        const query={price: {$gte:price_start, $lte:price_end}};

        const data=await Fruits.find(query,'name quantity price id_distributor')
                                .populate('id_distributor')
                                .sort({quantity:-1})
                                .skip(0)
                                .limit(2)

        res.json({
            "status":200,
            "messenger":"Danh sách fruit",
            "data":data
        })
    } catch (error) {
        console.log(error);
    }
})


router.get('/get-list-fruit-have-name-a-or-x',async(req,res)=>{
    try {
        const query={$or:[
            {name:{$regex:'T'}},
            {name:{$regex:'X'}},
        ]}

        const data=await Fruits.find(query, 'name quantity price id_distributor')
        .populate('id_distributor')
        res.json({
            "status":200,
            "messenger":"Danh sách Fruit",
            "data":data
        })
    } catch (error) {
        console.log(error);
    }
})

//update fruit bằng  id

router.put('/update-fruit-by-id/:id', async(req,res)=>{
    try {
        const {id}=req.params;
        const data=req.body;
        const updateFruit=await Fruits.findById(id);
        let result=null;

        if (updateFruit) {
            updateFruit.name=data.name ??updateFruit.name;
            updateFruit.quantity=data.quantity?? updateFruit.quantity;
            updateFruit.price=data.price?? updateFruit.price;
            updateFruit.status=data.status?? updateFruit.status;
            updateFruit.image=data.image?? updateFruit.image;
            updateFruit.description=data.description?? updateFruit.description;
            updateFruit.id_distributor=data.id_distributor?? updateFruit.id_distributor
            result=await updateFruit.save();
        }

        if (result) {
            res.json({
                "status":200,
                "messenger":"Cập nhât thành công",
                "data":result
            })
        }else{
            res.json({
                "status":400,
                "messenger":"Cập nhât không thành công",
                "data":[]
            })
        }
    } catch (error) {
        console.log(error);
    }
})
module.exports=router