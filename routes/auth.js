const router = require("express").Router();
const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { DataValidation } = require("../dataValidation");

router.post("/register", async (req, res) => {
    const { error } = DataValidation.registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const encryptedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: encryptedPassword,
    });

    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) return res.status(400).send("Email already registered!");

    try {
        const savedUser = await user.save();
        res.send(savedUser);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.post("/login", async (req, res) => {
    const { error } = DataValidation.loginValidation(req.body);
    if (error) res.status(400).send(error.details[0].message);

    const userInDB = await User.findOne({ email: req.body.email });
    if (!userInDB) return res.status(400).send("Email not registered");
    const matchPassword = await bcrypt.compare(
        req.body.password,
        userInDB.password
    );
    if (matchPassword) {
        const token = jwt.sign({ id: userInDB._id }, process.env.TOKEN_SECRET);
        res.header("auth-token", token).status(200).send(token);
    } else {
        res.status(401).send("Email or password doesn't match!");
    }
});

module.exports = router;
