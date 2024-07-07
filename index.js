import express from "express";
import cors from "cors";
const app = express();
app.use(cors());
const taxRate = 5;
const discountPercentage = 10;
const loyaltyRate = 2;
const port = 3000;
app.listen(port, () => {
  console.log("Server is running on port" + port);
});

