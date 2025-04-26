// updateCart.js
import User from "../model/User.js";

export const updateCart = async (req, res) => {
  try {
    const { id, cart } = req.body;
    if (!id || typeof cart !== "object") {
      return res.status(400).json({
        success: false,
        message: "Invalid request: user ID and cart (object) are required",
      });
    }
    // Update user's cart in DB
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {cart},
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Cart updated successfully",
      cart: updatedUser.cart,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error: " + error.message,
    });
  }
};
