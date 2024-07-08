let express = require("express");
let cors = require("cors");
const app = express();
/*
self study : 

const vs let: In the case of  backend server configuration, none of the variables (app, taxRate, discountPercentage, loyaltyRate, port) are intended to be reassigned after their initial definition. Therefore, const is more appropriate than let. It prevents accidental or unintended modifications to these values, which could lead to bugs or unstable behavior in your application. */
app.use(cors());
const taxRate = 5; // %
const discountPercentage = 10; // %
const loyaltyRate = 2; // 2 points per $1
const port = 3000;
app.listen(port, () => {
  console.log("Server is running on port" + port);
});

/*Endpoint 1: Calculate the total price of items in the cart

Create an endpoint that takes a newItemPrice and cartTotal as a query parameter and returns total cart value.

Write an Express code snippet.

Declare an endpoint cart-total using the get keyword.

Declare two variables newItemPrice and cartTotalto take the input.

Parse the input as a float to calculate the total cart price.

Return the result as a string.

API Call: <http://localhost:3000/cart-total?newItemPrice=1200&cartTotal=0>

Expected Output: 1200

 */
function totalCartPrice(newItemPrice, cartTotal) {
  let totalPrice = newItemPrice + cartTotal;
  console.log("total cart price = " + totalPrice);
  return totalPrice;
}
app.get("/cart-total", (req, res) => {
  // for debugging
  console.log(" step 1 : Add products to the cart (check billing total ) ");

  console.log(
    " API cart-total called Endpoint 1: Calculate the total price of items in the cart",
  );

  let newItemPrice = parseFloat(req.query.newItemPrice);
  let cartTotal = parseFloat(req.query.cartTotal);
  console.log("cartTotal = " + cartTotal + " newItemPrice = " + newItemPrice);
  res.send(totalCartPrice(newItemPrice, cartTotal).toString());

  // for debugging
  setTimeout(() => {
    console.clear();
    console.log("Console has been cleared.");
  }, 30000);
});

/*Endpoint 2 : Apply a discount based on membership status

Create an endpoint that takes a cartTotal and isMember as a query parameter and returns final price after applying the discount.

Write an Express code snippet.

Declare an endpoint /membership-discount using the get keyword.

Declare two variables cartTotal and isMember to take the input.

Parse the cartTotal as a float to calculate the total cart value.

Return the result as a string.

If the Membership status = true, then the discount percentage is applied

If the Membership status = false, no discount is applied

API Call: <http://localhost:3000/membership-discount?cartTotal=3600&isMember=true>

Expected Output: 3240
const discountPercentage = 10;


 */
function membershipDiscount(cartTotal, isMember) {
  let discountPrice = 0;
  let finalPrice = 0;
  if (isMember === "true") {
    discountPrice = cartTotal * (discountPercentage / 100);
    finalPrice = cartTotal - discountPrice;
    console.log(
      "it is prime member, so discount of 10 % applied = " + finalPrice,
    );
    return finalPrice;
  } else {
    console.log(
      " it is not a prime member, so no discount applied = " + cartTotal,
    );
    return cartTotal;
  }
}
app.get("/membership-discount", (req, res) => {
  // for debugging

  console.log(
    " step 2 : check membership status as standard or prime then apply discount accordingly ",
  );

  console.log(
    " API membership-discount called Endpoint 2 : Apply a discount based on membership status",
  );
  let cartTotal = parseFloat(req.query.cartTotal);
  let isMember = req.query.isMember;
  console.log("cartTotal = " + cartTotal + " isMember = " + isMember);
  res.send(membershipDiscount(cartTotal, isMember).toString());

  // for debugging
  setTimeout(() => {
    console.clear();
    console.log("Console has been cleared.");
  }, 30000);
});
/*Endpoint 3 : Calculate tax on the cart total

Create an endpoint that takes a cartTotal as a query parameter and returns the tax applied on the Cart Total.

Write an Express code snippet.

Declare an endpoint /calculate-tax using the get keyword.

Declare a variable cartTotal as input.

Parse the cartTotal input as float to calculate the cart amount after applying the tax rate.

Return the result as a string.

API Call: <http://localhost:3000/calculate-tax?cartTotal=3600>

Expected Output: 180
const taxRate = 5; // %
*/
function calculateTax(cartTotal) {
  let taxAmount = cartTotal * (taxRate / 100);
  console.log("tax amount = " + taxAmount);
  return taxAmount;
}
app.get("/calculate-tax", (req, res) => {
  // for debugging
  console.log(
    " API calculate-tax called Endpoint 3 : Calculate tax on the cart total",
  );
  let cartTotal = parseFloat(req.query.cartTotal);
  console.log("cartTotal = " + cartTotal);
  res.send(calculateTax(cartTotal).toString());

  // for debugging
  setTimeout(() => {
    console.clear();
    console.log("Console has been cleared.");
  }, 30000);
});

