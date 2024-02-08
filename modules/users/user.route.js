const router = require("express").Router();
const userController = require("./user.controller");

router.get("/", async (req, res, next) => {
  try {
    const result = await userController.getAll();
    res.json({ data: result });
  } catch (e) {
    next(e);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const result = await userController.create(req.body);
    res.json({ data: result });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
