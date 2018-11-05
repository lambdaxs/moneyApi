const mongoClient = require('mongodb').MongoClient;

// const mongoFunc = {
//     create:['insertOne','insertMany'],
//     update:['updateOne','updateMany','findOneAndUpdate'],
//     find:['find','findOne'],
//     delete:['deleteOne','deleteMany','findOneAndDelete'],
//     analysis:['count','distinct','aggregate']
// };

const addr = "mongodb://127.0.0.1:27017";
const dbname = "money";
let db = null;

const Init = async()=>{
    const client = await createMongoClient(addr);
    client.on('close',()=>{
        console.log(`mongo close success`)
    });
    db = client.db(dbname);
    console.log(`mongo connect success:${addr}`)
};

const createMongoClient = (url) => {
    return new Promise((s, f) => {
        mongoClient.connect(url, {useNewUrlParser: true}, function (err, client) {
            if (err) {
                f(err)
            } else {
                s(client)
            }
        })
    });
};

const DataModel = (colName)=>{
  return db.collection(colName)
};

module.exports = {
  Init,
  DataModel,
};
