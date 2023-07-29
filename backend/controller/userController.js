const User = require('../modals/userModal')
const { Joi } = require('express-validation');
const bcrypt = require('bcrypt');

const addUser = async (req, res) => {
    try {
        const validationSchema = Joi.object().keys({
            username: Joi
                .string()
                .required()
                .min(3)
                .max(20),
            full_name: Joi
                .string()
                .required()
                .min(3)
                .max(20),
            email: Joi
                .string()
                .required()
                .email()
                .regex(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/),
            password: Joi.string()
                .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)
                .required()
                .messages({
                    "string.pattern.base":
                        "Password must contain 8 characters,one uppercase,one lowercase,one number and one special character",
                }),
            address: Joi.required(),
        })
        const validate = validationSchema.validate(req.body);
        if (validate.error) {
            return res.status(412).json({
                status: 412,
                message: validate.error.details[0].message
            })
        }
        const user = await User.findOne({ where: { email: req.body.email } });
        if (user) {
            return res.status(412).json({
                status: 412,
                message: 'Email Id Allready In Use..'
            });
        }
        // bcrypt.hash(req.body.password, 10, async (error, hash) => {
        //     if (error) {
        //         return res.status(412).json({
        //             status: 412,
        //             message: "Error while hashing password"
        //         })
        //     }
            // req.body.password = hash;
            const Admin = await User.create({
                email: req.body.email,
                username: req.body.username,
                full_name: req.body.full_name,
                address: req.body.address,
                password: req.body.password,
            });

            return res.status(200).json({
                status: 200,
                message: "User registered successfully",
                user: Admin,
            });
        // });
    } catch (error) {
        return res.status(412).json({
            status: 412,
            message: error.message,
        });
    }
}
const getAlluser =async(req,res)=>{
    try {
        const user =await User.findAll({})
        if(user){
            res.json({
                user
            })
        }
    } catch (error) {
        console.log(error)
    }
}

const userLogin = async (req, res, next) => {
    try {
      const validateSchema = Joi.object().keys({
        email: Joi.string().required().email(),
        password: Joi.string().required(),
      });
      const validate = validateSchema.validate(req.body);
      if (validate.error) {
        return res.status(412).json({
          status: 412,
          message: validate.error.details[0].message,
        });
      }
      // const temp_secret = speakeasy.generateSecret()
      const user = await User.findOne({ where: { email: req.body.email ,password:req.body.password} });
  
      if (user) {
        return res.status(200).json({
          status: 200,
          message: "Login Successful",
          data: {
            user,
            // otp_enabled: user.otp_enabled,
            // secret: temp_secret.base32
          }
        })
      }
      next()
    } catch (error) {
      return res.status(412).json({
        status: 412,
        message: "not Login..",
      });
    }
  }

module.exports = {
    addUser,
    getAlluser,
    userLogin
}