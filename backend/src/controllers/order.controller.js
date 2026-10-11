const orderModels = require("../models/order.models");
const { v4 } = require('uuid');
const redisClient = require("../utils/redis");
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

        const keys=await redisClient.keys('orders:*');
        if(keys.length > 0){
            await redisClient.del(...keys);
        }
        return res.status(201).json({ data: { order } })
    } catch (error) {
        return res.status(500).json(error.message);
    }
}




const getOrders = async (req, res) => {
    try {
        const page = Math.max(1, parseInt(req.query.page, 10) || 1);
        const limit = Math.max(1, parseInt(req.query.limit, 10) || 10);
        const skip = (page - 1) * limit;
        let cachekey = `orders:page:${page}:limit:${limit}`;
        let cachedData = await redisClient.get(cachekey);
        if (cachedData) {
            return res.status(201).json(JSON.parse(cachedData))
        }
        const result = await orderModels.aggregate([
            {
                $facet: {
                    orders: [
                        { $sort: { createdAt: -1 } },
                        { $skip: skip },
                        { $limit: limit }
                        // { $project: { password: 0, token: 0 } } // Excludes password field
                    ],
                    totalCount: [
                        { $count: "count" }
                    ]
                }
            }
        ]);
        const totalOrders = result[0].totalCount[0]?.count || 0;
        const totalPages = Math.ceil(totalOrders / limit);

        const responseData = {
            data: {
                orders: result[0].orders,
                pagination: {
                    totalOrders,
                    totalPages,
                    currentPage: page,
                    limit
                }
            }
        };
        await redisClient.setex(cachekey, 3600, JSON.stringify(responseData));
        return res.status(200).json(responseData)
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