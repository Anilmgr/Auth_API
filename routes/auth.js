const router = require("express").Router();

router.post("/register", (req, res) => {
  res.json({ route: "Register", message: "Success" });
});

router.post("/signin", (req, res) => {
  res.json({ route: "Signin", message: "Success" });
});

module.exports = router;
