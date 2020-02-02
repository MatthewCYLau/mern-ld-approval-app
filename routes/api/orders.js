const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Order = require("../../models/Order");

// @route    POST api/orders
// @desc     Create a order
// @access   Private
router.post("/", auth, async (req, res) => {
  try {
    // Check if the course has already been applied
    const orders = await Order.find({
      user: req.user.id
    });
    if (
      orders.filter(order => order.course.toString() === req.body.course)
        .length > 0
    ) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Course already applied" }] });
    }

    const newOrder = new Order({
      user: req.user.id,
      course: req.body.course,
      approved: req.body.approved
    });
    const order = await newOrder.save();
    res.json(order);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    GET api/orders
// @desc     Get all orders
// @access   Private
router.get("/", auth, async (req, res) => {
  try {
    const orders = await Order.find()
      .sort({ date: -1 })
      .populate({ path: "course", model: "course" })
      .populate({ path: "user", model: "user" });
    res.json(orders);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    GET api/orders
// @desc     Get my orders
// @access   Private
router.get("/me", auth, async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user.id
    }).populate({ path: "course", model: "course" });
    res.json(orders);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    GET api/orders/:id
// @desc     Get order by ID
// @access   Private
router.get("/:id", auth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate({
      path: "course",
      model: "course"
    });

    // Check for ObjectId format and order
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/) || !order) {
      return res.status(404).json({ msg: "Order not found" });
    }

    res.json(order);
  } catch (err) {
    console.error(err.message);

    res.status(500).send("Server Error");
  }
});

// @route    EDIT api/orders/:id
// @desc     Edit a order
// @access   Private
router.patch("/:id", auth, async (req, res) => {
  const { approved } = req.body;

  // Build order object
  const orderFields = {};

  if (approved != undefined || approved != null)
    orderFields.approved = approved;

  try {
    let order = await Order.findOneAndUpdate(
      { _id: req.params.id },
      orderFields,
      { new: true, upsert: true }
    );
    // Check for ObjectId format and order
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/) || !order) {
      return res.status(404).json({ msg: "Order not found" });
    }

    return res.status(200).json(order);
  } catch (err) {
    console.error(err.message);

    res.status(500).send("Server Error");
  }
});

// @route    DELETE api/orders/:id
// @desc     Delete a order
// @access   Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    // Check for ObjectId format and order
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/) || !order) {
      return res.status(404).json({ msg: "Order not found" });
    }

    // Check user
    if (order.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    await order.remove();

    res.json({ msg: "Order removed" });
  } catch (err) {
    console.error(err.message);

    res.status(500).send("Server Error");
  }
});

module.exports = router;
