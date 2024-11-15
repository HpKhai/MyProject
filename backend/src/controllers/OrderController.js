const cookieParser = require('cookie-parser')
const JwtService = require('../services/JwtService')
const OrderService = require('../services/OrderService')

const createOrder = async (req, res) => {

    try {
        const { paymentMethod, itemsPrice, shippingPrice, totalPrice, fullName,
            address, city, phone, origin, uses, report, preserve } = req.body
        if (!paymentMethod || !itemsPrice || !shippingPrice || !totalPrice || !fullName || !address || !city || !phone) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required'
            })
        }
        const response = await OrderService.createOrder(req.body)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }

}
const getOrderDetails = async (req, res) => {
    try {
        const userId = req.params.id;
        if (!userId) {
            return res.status(400).json({
                status: 'ERR',
                message: 'userId là bắt buộc'
            });
        }

        const response = await OrderService.getOrderDetails(userId);
        return res.status(200).json(response); // Trả về mã 200 thay vì 201
    } catch (e) {
        console.error(e);
        return res.status(500).json({
            status: 'ERR',
            message: 'Đã xảy ra lỗi hệ thống, vui lòng thử lại sau'
        });
    }
}

const getDetailsOrder = async (req, res) => {
    try {
        const orderId = req.params.id;
        if (!orderId) {
            return res.status(400).json({
                status: 'ERR',
                message: 'userId là bắt buộc'
            });
        }

        const response = await OrderService.getDetailsOrder(orderId);
        return res.status(200).json(response); // Trả về mã 200 thay vì 201
    } catch (e) {
        console.error(e);
        return res.status(500).json({
            status: 'ERR',
            message: 'Đã xảy ra lỗi hệ thống, vui lòng thử lại sau'
        });
    }
}

const cancelOrderDetails = async (req, res) => {
    try {
        const data = req.body.orderItems
        const orderId = req.body.orderId
        if (!orderId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The orderId is required'
            })
        }
        const response = await OrderService.cancelOrderDetails(orderId, data)
        return res.status(200).json(response)
    } catch (e) {
        // console.log(e)
        return res.status(404).json({
            message: e
        })
    }
}
// const getAllOrder = async (req, res) => {
//     try {
//         const data = await OrderService.getAllOrder()
//         return res.status(200).json(data)
//     } catch (e) {
//         // console.log(e)
//         return res.status(404).json({
//             message: e
//         })
//     }
// }


module.exports = {
    createOrder,
    getOrderDetails,
    getDetailsOrder,
    cancelOrderDetails,
    // getAllOrder

}
