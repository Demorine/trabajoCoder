const Product = require('../models/product.model')

async function findProduct() {

    return Product.find().lean()

}

async function paginate(findQuery, options) {

    return Product.paginate(findQuery, options)

}

module.exports = {
    findProduct,
    paginate,
}