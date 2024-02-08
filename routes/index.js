const router = require("express").Router();
const blogRouter = require("../modules/blogs/blog.route");
const userRouter = require("../modules/users/user.route");

const apiVersion = "/api/v1";
router.get("/", (req, res) => {
  res.json({ msg: "hello from router index" });
});

router.use(`${apiVersion}/blogs`, blogRouter);
router.use(`${apiVersion}/users`, userRouter);

module.exports = router;
