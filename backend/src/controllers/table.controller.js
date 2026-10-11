const tableModels = require("../models/table.models");
const { generateSecureToken } = require("../utils/util");
/**
 * @function isTableExist to find already existed table
 * @param {*} params 
 * @returns if table exist true else false
 */


const isTableExist = async (params) => {
    try {
        return await tableModels.findOne(params).exec()
    } catch (error) {
        console.log(error.message)
    }
}

const addTable = async (req, res) => {
    try {
        const { capacity } = req.body;
        const tableNumber = generateSecureToken();
        const table = await tableModels.create({
            tableNumber,
            capacity
        })
        return res.status(201).json({ data: { table } })
    } catch (error) {
        return res.status(500).json(error.message)
    }
}



const getTables = async (req, res) => {
    try {
        const result = await tableModels.aggregate([
            {
                $facet: {
                    tables: [
                        // { $project: { password: 0, token: 0 } } // Excludes password field
                    ],
                    totalCount: [
                        { $count: "count" }
                    ]
                }
            }
        ]);
        return res.status(200).json({ data: { tables: result[0].tables, count: result[0].totalCount } })
    } catch (error) {
        return res.status(500).json(error.message)
    }
}


const getTable = async (req, res) => {
    try {
        const table = await tableModels.findById(req.params.id).exec()
        return res.status(200).json({ data: { table } })
    } catch (error) {
        return res.status(500).json(error.message)
    }
}


const updateTable = async (req, res) => {
    try {
        const id = req.params.id;
        if (!isTableExist({ _id: id })) throw new Error("Menu not found.")
        const updatedTable = await tableModels.findByIdAndUpdate(id, { ...req.body }, { new: true }).exec();
        return res.status(200).json({ data: { updatedTable } })
    } catch (error) {
        return res.status(500).json(error.message)
    }
}


const deleteTable = async (req, res) => {
    try {
        await tableModels.findByIdAndDelete(req.params.id).exec();
        return res.status(201).json({ msg: 'table deleted.' })
    } catch (error) {
        return res.status(500).json(error.message)
    }
}

module.exports = {
    addTable,
    getTables, getTable, updateTable, deleteTable
}