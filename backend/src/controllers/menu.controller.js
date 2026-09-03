const menuModels = require("../models/menu.models");

/**
 * @function isMenuExist to find already existed menu
 * @param {*} params 
 * @returns if menu exist true else false
 */


const isMenuExist = async (params) => {
    try {
        return await menuModels.findOne(params).exec()
    } catch (error) {
        console.log(error.message)
    }
}

const addMenu = async (req, res) => {
    try {
        const { name, description, catagory, price } = req.body;
        const file = req.files
        const menu = await menuModels.create({
            name,
            category:catagory,
            description,
            price,
            images: file.map(f => `localhost:5000/public/${f.filename}`)
        })
        return res.status(201).json({ data: { menu } })
    } catch (error) {
        return res.status(500).json(error.message)
    }
}



const getMenues = async (req, res) => {
    try {
        const result = await menuModels.aggregate([
            {
                $facet: {
                    menues: [
                        // { $project: { password: 0, token: 0 } } // Excludes password field
                    ],
                    totalCount: [
                        { $count: "count" }
                    ]
                }
            }
        ]);
        return res.status(200).json({ data: { menues: result[0].menues, count: result[0].totalCount } })
    } catch (error) {
        return res.status(500).json(error.message)
    }
}


const getMenu = async (req, res) => {
    try {
        const menu = await menuModels.findById(req.params.id).exec()
        return res.status(200).json({ data: { menu } })
    } catch (error) {
        return res.status(500).json(error.message)
    }
}


const updateMenu = async (req, res) => {
    try {
        const id = req.params.id;
        if (!isMenuExist({ _id: id })) throw new Error("Menu not found.")
        const updatedMenu = await menuModels.findByIdAndUpdate(id, { ...req.body }, { new: true }).exec();
        return res.status(200).json({ data: { updatedMenu } })
    } catch (error) {
        return res.status(500).json(error.message)
    }
}


const deleteMenu = async (req, res) => {
    try {
        await menuModels.findByIdAndDelete(req.params.id).exec();
        return res.status(201).json({ msg: 'menu deleted.' })
    } catch (error) {
        return res.status(500).json(error.message)
    }
}

module.exports = {
    addMenu,
    getMenues, getMenu, updateMenu, deleteMenu
}