/*
Endpoint 4 : Estimate delivery time based on shipping method

Create an endpoint that takes a shippingMethod and distance as a query parameter and returns the number of days for delivering the package.

Write an Express code snippet.

Declare an endpoint /estimate-delivery using the get keyword.

Declare 2 variables shippingMethod and distance as inputs.

Parse the distance input as float to calculate the delivery time based on the distance.

Return the result as a string.

If the shippingMethod = Standard, the delivery days will be 1 day per 50 kms.

If the shippingMethod = Express, the delivery days will be 1 day per 100 kms.

API Call: <http://localhost:3000/estimate-delivery?shippingMethod=express&distance=600>

Expected Output: 6
*/
function estimateDelivery(shippingMethod, distance) {
  let deliveryTime_days = 0;
  if (shippingMethod === "Standard") {
    deliveryTime_days = distance / 50; //1 day per 50 kms.
    console.log(
      "shippingMethod = " +
        shippingMethod +
        " delivery time = " +
        deliveryTime_days +
        " days",
    );
    return deliveryTime_days;
  } else {
    deliveryTime_days = distance / 100; //1 day per 100 kms.
    console.log(
      "shippingMethod = " +
        shippingMethod +
        " delivery time = " +
        deliveryTime_days +
        " days",
    );
    return deliveryTime_days;
  }
}
app.get("/estimate-delivery", (req, res) => {
  // for debugging
  console.log(
    " API estimate-delivery called Endpoint 4 : Estimate delivery time based on shipping method",
  );
  let shippingMethod = req.query.shippingMethod;
  let distance = parseFloat(req.query.distance);
  console.log("shippingMethod = " + shippingMethod + " distance = " + distance);
  res.send(estimateDelivery(shippingMethod, distance).toString());

  // for debugging
  setTimeout(() => {
    console.clear();
    console.log("Console has been cleared.");
  }, 30000);
});

/*Endpoint 5 : Calculate the shipping cost based on weight and distance

Create an endpoint that takes weight and distance as query parameters and returns the shipping cost of the packages.

Write an Express code snippet.

Declare an endpoint /shipping-cost using the get keyword.

Declare 2 variables weight and distance as inputs.

Parse the weight and distance input as float to calculate the price based on the distance.

Return the result as a string.

Note: The formula to calculate shipping cost would be:

weight * distance * 0.1 where weight is 2 kgs.

API Call: <http://localhost:3000/shipping-cost?weight=2&distance=600>

Expected Output: 120
*/

/*self study 
weight * distance * 0.1

This type of formula is typical for scenarios where the cost increases linearly with both weight and distance, and a constant is used to adjust the unit price or to fit the formula to real-world pricing models.

0.1: A constant factor that could represent a cost per kilogram per kilometer, adjusted for particular pricing model.*/

function shippingCost(distance, weight) {
  let shippingCost = distance * weight * 0.1;
  console.log("shippingCost = " + shippingCost);
  return shippingCost;
}
app.get("/shipping-cost", (req, res) => {
  // for debugging
  console.log(
    " API shipping-cost called Endpoint 5 : Calculate the shipping cost based on weight and distance",
  );
  let weight = parseFloat(req.query.weight);
  let distance = parseFloat(req.query.distance);
  console.log("weight = " + weight + " distance = " + distance);
  res.send(shippingCost(distance, weight).toString());

  // for debugging
  setTimeout(() => {
    console.clear();
    console.log("Console has been cleared.");
  }, 30000);
});

/*
const loyaltyRate = 2; // 2 points per $1
Endpoint 6 : Calculate loyalty points earned from a purchase

Create an endpoint that takes purchaseAmount as query parameters and returns the loyalty points.

Write an Express code snippet.

Declare an endpoint /loyalty-points using the get keyword.

Declare a variable purchaseAmount as an input.

Parse the purchaseAmount input as float to calculate the loyalty points based on the purchase amount.

Return the result as a string.

API Call: <http://localhost:3000/loyalty-points?purchaseAmount=3600>

Expected Output: 7200



*/
function loyaltyPoints(purchaseAmount) {
  let loyaltyPoints = purchaseAmount * loyaltyRate;
  console.log("loyaltyPoints = " + loyaltyPoints);
  return loyaltyPoints;
}
app.get("/loyalty-points", (req, res) => {
  // for debugging
  console.log(
    " API loyalty-points called Endpoint 6 : Calculate loyalty points earned from a purchase",
  );
  let purchaseAmount = parseFloat(req.query.purchaseAmount);
  console.log("purchaseAmount = " + purchaseAmount);
  res.send(loyaltyPoints(purchaseAmount).toString());

  // for debugging
  setTimeout(() => {
    console.clear();
    console.log("Console has been cleared.");
  }, 30000);
});
