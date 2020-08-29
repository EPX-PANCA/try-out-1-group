const {User, Product} = require("../db/models");
require('dotenv').config();





//nodemailer
const nodemailer = require("nodemailer");

//node-cron
const cron = require("node-cron");


/////PDF MODULES
const fs = require('fs');
const pdf = require("pdf-creator-node");
const html = fs.readFileSync('./src/helpers/template.html', 'utf8');



let sendEmail = "";
const response = {
    status: true,
    message: "Data OK",
  };

let products=[];

//mailer
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.PASSWORD_EMAIL,
    },
})

  class ReportController {

      static async getUserId(req, res) {
        const { id } = req.params;
        const userdetail = await User.findByPk(id);
        const productdetail = await Product.findAll({});
        try {
          if (!userdetail) throw new Error("User not found")
          response.status = "success";
          products = productdetail;
          sendEmail = userdetail.email;
          response.message = `success send report to user id : ${id}`;
          res.json(response);
        } catch (error) {
          response.message = error.message;
          response.data = [];
          response.status = "fail";
          res.status(404).json(response);
        }

        const options = {
            format: "A3",
            orientation: "portrait",
            border: "10mm"
        }

        const document = {
            html: html,
            data: {
                list: products[0]
            },
            path: "./src/helpers/report.pdf"
        };

        //pdf
            pdf.create(document, options)
            .then(res => {
                console.log(res)
            })
            .catch(error => {
                console.error(error)
            });

        cron.schedule("1 * * * * *", function(){
            console.log("---------------------");
            console.log("Running Cron Job");
            const mailOptions = {
              from: process.env.USER_EMAIL,
              to: sendEmail,
              subject: "Report Product",
              html : "<h1>Report Product</h1>",
              attachments: [
                { // Use a URL as an attachment
                      filename: 'report.pdf',
                      path: './src/helpers/report.pdf',
                      contentType: 'application/pdf'
                  }
                ]
            };
            transporter.sendMail(mailOptions, function(error, info) {
              if (error) {
                throw error;
              } else {
                console.log("Email successfully sent!");
              }
            });
          });



      }

      
  
  }
  
  
  
  
  module.exports = ReportController;
  