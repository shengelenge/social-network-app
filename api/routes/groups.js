const router = require("express").Router();
const Group = require("../models/Group");
const User = require("../models/User");

// New group
router.post("/", async (req, res) => {
  const newGroup = new Group({
    admin: req.body.userId,
    name: req.body.name,
    members: [req.body.userId],
  });
  try {
    const savedGroup = await newGroup.save();
    res.status(200).json(savedGroup);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Delete a group
router.delete("/:id", async (req, res) => {
  try {
    const group = Group.findById(req.params.id);
    console.log(group.admin);
    if (group.admin === req.body.userId) {
      await group.deleteOne();
      res.status(200).json("Group has been deleted.");
    } else {
      res.status(403).json("Only admin can delete this group.");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// Join / leave group
router.put("/:id/join", async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);
    if (!group.members.includes(req.body.userId)) {
      await group.updateOne({ $push: { members: req.body.userId } });
      res.status(200).json("Group has been joined.");
    } else {
      await group.updateOne({ $pull: { members: req.body.userId } });
      res.status(200).json("Group has been left.");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get all groups
router.get("/all", async (req, res) => {
  try {
    const groups = await Group.find();
    res.status(200).json(groups);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
