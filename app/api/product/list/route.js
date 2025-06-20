import connectdb from "@/config/db";

import Product from "@/models/Product";

import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    // 3. Connect to DB
    await connectdb();

    // 4. Fetch all products
    const products = await Product.find({});

    // 5. Return success
    return NextResponse.json({ success: true, products }, { status: 200 });
  } catch (err) {
    // 6. Error handling
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}
