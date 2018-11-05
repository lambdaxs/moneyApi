const express = require("express");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const app = express();
const router = require("./router");
const dataSource = require('./model/mongo');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(fileUpload());
app.use(router);

//初始化数据源
dataSource.Init();


const port = 3000;
app.listen(port, err => {
    if (err) {
        console.log(err);
    } else {
        console.log(`http server start at ${port}`);
    }
});
