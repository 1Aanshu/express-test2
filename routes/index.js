const router = require("express").Router();
const blogRouter = require("../modules/blogs/blog.route");

const apiVersion = "/api/v1";
router.get("/", (req, res) => {
  res.json({ msg: "hello from router index" });
});

router.use(`${apiVersion}/blogs`, blogRouter);
module.exports = router;


