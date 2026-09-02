const customerModels = require("../models/customer.models");
const bcrypt = require('bcryptjs');
const { JwtSign } = require("../utils/util");
try {
    return await customerModels.findOne(params).exec()
} catch (error) {
    console.log(error.message)
}



const register = async (req, res) => {
    try {
        const { name, email, password, role, phone } = req.body;
        const hashpassword = await bcrypt.hash(password, 10);
        const user = await customerModels.create({
            name,
            email,
            password: hashpassword,
            phone,
            isActive: false
        })
        return res.status(201).json({ data: { user } })
    } catch (error) {
        return res.status(500).json(error.message)
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        let isPasswordMatched;
        const user = await isUserExist({ email });
        if (!user) throw new Error('Email not valid.')
        isPasswordMatched = await bcrypt.compare(password, user.password)
        if (!isPasswordMatched) throw new Error('Password not correct.')
        const token = await JwtSign({ _id: user._id, email: user.email }, { expiresIn: '1h' })
        res.cookie('customer-token', token, {
            httpOnly: true,
            maxAge: 60 * 60,
            secure: false
        })
        user.token = token;
        await user.save()
        return res.status(200).json({ data: { user, auth: true } })


    } catch (error) {
        return res.status(500).json(error.message)
    }
}

const getCustomers = async (req, res) => {
    try {
        const result = await customerModels.aggregate([
            {
                $facet: {
                    users: [
                        { $project: { password: 0, token: 0 } } // Excludes password field
                    ],
                    totalCount: [
                        { $count: "count" }
                    ]
                }
            }
        ]);
        return res.status(200).json({ data: { customers: result[0].users, count: result[0].totalCount } })
    } catch (error) {
        return res.status(500).json(error.message)
    }
}

const getCustomer = async (req, res) => {
    try {
        const customer = await customerModels.findById(req.params.id).select('-password').exec()
        return res.status(200).json({ data: { customer } })
    } catch (error) {
        return res.status(500).json(error.message)
    }
}

const updateCustomer = async (req, res) => {
    try {
        const id = req.params.id;
        if (!isUserExist({ _id: id })) throw new Error("User not found.")
        const updatedCustomer = await customerModels.findByIdAndUpdate(id, { ...req.body }, { new: true }).exec();
        return res.status(200).json({ data: { updatedCustomer } })
    } catch (error) {
        return res.status(500).json(error.message)
    }
}


const deleteCustomer = async (req, res) => {
    try {
        await customerModels.findByIdAndDelete(req.params.id).exec();
        return res.status(201).json({ msg: 'customer deleted.' })
    } catch (error) {
        return res.status(500).json(error.message)
    }
}

module.exports = { register, getCustomers, getCustomer, updateCustomer, deleteCustomer, login }