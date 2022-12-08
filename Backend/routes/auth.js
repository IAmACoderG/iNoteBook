const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');


const jwt_secret = 'GauravIsAGoodB$oy'

//Route 1:Create A User using POST "/api/auth/createUser". No login Required
// router.get('/',async(req, res) => {
router.post('/createUser', [
   body('name', 'Enter The Valid Name').isLength({ min: 3 }),
   body('email', 'Enter The Valid Email').isEmail(),
   body('password', 'Password must be Atleast minimum length of 5').isLength({ min: 5 })
], async (req, res) => {
   let success = false;

   //if there are error ,return bad request and errors

   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
   }

   //check weather user with the Email exist already
   try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
         return res.status(400).json({ success, Error: "Sorry This user with this Email Already Exist" })
      };

      //Converted the password in hash
      const salt = await bcrypt.genSalt(10);
      const squrPass = await bcrypt.hash(req.body.password, salt);

      //create user
      user = await User.create({
         name: req.body.name,
         email: req.body.email,
         password: squrPass,
         // }).then(user => res.json(user));
      });

      // Generate the token 
      const data = {
         user: {
            id: user.id
         }
      }
      const authToken = jwt.sign(data, jwt_secret);
      success = true
      res.json({ success, authToken });



   } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
   }


});

//Route 2:Authenticate user using POST "/api/auth/login". No login Required
router.post('/login', [
   body('email', 'Enter The Valid Email').isEmail(),
   body('password', 'Password can not be Blank').exists()
], async (req, res) => {
   let success = false;
   //if there are error ,return bad request and errors

   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
   }


   const { email, password } = req.body;
   try {
      let user = await User.findOne({ email });
      if (!user) {

         return res.status(400).json({ success, Error: "Please try to login with the correct credentials" });
      };

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
         success = false
         return res.status(400).json({ success, Error: "Please try to login with the correct credentials" });
      }
      // Generate the token 
      const data = {
         user: {
            id: user.id
         }
      }
      const authToken = jwt.sign(data, jwt_secret);
      success = true;
      res.json({ success, authToken });



   } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
   }


});





//Route 3:Get LoggedIn User Details user using POST "/api/auth/getuser". login Required
router.post('/getuser', fetchuser, async (req, res) => {
   //if there are error ,return bad request and errors

   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
   }


   try {
      userId = req.user.id;
      let user = await User.findById(userId).select("-password")
      res.send(user);
      if (!user) {
         return res.status(400).json({ Error: "Please try to login with the correct credentials" });

      };



   } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
   }


});

module.exports = router

