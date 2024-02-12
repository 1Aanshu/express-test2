const router = require("express").Router();
const userController = require("./user.controller");

const { checkRole } = require("../../utils/sessionManager");

router.get("/", checkRole(["admin"]), async (req, res, next) => {
  try {
    const result = await userController.getAll();
    res.json({ data: result });
  } catch (e) {
    next(e);
  }
});

router.post("/", checkRole(["admin"]), async (req, res, next) => {
  try {
    const result = await userController.create(req.body);
    res.json({ data: result });
  } catch (e) {
    next(e);
  }
});

router.post("/register", async (req, res, next) => {
  try {
    const result = await userController.register(req.body);
    res.json({ data: result });
  } catch (e) {
    next(e);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const result = await userController.login(req.body);
    res.json({ data: result });
  } catch (e) {
    next(e);
  }
});

router.post("/generate-fp-token", async (req, res, next) => {
  try {
    const result = await userController.generateFPToken(req.body);
    res.json({ data: result });
  } catch (e) {
    next(e);
  }
});

router.post("/verify-fp-token", async (req, res, next) => {
  try {
    const result = await userController.verifyFPToken(req.body);
    res.json({ data: result });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
