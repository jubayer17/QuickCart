import connectdb from "@/config/db";
import Product from "@/models/Product";
import User from "@/models/User";
import Order from "@/models/Order";

import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectdb();
    const { userId } = await getAuth(req);
    const { address, items } = await req.json();

    if (!address || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ success: false, message: "Invalid data" });
    }

    let amount = 0;

    const products = await Promise.all(
      items.map((item) => Product.findById(item.product))
    );

    for (let i = 0; i < items.length; i++) {
      const product = products[i];
      if (!product) {
        return NextResponse.json({
          success: false,
          message: `Product not found: ${items[i].product}`,
        });
      }
      amount += product.offerPrice * items[i].quantity;
    }

    const orderAmount = amount + Math.floor(amount * 0.02);

    // ✅ Hardcoded paymentType
    await Order.create({
      userId,
      address,
      items,
      amount: orderAmount,
      date: Date.now(),
      paymentType: "COD", // <-- hardcoded here
      isPaid: false,
    });

    await User.findByIdAndUpdate(userId, { cartItems: {} });

    return NextResponse.json({
      success: true,
      message: "Order has been placed",
    });
  } catch (err) {
    console.error("Order POST Error:", err);
    return NextResponse.json({
      success: false,
      message: err.message || "Something went wrong",
    });
  }
}
