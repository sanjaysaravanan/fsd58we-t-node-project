import jwt from "jsonwebtoken";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSGVtYW50aCIsImFnZSI6NDAsInJvbGUiOiJkZXZlbG9wZXIiLCJpYXQiOjE3MjY0MDA4MTksImV4cCI6MTcyNjQwMDgyNH0.c1amHeouVcK0rkZMP9vI5JLCPezIfaVbicQg17iIlz0";

jwt.verify(token, "fsd58we-t-secret", (err, decodedPayload) => {
  if (err) {
    console.log(err);
  } else {
    console.log(decodedPayload);
  }
});
