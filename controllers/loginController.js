const User = require('../models/User')
const { mutipleMongooseToObject, mongooseToObject } = require('../../util/mongoose')
class LoginController {

    index(req, res, next) {
        res.render('login')
    }

    store(req, res, next) {
        // res.send(req.body)
        const user = new User(req.body)
        user.save()
            .then(() => {
                // Trong trường hợp lưu thành công, bạn có thể chuyển hướng hoặc gửi một thông báo thành công, ví dụ:
                res.send('thanh cong'); 
            })
    }

}

module.exports = new LoginController