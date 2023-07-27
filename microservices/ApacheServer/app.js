if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const Sequelize = require("sequelize");
const config = require("./config/config.json");

const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const env = process.env.NODE_ENV || "development";
const dbConfig = config[env];

// Create a Sequelize instance and pass the configuration options
const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: dbConfig.dialect,
    // Additional options can be added here (e.g., logging: false to disable SQL query logging)
  }
);

// Test the database connection
sequelize
  .authenticate()
  .then(() => {
    console.log(
      "Connection to the database has been established successfully."
    );
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

// Define the Lagu model corresponding to your "lagu" table structure
const Lagu = sequelize.define(
  "lagu",
  {
    idlagu: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    edp: {
      type: Sequelize.INTEGER,
    },
    judul: {
      type: Sequelize.STRING(255),
    },
    artis: {
      type: Sequelize.STRING(255),
    },
    path: {
      type: Sequelize.STRING(255),
    },
    voc: {
      type: Sequelize.INTEGER,
    },
    xvoc: {
      type: Sequelize.INTEGER,
    },
    gol: {
      type: Sequelize.INTEGER,
    },
    jenis: {
      type: Sequelize.INTEGER,
    },
    hade: {
      type: Sequelize.INTEGER,
    },
    vol: {
      type: Sequelize.INTEGER,
    },
    hits: {
      type: Sequelize.INTEGER,
    },
    new: {
      type: Sequelize.INTEGER,
    },
    popular: {
      type: Sequelize.INTEGER,
    },
    idsource: {
      type: Sequelize.INTEGER,
    },
    datertime: {
      type: Sequelize.DATE,
    },
    judul3: {
      type: Sequelize.STRING(255),
    },
    exjudul: {
      type: Sequelize.STRING(255),
    },
    artis3: {
      type: Sequelize.STRING(255),
    },
    exartis: {
      type: Sequelize.STRING(255),
    },
    Balancing: {
      type: Sequelize.INTEGER,
    },
  },
  {
    // The name of the table in the database (default is 'lagus')
    tableName: "lagu",
    // Timestamps (createdAt and updatedAt) columns will be automatically created
    timestamps: false,
  }
);

app.get("/songs", (req, res) => {
  Lagu.findAll({
    offset: 50000,
    limit: 100000,
    order: [["idlagu", "ASC"]],
  })
    .then((songs) => {
      res.json(songs);
    })
    .catch((err) => {
      console.error("Error fetching songs:", err);
      res.status(500).json({ error: "Failed to fetch songs" });
    });
});

app.listen(port, () => {
  console.log(`Apahce Server listening on port ${port}`);
});
