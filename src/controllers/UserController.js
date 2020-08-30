const {User} = require("../db/models");
require('dotenv').config();

const response = {
    status: true,
    message: "Data OK",
    data: [],
  };

  class UserController {

    static async saveUser(req, res) {
        const { body } = req;
    
        try {
          const save = await User.create({
          full_name:body.full_name,
          username:body.username,
          email:body.email,
          phone_number:body.phone_number,
          salt:body.salt,
          password:body.password,
          role:body.role
          });
          response.message = "success save user data";
          response.data = save;
          res.status(201).json(response);
        } catch (error) {
          response.status = false;
          response.message = error.message;
          res.status(400).json(response);
        }
      }
    
    
      static async updateUser(req, res) {
        const { id } = req.params;
        const { body } = req;
        try {
          const a = await User.findByPk(id)
          if(a == undefined) throw new Error("id not found")
             await User.update({
             full_name:body.full_name,
             username:body.username,
             email:body.email,
             phone_number:body.phone_number,
             salt:body.salt,
             password:body.password,
             role:body.role
          },{where:{id:id}});
          response.status ="success"
          response.message = `success update user data : ${id}`;
          response.data =  await User.findByPk(id);
          res.status(201).json(response);
        } catch (error) {
          response.status = false;
          response.message = error.message;
          response.data = [];
          res.status(400).json(response);
        }
      }
    
      static async getUserId(req, res) {
        const { id } = req.params;
        
        try {
          const userdetail = await User.findByPk(id);
          if (!userdetail) throw new Error("User not found")
          response.data = userdetail;
          response.status = "success";
          response.message = `success get user data id : ${id}`;
          res.json(response);
        } catch (error) {
          response.message = error.message;
          response.data = [];
          response.status = "fail";
          res.status(404).json(response);
        }
      }
    
      static async getUserAll(req, res) {
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);
        const offset = page ? page*limit : 0;
        
        try {
          const userdetail = await User.findAll({
            limit: limit,
            offset: offset
          });
          if (!userdetail) throw new Error("User not found")
          response.data = userdetail;
          response.status ="success";
          response.message = "success get user data";
          res.json(response);
        } catch (error) {
          response.message = error.message;
          response.data = [];
          response.status = "fail";
          res.status(404).json(response);
        }
      }
    
      static async deleteUser(req, res) {
        const { id } = req.params;
        try {
          const a = await User.findByPk(id)
          if(a == undefined) throw new Error("id not found")
          await User.destroy({where:{id:id}})
          response.status ="success";
          response.message = `success deleted user data id : ${id}`;
          response.data = [];
          res.status(201).json(response);
        } catch (error) {
          response.status = false;
          response.message = error.message;
          response.data = [];
          res.status(400).json(response);
        }
      }
  
  
  }
  
  
  
  
  module.exports = UserController;
  