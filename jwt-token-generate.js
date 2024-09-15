import jwt from "jsonwebtoken";

const obj = {
  name: "Hemanth",
  age: 40,
  role: "developer",
};

console.log(
  jwt.sign(obj, "fsd58we-t-secret", {
    //expiresIn: "1d", // 5 mins
    expiresIn: "5s", // 5 seconds
    //expiresIn: "5d", // 5 days
    //expiresIn: "5h", // 5 hours
  })
);
