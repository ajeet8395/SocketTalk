import jwt from "jsonwebtoken";

// const createTokenAndSaveCookie = (userId, res) => {
//   const token = jwt.sign({ userId }, process.env.JWT_TOKEN, {
//     expiresIn: "10d",
//   });
//   res.cookie("jwt", token, {
//     httpOnly: true, // xss attack safe
//     secure: true,
//     sameSite: "strict", // csrf attack safe
//   });
// };

const createTokenAndSaveCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_TOKEN, {
    expiresIn: "10d",
  });

  const decoded = jwt.verify(token, process.env.JWT_TOKEN);
  // console.log("token content:", {
  //   token: token,
  //   decoded: decoded,
  //   expires: new Date(decoded.exp * 1000).toLocaleString(),
  // });

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 10 * 24 * 60 * 60 * 1000,
    path: "/",
  });

  return token;
};
export default createTokenAndSaveCookie;
