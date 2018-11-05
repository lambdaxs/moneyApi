const db = require('../model/mongo');
const moment = require('moment');
const ID = require('mongodb').ObjectID;

const dbName = 'staff';

// 性别 部门 身份证号 手机 备注 状态
const Add = async(req,res)=>{
    const {code,name,dep,sex,idcard,phone,comment,status} = req.body;
    const resp = await db.DataModel(dbName).insertOne({
        code,
        name,
        dep,
        sex,
        idcard,
        phone,
        comment,
        status,
        createTime:new Date().getTime(),
    });
    if (resp.result.ok === 1){
        return res.json({code:0,data:true})
    }else {
        return res.json({code:1,msg:'插入失败'})
    }
};

const List = async(req,res)=>{
    const {page=1,limit=20,name,code,status} = req.body;
    const offset = (page-1)*limit;
    const query = {};
    if (name !== undefined){
        query.name = name
    }
    if (code !== undefined){
        query.code = code
    }
    if (status !== undefined){
        query.status = status;
    }
    const list = await db.DataModel(dbName).find({...query},{offset,limit}).toArray();
    const totalCount = await db.DataModel(dbName).countDocuments({...query});
    return res.json({code:0,data:{list,totalCount}})
};

const Update = async(req,res)=>{
    const {_id,code, name, dep, sex, idcard, phone, comment, status} = req.body;
    const data = {code, name, dep, sex, idcard, phone, comment, status};
    const result = await db.DataModel(dbName).updateOne({_id:ID(_id)},{$set:{...data}});
    if (result.result.ok === 1){
        return res.json({code:0,data:true})
    }else {
        return res.json({code:0,data:false})
    }
};

const Del = async(req,res)=>{
    const {_id} = req.body;
    const result = await db.DataModel(dbName).deleteOne({_id:ID(_id)});
    if (result.result.ok === 1){
        return res.json({code:0,data:true})
    }else {
        return res.json({code:0,data:false})
    }
};

module.exports = {
    List,
    Update,
    Add,
    Del,
};