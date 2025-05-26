const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const { User} = require('../models/models')
const tokenController = require('./tokenController')
const UserDto = require('../dtos/UserDto')

class UserController {

    async registration(req, res, next) {
        try {
            const { name, email, password, departmentId, role } = req.body

            if (!name || !email || !departmentId || !password) {
                return next(ApiError.badRequest('Заполнтье все поля'))
            }

            const candidate = await User.findOne({ where: { email: email } })

            if (candidate) {
                return next(ApiError.badRequest('Сотрудник с такой почтой уже существует'))
            }

            const hashPassword = await bcrypt.hash(password, 5)
            const user = await User.create({ name, email,  password: hashPassword, departmentId, role})

            const userDto = new UserDto(user)

            return res.json({User: {...userDto}})
            // res.cookie('accessToken', tokens.accessToken, {maxAge: 60 * 60 * 1000, httpOnly: true})
            // return res.json({ user: { ...userDto } })

        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async login(req, res, next) {
        try {
            const { email, password } = req.body
            const user = await User.findOne({ where: { email: email } })
            if (!user) {
                throw ApiError.badRequest('Неверная почта или пароль')
            }
            const isPassEquals = bcrypt.compareSync(password, user.password)
            if (!isPassEquals) {
                throw ApiError.badRequest('Неверная почта или пароль')
            }
            const userDto = new UserDto(user)
            const tokens = tokenController.generateTokens({ ...userDto })
            await tokenController.saveToken(userDto.id, tokens.refreshToken)


            res.cookie('refreshToken', tokens.refreshToken, { maxAge: 10 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json({...tokens, User: {...userDto}})
            // res.cookie('accessToken', tokens.accessToken, {maxAge: 60 * 60 * 1000, httpOnly: true})
            // return res.json({ user: { ...userDto } })

        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async logout(req, res, next) {
        try {
            const { refreshToken } = req.cookies
            const deletedToken = await tokenController.removeToken(refreshToken)
            res.clearCookie('refreshToken')
            //res.clearCookie('accessToken')
            return res.json(deletedToken)

        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async refresh(req, res, next) {
        try {
            const { refreshToken } = req.query
            if (!refreshToken) {
                throw ApiError.badRequest('Не авторизован')
            }
            const userData = tokenController.validateRefreshToken(refreshToken)
            const tokenFromDb = tokenController.findToken(refreshToken)
            if (!userData || !tokenFromDb) {
                throw ApiError.badRequest('Не авторизован')
            }
            const user = await User.findOne({ where: { id: userData.id } })
            const userDto = new UserDto(user)
            const tokens = tokenController.generateTokens({ ...userDto })

            await tokenController.saveToken(userDto.id, tokens.refreshToken)

            res.cookie('refreshToken', tokens.refreshToken, { maxAge: 10 * 24 * 60 * 60 * 1000, httpOnly: true })
            //res.cookie('accessToken', tokens.accessToken, {maxAge: 60 * 60 * 1000, httpOnly: true})

            //return res.json({ user: userDto })
            return res.json({...tokens, user: {...userDto}})
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAllUsers(req, res, next) {
        try {
            return res.json(await User.findAll())
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }


    }


    async getUserByUserID(req, res, next) {
        try {
            const { id } = req.body
            const user = await User.findOne({ where: { id: id } })
            const userDto = new UserDto(user)
            return res.json({...userDto})

        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}
module.exports = new UserController()