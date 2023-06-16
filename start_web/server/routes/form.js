const express = require("express");

const {
  getForms,
  getForm,
  createForm,
  updateForm,
  deleteForm,
} = require("../controllers/form");

const router = express.Router();

const { protect } = require("../middleware/auth");

router.route("/").get(getForms).post(protect, createForm);

router
  .route("/:id")
  .get(getForm)
  .put(protect, updateForm)
  .delete(protect, deleteForm);

module.exports = router;
