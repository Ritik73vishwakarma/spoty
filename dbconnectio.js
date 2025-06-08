const { MongoClient } = require("mongodb");
const url = "mongodb://localhost:27017";

const client = new MongoClient(url);
const dbname = "spotify";

let dbritik = async () => {
    await client.connect();
    const db = client.db("spotify");
    return db;
};

module.exports = dbritik;