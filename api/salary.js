const db = require('../model/mongo');
const moment = require('moment');
const ID = require('mongodb').ObjectID;

const dbName = 'salary';

//导入工资表
const UploadSalary = async(req,res)=>{
    //薪资类型
    const salaryType = req.body.salaryType;
    //薪资月份
    const time = req.body.time;

    //报表数据
    const data = req.excel;

    //前两行为表头，最后一行为合计
    const datas = data.data.filter(v=>v.length);
    const [tableName,cols,...content] = datas;
    const body = content.slice(0,content.length-2);
    const total = content.pop();

    const result = await db.DataModel(dbName).insertOne({
        time,
        name:tableName[0],
        cols,
        body,
        total,
        salaryType,
        createTime:new Date().getTime(),
    });

    if (result.result.ok === 1){
        return res.json({code:0,data:true})
    }else {
        return res.json({code:1,msg:'导入失败'})
    }
};

const List = async(req,res)=>{
    const {page=1,limit=20,salaryType,time} = req.body;
    const offset = (page-1)*limit;
    const query = {};
    if (salaryType !== undefined){
        query.salaryType = salaryType
    }
    if (time !== undefined){
        query.time = time
    }
    const list = await db.DataModel(dbName).find({...query},{offset,limit,sort:{createTime:1}}).toArray();
    const totalCount = await db.DataModel(dbName).countDocuments({...query});
    return res.json({code:0,data:{list, totalCount}})
};

const Deatail = async(req,res)=>{
    const {_id} = req.body;
    const data = await db.DataModel(dbName).findOne({_id:ID(_id)});
    return res.json({code:0,data});
};

const Del = async(req,res)=>{
    const {_id} = req.body;
    const data = await db.DataModel(dbName).deleteOne({_id:ID(_id)});
    return res.json({code:0,data})
};

const Update = async(req,res)=>{
    const {_id} = req.body;
    const data = await db.DataModel(dbName).deleteOne({_id:ID(_id)});
    return res.json({code:0,data})
};

module.exports = {
    UploadSalary,
    List,
    Deatail,
    Del,
    Update,
};