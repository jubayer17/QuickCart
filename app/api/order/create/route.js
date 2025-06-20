import Product from "@/models/Product";
import User from "@/models/User";
import { inngest } from "@/lib/inngest"; // Adjust if path is different
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { userId } = await getAuth(req);
    const { address, items } = await req.json();

    if (!address || items.length === 0) {
      return NextResponse.json({ success: false, message: "Invalid data" });
    }

    let amount = 0;
    for (const item of items) {
      const product = await Product.findById(item.product);
      amount += product.offerPrice * item.quantity;
    }

    await inngest.send({
      name: "order/created",
      data: {
        userId,
        address,
        items,
        amount: amount + Math.floor(amount * 0.02),
        date: Date.now(),
      },
    });

    const user = await User.findById(userId);
    user.cartItems = {};
    await user.save();

    return NextResponse.json({
      success: true,
      message: "Order has been placed",
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json({
      success: false,
      message: err.message,
    });
  }
}
