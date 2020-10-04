const express = require('express');

const contactRouter = express.Router()

contactRouter.get('/', (req, res, next)=>{
res.send('hello')
})


module.exports = contactRouter;