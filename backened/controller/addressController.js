import Address from "../model/address.js";
import User from "../model/User.js";

// Add address: POST /api/address/add
export const addAddress = async (req, res) => {
  try {
    const { address, userId } = req.body;

    // Check if required fields are provided
    const requiredFields = [
      "firstName", "lastName", "email", "street",
      "city", "state", "zipcode", "country", "phone"
    ];

    const missingFields = requiredFields.filter(field => !address?.[field]);
    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing fields: ${missingFields.join(", ")}`
      });
    }

    // Validate user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found.",
      });
    }
    const newAddress = await Address.create({ ...address, userId });
    res.status(200).json({
      success: true,
      message: "Address added successfully",
      address: newAddress,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Address not added: " + error.message,
    });
  }
};

// Get address: GET /api/address/get/:userId
export const getAddress = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found.",
      });
    }

    const addresses = await Address.find({ userId });

    res.status(200).json({
      success: true,
      addresses,
      message: addresses.length
        ? "Addresses retrieved successfully"
        : "No addresses found for this user",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching addresses: " + error.message,
    });
  }
};
