const {User,Product} = require("../db/models");
const { uploadCloudinary } = require("./UploadController");

const response = {
    status: true,
    message: "Data OK",
    data: [],
};

class ProductController{
    static async getProductAll(req,res){
        try{
            const page = parseInt(req.query.page);
            const limit = parseInt(req.query.limit);

            const offset = page ? page * limit : 0;

            await Product.findAndCountAll({
                include: [
                    { model: User }
                ],
                limit:limit,
                offset:offset
            }).then(data =>{
                const product = {
                    data : data.rows,
                    totalItems: data.count,
                    totalPages: Math.ceil(data.count / limit),
                    currentPages: page+1
                }
                res.json(response);
            }).catch(error => res.json(error))
        }catch (error) {
            response.message = error.message;
            response.data = [];
            response.status = "fail";
            res.status(404).json(response);
          }
    }

    static async getProductId(req,res){
        const { id } = req.params;
        try {
            const products = await Product.findByPk(id, {
                include: [
                    { model: User }
                ]
            });
            if (!products) throw new Error("product not found")
            response.data = products;
            response.status = "success";
            response.message = `success get product data id : ${id}`;
            res.json(response);
        } catch (error) {
            response.message = error.message;
            response.data = [];
            response.status = "fail";
            res.status(404).json(response);
        }
    }

    static async saveProduct(req, res){
        try {
            const dataImage = await uploadCloudinary(req, res);
            const dataCreate = {...req.body, ...dataImage };
            await Product.create(dataCreate);
            response.data = dataCreate;
            response.message = "success save product data";
            response.status = "OK";
            res.status(201).json(response);
        } catch (error) {
            response.status = false;
            response.message = error.message;
            res.status(400).json(response);
        }
    }

    static async updateProduct(req, res){
        try {
            await Product.update(req.body, {
                where: {
                    id: req.params.id
                }
            });
            response.data = req.body;
            response.status = "OK";
            response.message = "Updated data success";
            res.status(200).json(response);
        } catch (error) {
            response.data = undefined
            response.status = "ERROR";
            response.message = error.message;
            res.status(400).json(response);
            console.log(error);
        }
    }

    static async deleteProduct(req, res) {
        try {
            const productsRes = await Product.findByPk(req.body.id);
            if (!productsRes)
                throw Error('id not found')
            await Product.destroy({ where: { id: req.body.id } });
            response.data = req.body.id;
            response.message = `success deleted product data id : ${id}`;
            response.data = [];
            res.status(200).json(response);
        } catch (error) {
            response.status = false;
            response.message = error.message;
            response.data = [];
            res.status(400).json(response);
        }
    }
}

module.exports = ProductController;