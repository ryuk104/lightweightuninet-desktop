import MongoStore from 'connect-mongo'
import express from 'express'

mongoose.connect('mongodb+srv://ryuk:jz1234@cluster0.id76b.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true,
  useCreateIndex: true
})
.then((result) => console.log('connected to db'))
.catch((err) => console.log(err))