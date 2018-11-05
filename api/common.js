const excelUtil = require('../util/excel');

const UploadExcelMW = (req,res,next)=>{
    try {
        const file = req.files['excel'];
        const body = file.data;
        req.excel = excelUtil.ReadBufferFirstTable(body);
    }catch (e) {
        return res.json({code:1,msg:"解析excel文件失败"});
    }
    return next()
};

const ListQueryMW = (req,res,next)=>{
    const {page=1,limit=20,query={}} = req.body;
    const offset = (page-1)*limit;
    req.listParams = {
        offset,
        limit,
        query,
    };
    return next()
};

module.exports = {
    UploadExcelMW,
    ListQueryMW
};