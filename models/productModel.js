const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    //fields : NAME, PRIE, DESCRIPTION, IMAGE , CATEGORY
    productName : {
        type: String,
        required : true,
    },
    productPrice : {
        type : Number,
        required : true,
    },
    productDescription : {
        type: String,
        required: true,
        maxlength : 300,
    },
    productCategory : {
        type : String,
        requried: true,
    },
    productImage : {
        type: String,
        required : true,
    },
    createdAt : {
        type: Date,
        default : Date.now,
    }

});

//exporting
const Products = mongoose.model('products', ProductSchema);
module.exports = Products;