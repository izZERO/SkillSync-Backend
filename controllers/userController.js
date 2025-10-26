const User = require("../models/User")

exports.user_profile_get = async (req, res) => {
  try {
    const user = await User.findById(res.locals.payload.id)

    if (!user) {
      return res.status(404).send({ status: "Error", msg: "User not found" })
    }

    res.status(200).send(user)
  } catch (error) {
    res
      .status(500)
      .send({ status: "Error", msg: "An error occurred fetching profile" })
  }
}

exports.user_updateProfile_put = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(res.locals.payload.id, req.body, {
      new: true,
    })

    res.status(200).send(user)
  } catch (error) {
    res
      .status(500)
      .send({ status: "Error", msg: "An error occurred updating profile" })
  }
}

exports.user_deleteProfile_delete = async (req, res) => {
  try {
    await User.findByIdAndDelete(res.locals.payload.id)
    res.status(200).send("Profile Deleted")
  } catch (error) {
    res
      .status(500)
      .send({ status: "Error", msg: "An error occurred Deleting Profile" })
  }
}
