const express = require('express');
const router = express.Router();

const common = require('./api/common');
const salary = require('./api/salary');
const staff = require('./api/staff');

router.get("/ping",function (req, res) {
    return res.json("pong");
});

//导入工资表
router.post('/salary/upload',common.UploadExcelMW,salary.UploadSalary);
//工资表列表
router.post('/salary/list',salary.List);
//工资表详情
router.post('/salary/detail',salary.Deatail);
//删除工资表
router.post('/salary/del',salary.Del);
//编辑工资表
router.post('/salary/update',salary.Update);

//
router.post('/staff/add',staff.Add);
router.post('/staff/list',staff.List);
router.post('/staff/update',staff.Update);
router.post('/staff/del',staff.Del);



module.exports = router;