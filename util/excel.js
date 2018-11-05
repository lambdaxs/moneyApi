const xlsx = require('node-xlsx');
//https://www.npmjs.com/package/node-xlsx

const ReadFile = (path)=>{
    return xlsx.parse(path);
};


const ReadFirstTable = (path)=>{
    const wb = ReadFile(path);
    if (wb.length > 0){
        return wb[0];
    }
};

const ReadBuffer = (data)=>{
    return xlsx.parse(data)
};

const ReadBufferFirstTable = (data)=>{
    let wb = xlsx.parse(data);
    if (wb.length > 0){
        return wb[0];
    }
};

module.exports = {
    ReadFile,
    ReadFirstTable,
    ReadBuffer,
    ReadBufferFirstTable,
};