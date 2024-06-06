const path = require('path')
const productModel = require('../models/productModel')

const createProduct = async(req,res) =>{
    //check incoming data
    console.log(req.body)
    console.log(req.files)



    //Task: destructuring, validation
    const {productName,productPrice,productCategory,productDescription} = req.body;

    if(!productName|| !productPrice|| !productCategory|| !productDescription) {
        return res.status(400).json({
            success : false,
            message : "All fields are required"
        })
    }

  //check product image
  if(!req.files || !req.files.productImage){
    return res.status(400)
  }  

  const {productImage} = req.files;

  //uploading
  //1. Genarate unique name for each file
  const imageName = `${Date.now()}-${productImage.name}`;
  //2. define sspecific path
  const imageUploadPath = path.join(__dirname, `../public/products/${imageName}`)
  //3. Upload to that path
  try{

    await productImage.mv(imageUploadPath)
    
    //save to data database
    const newProduct = new productModel({
        productName : productName,
        productPrice : productPrice,
        productCategory : productCategory,
        productDescription : productDescription,
        productImage : imageName
    })
    const product = await newProduct.save()
    res.status(201).json({
        success : true,
        message : "Product Created",
        data : product
    })



  } catch (error) {
    console.log(error)
    res.json({
        success : false,
        message : 'Internal Server Error',
        error : error
    })
  }
    
}

//fetch all products
const getAllProducts = async(req,res) => {


 try{
    //logic
  //Find all the products
  const products = await productModel.find({})
 // send response
 res.status(201).json({
  "success" : true,
  "message" : "Product fetched successfully!",
  "products" : products
 })

 } catch(error) {
  console.log(error)
 }

}
// fetch single product
const getProduct = async (req,res) => {

  // receive id from URL
  const productId = req.params.id;

  try {
      const product = await productModel.findById(productId)
      console.log(product)
      res.status(201).json({
          success : true,
          message : "Product Fetched!",
          product : product
      })


  } catch (error) {
      console.log(error)
      res.json({
          success : false,
          message : "Server Error!"
       })
  }

}

//delete product
const deleteProduct = async (req,res) => {
//get product id
  const productId = req.params.id;

  try {

    await productModel.findByIdAndDelete(productId)
    res.status(201).json({
      success : true,
      message : "Product Deleted!"
    })
    
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message : "Internal Server Error"
    })
    
  }
}


module.exports = {
    createProduct,
    getAllProducts,
    getProduct,
    deleteProduct

}