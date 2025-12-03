const express = require("express");
const router = express.Router();
const LoansController = require("../Controllers/LoansController");

router.get("/get", LoansController.get);
router.post("/add", LoansController.add);
router.put("/update/:id", LoansController.update);
router.put("/return/:id", LoansController.marcarDevuelto);
router.delete("/delete/:id", LoansController.delete);

module.exports = router;
