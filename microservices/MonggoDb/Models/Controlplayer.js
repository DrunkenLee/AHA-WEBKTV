const { ObjectId } = require("mongodb");
const { getDB } = require("../config/mongoConnect");

class PlayerControl {
  static getData() {
    const db = getDB();
    const controls = db.collection("playercontrol");
    return controls;
  }

  static async createUser(data) {
    const controls = this.getData();
    return await controls.insertOne(data);
  }

  static async findAll() {
    const controls = this.getData();
    return await controls.find().toArray();
  }

  static async findById(id) {
    const controls = await this.getData();
    return await controls.findOne({ _id: id });
  }

  static async deleteById(id) {
    const controls = await this.getData();
    return await controls.deleteMany({ _id: id });
  }

  static async createBulkUser(data) {
    const controls = this.getData();
    return await controls.insertMany(data);
  }
}

module.exports = PlayerControl;
