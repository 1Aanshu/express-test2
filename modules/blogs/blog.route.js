const router = require("express").Router();

router.get("/", (req, res, next) => {
  try {
    // Database call
    res.json({ msg: "Hello from get route" });
  } catch (e) {
    next(e);
  }
});

router.get("/:id", (req, res, next) => {
  try {
    const { id } = req.params;
    // Database call
    res.json({ msg: `Hello from get route ${id}` });
  } catch (e) {
    next(e);
  }
});
router.post("/", (req, res, next) => {
  try {
    const data = req.body;
    console.log({ data });
    // Database call
    res.json({ msg: "Hello from post route" });
  } catch (e) {
    next(e);
  }
});
router.put("/:id", (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;
    console.log({ id, data });
    // Database call
    res.json({ msg: "Hello from put route" });
  } catch (e) {
    next(e);
  }
});

router.patch("/:id", (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;
    console.log({ id, data });
    // Database call
    res.json({ msg: "Hello from patch route" });
  } catch (e) {
    next(e);
  }
});

router.delete("/:id", (req, res, next) => {
  try {
    const { id } = req.params;
    console.log({ id });
    // Database call
    res.json({ msg: "Hello from delete route" });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
