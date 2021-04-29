const Order = require("../models/Order");
var mongo = require("mongodb");
const {
  isEmpty,
  putError,
  checkError,
  checkToken,
} = require("../config/helpers");
const validate = require("../validations/order");

module.exports = {
  Query: {
    orders: async (root, args) => {
      try {
        let orders = await Order.find({}).populate("customer_id", "first_name last_name");
        return orders
      } catch (error) {
        console.log(error)
        throw new Error("Something went wrong.");
      }
    },
    order: async (root, args) => {
      try {
        const order = await Order.findById(args.id);
        if (!order) {
          throw putError("not found");
        }
        return order;
      } catch (error) {
        error = checkError(error);
        throw new Error(error.custom_message);
      }
    },
    ordersbyUser: async (root, args) => {
      console.log("inside ordersbyUser", args.user_id);
      try {
        const orders = await Order.find({
          customer_id: args.user_id,
        });
        if (!orders) {
          throw putError("Orders not found");
        }
        return orders;
      } catch (error) {
        error = checkError(error);
        throw new Error(error.custom_message);
      }
    },
  },
  Mutation: {
    addOrder: async (root, args, { id }) => {
      console.log("inside addOrder", args);
      // checkToken(id);
      try {
        const newOrder = new Order({
          customer_id: args.user_id,
          billing: args.billing,
          shipping: args.shipping,
          status: "Processing",
          subtotal: args.subtotal,
          total: args.total,
          paymentMethod: args.paymentMethod,
        });

        newOrder.products = [...args.products];

        await newOrder.save();
        return await Order.find({});
      } catch (error) {
        error = checkError(error);
        throw new Error(error.custom_message);
      }
    },
    updateOrder: async (root, args, { id }) => {
      // checkToken(id);
      try {
        // Check Validation
        const errors = validate("updateOrder", args);
        if (!isEmpty(errors)) {
          throw putError(errors);
        }

        const order = await Order.findById(args.id);
        if (!order) {
          throw putError("not found");
        }
        order.status = args.status;
        order.billing = args.billing;
        order.shipping = args.shipping;
        order.products = args.products;
        await order.save();

        return await Order.find({});
      } catch (error) {
        error = checkError(error);
        throw new Error(error.custom_message);
      }
    },
    deleteOrder: async (root, args, { id }) => {
      console.log(id);
      try {
        await Order.findByIdAndRemove(args.id);
        return await Order.find({});
      } catch (error) {
        error = checkError(error);
        throw new Error(error.custom_message);
      }
    },
  },
};
