const Category = require('./category') 

const getAllCategory = async(req,res)=>{
    const data = await Category.find()
    res.send(data)
}

module.exports = {getAllCategory}