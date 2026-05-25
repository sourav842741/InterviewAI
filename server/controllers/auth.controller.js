import genToken from "../config/token.js";
import User from "../models/user.model.js";

// Google Login
export const googleAuth = async (req, res) => {
  try {

    const { name, email } = req.body;

    if (!email) {
      return res.status(400).json({
        message: "Email required"
      });
    }

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name,
        email,
        credits: 100
      });
    }

    const token = await genToken(user._id);

    // ✅ Deploy Safe Cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return res.status(200).json(user);

  } catch (error) {
    return res.status(500).json({
      message: `Google auth error ${error}`
    });
  }
};


// Logout
export const logOut = async (req, res) => {
  try {

    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "none"
    });

    return res.status(200).json({
      message: "Logout Successfully"
    });

  } catch (error) {

    return res.status(500).json({
      message: `Logout error ${error}`
    });

  }
};
