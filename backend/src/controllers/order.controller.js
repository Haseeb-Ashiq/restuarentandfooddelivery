const orderModels = require("../models/order.models");
const { v4 } = require('uuid');
const addOrder = async (req, res) => {
    try {
        const { items, customer, table, orderType } = req.body;

        let order = await orderModels.create({
            orderNumber: v4(),
            customer,
            table,
            orderType,
            items: items.map(item => ({ ...item, subtotal: item.unitPrice * item.quantity })),
            subtotal: items.reduce((sum, item) => sum + (item?.unitPrice * item?.quantity), 0)
        })
            .then(doc =>
                doc
                    .populate([
                        { path: 'customer', select: 'name email' },
                        { path: 'table', select: 'tableNumber capacity' }
                    ]))

        return res.status(201).json({ data: { order } })
    } catch (error) {
        return res.status(500).json(error.message);
    }
}




const getOrders = async (req, res) => {
    try {
        const result = await orderModels.aggregate([
            {
                $facet: {
                    orders: [
                        // { $project: { password: 0, token: 0 } } // Excludes password field
                    ],
                    totalCount: [
                        { $count: "count" }
                    ]
                }
            }
        ]);
        return res.status(200).json({ data: { orders: result[0].orders, count: result[0].totalCount } })
    } catch (error) {
        return res.status(500).json(error.message)
    }
}


const getOrder = async (req, res) => {
    try {
        const order = await orderModels.findById(req.params.id).exec()
        return res.status(200).json({ data: { order } })
    } catch (error) {
        return res.status(500).json(error.message)
    }
}

const deleteOrder = async (req, res) => {
    try {
        await orderModels.findByIdAndDelete(req.params.id).exec();
        return res.status(201).json({ msg: 'order deleted.' })
    } catch (error) {
        return res.status(500).json(error.message)
    }
}


module.exports = { addOrder, getOrders, getOrder, deleteOrder }