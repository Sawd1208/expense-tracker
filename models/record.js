const express = require('express')
const Schema = mongoose.Schema
const recordSchema = new Schema({
  name: { type: String, require: true },
  date: { type: Date, require: true },
  amount: { type: Number, require: true },
  userId: { 
    type: Schema.Types.objectId,
    ref: 'User',
    index: true,
    require: true,
   },
  categoryId: {
    type: Schema.Types.objectId,
    ref: 'Category',
    index: true,
    require: true,
   }
})

module.exports = mongoose.model('Record', recordSchema)