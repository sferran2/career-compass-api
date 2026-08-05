const { MongoClient } = require("mongodb");

let database;
let client;

const initializeDatabase = async () => {
  try {
    client = new MongoClient(process.env.MONGODB);
    await client.connect();

    database = client.db(process.env.DB_NAME);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    throw error;
  }
};

const getDatabase = () => {
  if (!database) {
    throw new Error("Database has not been initialized.");
  }

  return database;
};

const closeDatabase = async () => {
  if (client) {
    await client.close();
    client = null;
    database = null;
  }
};

module.exports = {
  initializeDatabase,
  getDatabase,
  closeDatabase
};