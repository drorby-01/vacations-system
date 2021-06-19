const router = require("express").Router();
const userLog = require("../log/users-log");
const {
  extractUserDataFromCache,
  deleteFromCache,
} = require("../log/cache-module");

router.get("/", async (req, res, next) => {
  try {
    const result = await userLog.getAllUsers();
    res.json(result);
  } catch (e) {
    next(e);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await userLog.getUserById(id);
    res.json(result);
  } catch (e) {
    next(e);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    console.log(req.headers["authorization"])
    if(typeof req.headers["authorization"] !== "undefined"){
      deleteFromCache(req)
    }    
    const user = req.body;
    const result = await userLog.login(user);
    res.json(result);
  } catch (e) {
    next(e);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const user = req.body;
    console.log(user);
    const result = await userLog.register(user);
    res.json(result);
  } catch (e) {
    console.log(e.message);
    next(e);
  }
});

router.put("/", async (req, res, next) => {
  const userData = extractUserDataFromCache(req);
  try {
    const user = req.body;
    user.id = userData.id;
    const result = await userLog.updateUser(user);
    console.log(result);
    res.json(result);
  } catch (e) {
    next(e);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await userLog.deleteUser(id);
    res.json(result);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
