const imgSaver = require("../helpers/img-saver")
const User = require("../models/User")
const bcrypt = require("bcrypt")
const fs = require("fs")
const path = require("path")
const { findById } = require('../models/User')

module.exports.getAll = async (req, res) => {
  let users = await User.find({}).lean()
  if(users.length){
    res.status(200).json(users.map(({password, __v, ...user}) => user))
  } else {
    res.status(404).json({message: 'Нет пользователей'})
  }
}

module.exports.get = async (req, res) => {
  let {id} = req.params
  const user = await User.findById(id).lean()
  if(user){
    delete user.password
    delete user.__v
    res.status(200).json(user)
  } else {
    res.status(404).json({message: `Пользователя с таким id ${id} не найден!`})
  }
}

module.exports.create = async (req, res) => {
  let {body} = req
  let hashedPassword = await bcrypt.hashSync(body.password, 10)
  let newUserObj = {
                      fName: body.fName,
                      lName: body.lName,
                      position: body.position,
                      email: body.email,
                      password: hashedPassword
                    }
  if(body.avatar) {
    let avatarFileName = await imgSaver(body.avatar, `avatar`)
    Object.assign(newUserObj, {avatar: avatarFileName})
  }
  let newUser = new User(newUserObj)
  await newUser.save()
  res.status(200).json({message: "Новый пользователь создан!"})

}

module.exports.update = async (req, res) => {
  let {id} = req.params
  let {body} = req
  let checkUser = await User.findById(id)
  if(checkUser) {
    if(body.deleteAvatar) {
      await User.findByIdAndUpdate(id, {avatar: null})
      await fs.unlinkSync(path.join(__dirname, '..', 'uploads', checkUser.avatar))
      res.status(200).json({message: `Удален аватар для пользователя ${checkUser.lName} ${checkUser.fName}` })
    } else {
      let updateData = {
        fName: body.fName,
        lName: body.flName,
        position: body.position,
        email: body.email
      }
      if(body.password) {
        // если в запросе имеется пароль, сгенерировать и добавить в объект для обновления данных
        let hashedPassword = await bcrypt.hashSync(body.password, 10)
        Object.assign(updateData, {password: hashedPassword})
      }
      if(body.avatar) {
        // если в запросе имеется аватар пользователя
        if(checkUser.avatar) {
          // если в базе имеется имя файла аватара, то удалить его
          await fs.unlinkSync(path.join(__dirname, '..', 'uploads', checkUser.avatar))
        }
        // сохранить аватар
        let avatarFileName = await imgSaver(body.avatar, `avatar`)
        Object.assign(updateData, {avatar: avatarFileName})
      }
      let updateResult = await User.findByIdAndUpdate(id, updateData, {new: true})
      console.log(updateResult)
      res.status(200).json({message:`Пользователь ${updateResult.lName} ${updateResult.fName} обновлен!`})
    }

  } else {
    res.status(404).json({message: `Пользватель с таким ID: ${id} не найден`})
  }
}

module.exports.delete = async (req, res) => {
  let {id} = req.params
  let checkUser = await User.findById(id)
  if(checkUser){
    if(checkUser.avatar){
      await fs.unlinkSync(path.join(__dirname, "..", "uploads", checkUser.avatar))
    }
    let deletedUser = await User.findByIdAndDelete(id)
    res.status(200).json({message: `Пользователь ${deletedUser.lName} ${deletedUser.fName} удалён!`, id} )
  } else {
    res.status(404).json({message: `Пользователь с таким ID: ${id} не найден!`})
  }
}