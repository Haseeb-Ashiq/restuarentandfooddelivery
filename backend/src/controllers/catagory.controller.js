const catagoryModels = require("../models/catagory.models");
const bcrypt = require('bcryptjs');
const { JwtSign } = require("../utils/util");

const isCatagoryExist = async (params) => {
    try {
        return await catagoryModels.findOne(params).exec()
    } catch (error) {
        console.log(error.message)
    }
}

const addCatagory = async (req, res) => {
    try {
        const { name, description } = req.body;
        const file = req.file
        const catagory = await catagoryModels.create({
            name,
            description,
            image: { name: file.originalname, url: `localhost:5000/public/${file.filename}` },
            isActive: true
        })
        return res.status(201).json({ data: { catagory } })
    } catch (error) {
        return res.status(500).json(error.message)
    }
}



const getCatagories = async (req, res) => {
    try {
        const result = await catagoryModels.aggregate([
            {
                $facet: {
                    catagories: [
                        // { $project: { password: 0, token: 0 } } // Excludes password field
                    ],
                    totalCount: [
                        { $count: "count" }
                    ]
                }
            }
        ]);
        return res.status(200).json({ data: { catagories: result[0].catagories, count: result[0].totalCount } })
    } catch (error) {
        return res.status(500).json(error.message)
    }
}


const getCatagory = async (req, res) => {
    try {
        const catagory = await catagoryModels.findById(req.params.id).exec()
        return res.status(200).json({ data: { catagory } })
    } catch (error) {
        return res.status(500).json(error.message)
    }
}


const updateCatagory = async (req, res) => {
    try {
        const id = req.params.id;
        if (!isCatagoryExist({ _id: id })) throw new Error("Catagory not found.")
        const updatedCatagory = await catagoryModels.findByIdAndUpdate(id, { ...req.body }, { new: true }).exec();
        return res.status(200).json({ data: { updatedCatagory } })
    } catch (error) {
        return res.status(500).json(error.message)
    }
}


const deleteCatagory = async (req, res) => {
    try {
        await catagoryModels.findByIdAndDelete(req.params.id).exec();
        return res.status(201).json({ msg: 'catagory deleted.' })
    } catch (error) {
        return res.status(500).json(error.message)
    }
}

module.exports = {
    addCatagory,
    getCatagories, getCatagory, updateCatagory, deleteCatagory
}