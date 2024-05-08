const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");


// query diye jodi kono fake user kono data search kore, tobe tar theke protect korbe
const protect = asyncHandler(async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            // token look like this Bearer a54fv4aag5ghs4, just take a token by split
            token = req.headers.authorization.split(" ")[1];

            // decodes token id
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // age j req er majhe user object ase tar majhe db er jei user ase take id anujayi khuje token er sathe milabe & return without password
            req.user = await User.findById(decoded.id).select("-password");

            next();
        } catch (error) {
            res.status(401).send({ message: "Not authorization, token failed" });
            throw new Error("Not authorization, token failed");
        }
    }

    if (!token) {
        res.status(401).send({ message: "Not authorization, no token" });
        throw new Error("Not authorization, no token");
    }
});

module.exports = { protect };