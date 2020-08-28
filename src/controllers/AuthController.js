
const passport = require("passport");
const jsonwebtoken = require("jsonwebtoken")
const ExtractJwt = require('passport-jwt').ExtractJwt;
const models = require("../db/models");
const {User} = require("../db/models")
const express = require("express");
const app = express();
require('dotenv').config();
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));

app.use(passport.initialize());
app.use(passport.session());

let opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;


const response = {
  status: true,
  message: "Data OK",
  data: [],
};

class AuthController {

static async login(req, res) {

const { body } = req;

try {

    const user = await User.findOne({
        where: {
          username: body.username,
          password: body.password
        }
      })
    
      const token = jsonwebtoken.sign(user.username, opts.secretOrKey);
    
      res.json({
        status: "Success",
        token
      })
      
    
} catch (error) {
res.status(400).json("Error")
}


    }

static async register(req, res){
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
      response.message = "sukses simpan data";
      response.data = save;
      res.status(201).json(response);
    } catch (error) {
      response.status = false;
      response.message = error.message;
      res.status(400).json(response);
    }

}


}

module.exports = AuthController;