const express = require('express')
const mongoose = require('mongoose')

require('dotenv').config()

const port = process.env.PORT || 3001
const app = express()

const UserSchema = new mongoose.Schema({ 
  name: { type: String, required: true },
  email: { type: String, required: true }, 
  password: { type: String, required: true } 
})
const UserModel = mongoose.model('users', UserSchema)


const theaterSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    capacity: { type: Number, required: true }
  })
  
  const TheaterModel = mongoose.model('Theater', theaterSchema)

mongoose.connect(process.env.URI_MONGODB)

app.get('/users', async (req, res) => { 
  try {
    const users = await UserModel.find()
    res.send(users)
  } catch (err) {
    console.error(err, 'ошибка при получении пользователей')
  }
})

app.get('/users2', async (req, res) => { 
    try {
      const users = await UserModel.findOne({name: "Ned Stark"})
      res.send(users)
    } catch (err) {
      console.error(err, 'ошибка при получении пользователей')
    }
  })




  app.get('/theaters', async (req, res) => {
    try {
      const sortedTheaters = await TheaterModel.find({ theaterId: { $gte: 1000, $lte: 1010 } })
      console.log(sortedTheaters)
      console.log("ну лан хай так")
      res.send(sortedTheaters)
    } catch (error) {
      console.error(error)
    }
  })
  


const name = 'anton'
const email = 'Anton123@gmail.com'
const password = '111222333444'
  
  app.get('/postUser', async (req, res) => {
  try {
    const newUser = new UserModel({
      name:  name,
      email: email,
      password: password
    })
    
    const savedUser = await newUser.save()
    res.send(savedUser)
  } catch (error) {
    console.error(error)
  }
})






  
app.listen(port, () => { 
  console.log(`Server is running on port ${port}`)
})