const Task = require('../models/task.model')
class TaskService {
    async getAll() {
        try {
            const data = await Task.find()
            return data
        } catch(error) {
            console.error('Error to find All data')
        }
    }

    async getById(id) {
        try {
            const data = await Task.findById(id)
            return data
        } catch (error) {
            console.error(`Error to find data with id : ${id}`)
        }
    }

    async createTask() {

    }

    async updateTask() {

    }

    async deleteTask() {

    }
}

module.exports = new TaskService