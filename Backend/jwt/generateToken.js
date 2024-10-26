import jwt from "jsonwebtoken";

const createTokenAndSaveCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_TOKEN, {
    expiresIn: "10d",
  });
  res.cookie("jwt", token, {
    httpOnly: true, // xss attack safe
    secure: true,
    sameSite: "strict", // csrf attack safe
  });
};
export default createTokenAndSaveCookie;
