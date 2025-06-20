import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    userId: {
      type: String, // ✅ For Clerk users
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    offerPrice: {
      type: Number,
      required: true,
      min: 0,
      validate: {
        validator: function (v) {
          return v < this.price;
        },
        message: "Offer price must be less than the actual price",
      },
    },
    image: {
      type: [String],
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
      required: true,
    },
  },
  {
    timestamps: true, // createdAt, updatedAt
  }
);

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
