/**
 * Writting logic for Chat and LLM Response
 */

import { OpenAI } from "@langchain/openai";
import Order from "../models/Order";
import Delivery from "../models/Delivery";

// OpenAI setup
const llm = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  model: "gpt-3.5-turbo",
});

// User Message Intent classification
const IntentClassification = (message: string) => {
  const temp = message.toLowerCase();
  if (temp.includes("orders") || temp.includes("my orders"))
    return "get_orders";

  if (temp.includes("deliveries") || temp.includes("pending deliveries"))
    return "get_deliveries";

  return "general_query";
};

// Fetching Orders and Pending Deliveries
const getUserOrders = async (userId: string) => {
  try {
    return await Order.find({ userId });
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw new Error("Failed to fetch user orders.");
  }
};

const getPendingDeliveries = async (userId: string) => {
  try {
    return await Delivery.find({ userId, status: "pending" });
  } catch (error) {
    console.error("Error fetching pending deliveries:", error);
    throw new Error("Failed to fetch pending deliveries.");
  }
};

// Main Handler Function
export const HandleMessages = async (userId: string, message: string) => {
  const intent = IntentClassification(message);

  try {
    if (intent === "get_orders") {
      const orders = await getUserOrders(userId);
      const prompt = `Here are the user's orders: ${JSON.stringify(
        orders
      )}. Please summarize them in a friendly way.`;

      return await llm.predict(prompt);
    } else if (intent === "get_deliveries") {
      const deliveries = await getPendingDeliveries(userId);

      const prompt = `Here are the user's pending deliveries: ${JSON.stringify(
        deliveries
      )}. Please summarize them in a friendly way.`;

      return await llm.predict(prompt);
    } else {
      const prompt = `Answer the following question about our website: ${message}`;

      return await llm.predict(prompt);
    }
  } catch (error) {
    console.error("Error Handling Message", error);
    return "Sorry, something went wrong while processing your request. Please try again later.";
  }
};
