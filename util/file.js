const uuidv4 = require('uuid/v4');
const file = require('fs');
const nodePath = require('path');

const saveFile = (data,format)=>{
    const prefix = 'http://127.0.0.1:3000/file/';
    const fileName = `${uuidv4()}.${format}`;
    const path = `../files/${fileName}`;
    return new Promise((s,f)=>{
        file.writeFile(path,data,{},function (err,resp) {
            console.log(err);
            console.log(resp);
            s({
                url:prefix+fileName,
                path:`${nodePath.resolve(__dirname,'..')}/files/${fileName}`
            });
        })
    });
};

saveFile(`hello`,'txt').then(path=>{
    console.log(path);
});
