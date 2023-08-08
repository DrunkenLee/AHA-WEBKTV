if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const port = process.env.PORT || 3002;
const cors = require("cors");
const { connect } = require("./config/mongoConnect");

let changeStream; // Declare the change stream variable outside the route handler

connect().then(async (database) => {
  console.log("Mongo DB Connected");
  const collection = database.collection("playercontrol"); // Replace "your_collection_name" with the actual collection name

  // Create the change stream and assign it to the variable
  changeStream = collection.watch();

  // Set up error handling for the change stream
  changeStream.on("error", (error) => {
    console.error("Change stream error:", error);
  });
});

app.locals.clients = [];

app.get("/listen", async (req, res) => {
  try {
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Transfer-Encoding", "chunked");

    // Add the response object to the list of connected clients
    app.locals.clients.push(res);

    // Listen for changes and stream them to the client
    const changeListener = (change) => {
      // Convert the change event to JSON and send it as a chunk
      console.log(change);
      res.write(JSON.stringify(change));
    };

    changeStream.on("change", changeListener);

    // Handle stream end
    res.on("close", () => {
      // Remove the change listener when the client disconnects
      changeStream.removeListener("change", changeListener);
      // Close the change stream if there are no more clients
      if (app.locals.clients.length === 0) {
        changeStream.close();
      }
    });
  } catch (error) {
    res.send(error);
  }
});

app.listen(port, () => {
  console.log(`Mongo DB Service Running on port ${port} ->`);
});
