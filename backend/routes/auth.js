const express = require("express");
const router = express.Router();
const joi = require("joi");

//models
const User = require("../models/User");

//validations
const userValidator = joi.object({
  username: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().min(8).required(),
});

router.post("/register", async (req, res) => {
  try {
    await userValidator.validateAsync(req.body)

    const checkExist = await User.find({email: req.body.email})

    if(checkExist) {
        return res.status(200).send({status: "400", message: "User email already exists"})
    } else {
        const user = new User(req.body)
        user.save()
    
        return res.status(200).send({status: "200", message: "User registered successfully!"})
    }

    
  } catch (error) {
    res.status(200).send({status: "400", message: error.details[0].message})
  }
});

module.exports = router;
