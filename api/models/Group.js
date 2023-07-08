const mongoose = require("mongoose");

const GroupSchema = new mongoose.Schema(
  {
    admin: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    members: {
      type: Array,
    },
    description: {
      type: String,
      max: 500,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Group", GroupSchema);
