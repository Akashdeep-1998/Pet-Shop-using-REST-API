const mongoose=require('mongoose');
const petSchema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    name:String,
    price: Number,
    petImage:String
})
module.exports=mongoose.model('Pet',petSchema);