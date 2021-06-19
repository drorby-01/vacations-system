const router = require("express").Router();
const vacationLog = require("../log/vication-log");
const chaceModule = require("../log/cache-module");

router.get("/", async (req, res, next) => {
  try {
    const userdata = chaceModule.extractUserDataFromCache(req);
    const result = await vacationLog.getAllVacation(userdata.id);
    res.json(result);
  } catch (e) {
    next(e);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const vacationId = req.params.id;
    const result = await vacationLog.getVacation(vacationId);
    res.json(result);
  } catch (e) {
    next(e);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const vacation = req.body;
    console.log(vacation);
    const userDate = chaceModule.extractUserDataFromCache(req);
    const userIsAdmin = userDate["is_admin"];
    const result = await vacationLog.addVacation(vacation, userIsAdmin);
    res.json(result);
  } catch (e) {
    next(e);
  }
});

router.put("/", async (req, res, next) => {
  try {
    const userData = chaceModule.extractUserDataFromCache(req);
    const vacationEdit = req.body;
    const userIsAdmin = userData["is_admin"];
    const result = await vacationLog.editVacation(vacationEdit, userIsAdmin);
    res.json(result);
  } catch (e) {
    next(e);
  }
});

//need to do insert to the follow table
router.put("/follow/:id", async (req, res, next) => {
  try {
    const vacationId = req.params.id;
    const userdata = chaceModule.extractUserDataFromCache(req);
    console.log(userdata);
    const userIsAdmin = userdata["is_admin"];
    const result = await vacationLog.addFollow(
      vacationId,
      userdata.id,
      userIsAdmin
    );
    res.json(result);
  } catch (e) {
    next(e);
  }
});

router.delete("/follow/:id", async (req, res, next) => {
  try {
    const vacationId = req.params.id;
    const userdata = chaceModule.extractUserDataFromCache(req);
    const userIsAdmin = userdata["is_admin"];
    const result = await vacationLog.removeFollow(
      vacationId,
      userdata.id,
      userIsAdmin
    );
    res.json(result);
  } catch (e) {
    next(e);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const userdata = chaceModule.extractUserDataFromCache(req);
    const userIsAdmin = userdata["is_admin"];
    const result = await vacationLog.deleteVacation(id, userIsAdmin);
    res.json(result);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
