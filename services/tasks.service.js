const Task = require("../models/task.model");
class TaskService {
  async getAll() {
    try {
      const data = await Task.find({});
      return data;
    } catch (error) {
      console.error("Error to find All data");
      throw new Error();
    }
  }

  async getById(id) {
    try {
      const data = await Task.findById(id);
      return data;
    } catch (error) {
      console.error(`Error to retrieving task with id : ${id}`);
      throw new Error("Failed to retrieve task dont found");
    }
  }

  async createTask(data) {
    try {
      const newData = await Task.create(data);
      return newData;
    } catch (error) {
      console.error("Error to create data: ", error);
      throw error;
    }
  }

  async updateTask(id, body) {
    try {
        const updateData = await Task.findByIdAndUpdate(id, body, {new: true, runValidators: true})
        return updateData
    } catch (error) {
        console.error(`Error to update data, do not find id: ${id}`)
        throw error 
    }
  }

  async deleteTask(id) {
    try {
      const data = await Task.findByIdAndDelete(id);
      return data;
    } catch (error) {
      console.error("Error to delete data with id: ", id);
      throw new Error(`No Task With Id: ${id}`);
    }
  }
}

module.exports = new TaskService();
