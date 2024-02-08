const router = require("express").Router();
const BlogController = require("./blog.controller");
const { validate } = require("./blog.validator");

router.get("/", async (req, res, next) => {
  try {
    const result = await BlogController.getAll();
    res.json({ data: result });
  } catch (e) {
    next(e);
  }
});

router.get("/:id", validate, async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await BlogController.getById(id);
    res.json({ data: result });
  } catch (e) {
    next(e);
  }
});
router.post("/", validate, async (req, res, next) => {
  try {
    const data = req.body;
    const result = await BlogController.create(data);
    // Database call
    res.json({ data: result });
  } catch (e) {
    next(e);
  }
});
router.put("/:id", validate, async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await BlogController.updateById(id, data);
    // Database call
    res.json({ data: result });
  } catch (e) {
    next(e);
  }
});

router.patch("/:id", validate, async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await BlogController.updateById(id, data);
    // Database call
    res.json({ data: result });
  } catch (e) {
    next(e);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await BlogController.deleteById(id);
    // Database call
    res.json({ data: result });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
