const { Product, product_in, User} = require("../models");

const response = {
    status: true,
    message: "Data OK",
    data: [],
};

const attUser = ['full_name','username', 'email', 'phone_number'];
const attProduct = ['name', 'stock', 'price'];
const attIn = ['date', 'total'];

class ProductInController{
    static async getProductInAll(req,res){
        try {
            const inProduct = await product_in.findAll({
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
            if (inProduct.length !== 0) {
                response.status = true;
                response.data = inProduct;
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

    static async getProductId(req,res){
        const { id } = req.params;
        const productdetail = await product_in.findByPk(
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
                response.message = "not found!";
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

    static async saveProductIn(req,res){
        const {
            body: {date, total,id_product }
        } = req;

        try {
            const saveProduct = await product_in.create({
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

    static async updateProductIn(req, res){
        const { id } = req.params;
        const { date, total,id_product} = req.body;
        const auth = await product_in.update({ date, total,id_product },
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

    static async deleteProductIn(req, res) {
        const { id } = req.params;
        const delProduct = await product_in.destroy({ where: {
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

module.exports = ProductInController;