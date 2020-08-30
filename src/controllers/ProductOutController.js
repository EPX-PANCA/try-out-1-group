const { User, Product, product_out} = require("../db/models");

const response = {
    status: true,
    message: "Data OK",
    data: [],
};


const getPagination = (data) => {
    const limit = data.limit ? parseInt(data.limit) : 10
    const offset = data.page <= 1 ? 0 : data.page * limit - limit

    const totalItems = data.count
    const totalPages = data.count == 0 ? 0 : Math.ceil(totalItems / limit)
    const currentPage = offset >= 1 ? data.page : 1
    return {
        limit, offset, totalItems, totalPages, currentPage
    }
}

const attUser = ['full_name','username', 'email', 'phone_number'];
const attProduct = ['name', 'stock', 'price'];
const attIn = ['date', 'total'];

class ProductOutController{
    static async getProductOutAll(req, res){
        try {
            const count = await product_out.count()
            const dt = getPagination({
                limit: req.query.limit,
                page: parseInt(req.query.page),
                count: count
              })
              
            const page = parseInt(req.query.page);
            const limit = parseInt(req.query.limit);
            const offset = page ? page*limit : 0;

            const outProduct = await product_out.findAll({
                attributes: attIn,
                include: [{
                    model: Product,
                    attributes: attProduct,
                    include: [{
                        model: User,
                        attributes: attUser
                    }] 
                }],
                limit: limit,
                offset: offset
            });
            if (outProduct.length !== 0) {
                response.status = true;
                response.data = {
                    outProduct,
                    totalItems: dt.totalItems,
                    totalPages: dt.totalPages,
                    currentPage: dt.currentPage
                  }
                response.message = "Data ditemukan!";
                res.status(200).json(response);
            } else {
                response.data = '';
                response.status = false;
                response.message = "Data tidak ditemukan!";
                res.status(400).json(response);
            }
        } catch (err) {
            response.data = '';
            response.status = false;
            response.message = err.message;
            res.status(400).json(response);
        }
    }

    static async saveProductOut(req,res){
        const {
            body: {date, total,id_product }
        } = req;

        try {
            const saveProduct = await product_out.create({
                date, total,id_product
            });
            response.status = true;
            response.message = "Berhasil simpan data";
            response.data = {
                date: saveProduct.data,
                total: saveProduct.total,
            };
            res.status(201).json(response);
        } catch {
            response.data = '';
            response.status = false;
            response.message = "tidak ada!";
            res.status(400).json(response);
        }
    }

    static async getProductOutId(req,res){
        const { id } = req.params;
        const productdetail = await product_out.findByPk(
            id, {
                attributes: attIn,
                include: [{
                    model: Product,
                    attributes: attProduct,
                    include: [{
                        model: User,
                        attributes: attUser
                    }] 
                }]
            }
        );
        try {
            if (productdetail) {
                response.status = true;
                response.data = productdetail;
                response.message = "data ditemukan!";
                res.status(200).json(response);
            } else {
                response.data = '';
                response.status = false;
                response.message = "Data tidak ditemukan!";
                res.status(400).json(response);
            }
        } catch (error) {
            response.data = '';
            response.status = false;
            response.message = error.message;
            res.status(404).json(response);
        }
    }

    static async updateProductOut(req, res){
        const { id } = req.params;
        const { date, total,id_product} = req.body;
        const auth = await product_out.update({ date, total,id_product },
        { where: { id: id } });

        try {
            if (auth) {
                response.data = true;
                response.message = `success`;
                response.data = await product_in.findByPk(
                    id, {
                        attributes: attIn,
                        include: [{
                            model: Product,
                            attributes: attProduct,
                            include: [{
                                model: User,
                                attributes: attUser
                            }] 
                        }]
                    });
                res.status(200).json(response);
            } else {
                response.data = '';
                response.status = false;
                response.message = "Data gagal diubah!";
                res.status(400).json(response);
            }
        } catch (err) {
            response.data = '';
            response.status = false;
            response.message = err.message;
            res.status(400).json(response);
        }
    }

    static async deleteProductOut(req, res) {
        const { id } = req.params;
        const delProduct = await product_out.destroy({ where: {
            id: id
        }});

        try {
            if (delProduct) {
                response.status = true;
                response.message = `Data berhasil dihapus`;
                response.data = `ID : ${id}`
                res.status(200).json(response);
            } else {
                response.data = '';
                response.status = false;
                response.message = "Data gagal dihapus!";
                res.status(400).json(response);
            }
        } catch (err) {
            response.data = '';
            response.status = false;
            response.message = err.message;
            res.status(400).json(response);
        }
    }
}

module.exports = ProductOutController;