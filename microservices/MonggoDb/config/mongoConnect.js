const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();
const dbPassword = process.env.MONGGO_PASS;
const uri = process.env.MONGGODBURI;
let db = null;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function connect() {
  try {
    await client.connect();
    db = client.db("ahakaraokedb");
    return db;
  } catch (error) {
    throw error;
  }
}

function getDB() {
  return db;
}

module.exports = { getDB, client, connect };
