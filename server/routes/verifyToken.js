var express = require("express");
var router = express.Router();
const authorise = require("../utils/auth");

/* GET all to do list entries */
router.post("/", async function (req, res, next) {

  // Authenticate user
  const userId = await authorise(req);
  if (userId === "") {
    return res.status(401).json({ validity: false });
  }

  // If user passes validation
  return res.status(200).json({ validity: true });
});

module.exports = router;
