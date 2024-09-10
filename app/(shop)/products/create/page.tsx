"use client"

import { useState, ChangeEvent, FormEvent } from "react";
import CreateProductButton from "@/components/CreateProductButton";

interface ProductData {
  title: string;
  description: string;
  category: string;
  price: number;
  image: File | null;
  condition: string;
  status: string;
  created_at: string;
  buyer_id?: string;
  bought_at?: string;
  seller_id?: string;
  sold_at?: string;
  updated_at?: string;
}

export default function CreateProduct() {
  const [productFormData, setProductFormData] = useState<ProductData>({
    title: "",
    description: "",
    category: "",
    price: 0.00,
    image: null,
    condition: "",
    status: "",
    created_at: new Date().toISOString(),
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >) => {
    const { id, value, type } = e.target;

    if (e.target instanceof HTMLInputElement && e.target.type === "file") {
      const files = e.target.files;
      if (files) {
        setProductFormData({
          ...productFormData,
          [id]: files ? files[0] : null,
        });
      }
    } else {
      setProductFormData({
        ...productFormData,
        [id]: value
      });
    }
  };

  const validate = () => {
    if (productFormData.title === "") {
      console.error("Title is required");
      return false;
    }

    if (productFormData.description === "") {
      console.error("Description is required");
      return false;
    }

    if (productFormData.category === "") {
      console.error("Category is required");
      return false;
    }

    if (productFormData.price === 0.00) {
      console.error("Price is required");
      return false;
    }

    /* handle images later
    if (productFormData.image === null) {
      console.error("Image is required");
      return false;
    }
    */

    if (productFormData.condition === "") {
      console.error("Condition is required");
      return false;
    }

    return true;
  }

  const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    const productData = new FormData();
    productData.append("title", productFormData.title);
    productData.append("description", productFormData.description);
    productData.append("category", productFormData.category);
    productData.append("price", productFormData.price.toString());
    productData.append("image", productFormData.image as Blob);
    productData.append("condition", productFormData.condition);
    productData.append("status", productFormData.status);
    productData.append("created_at", productFormData.created_at);

    try {
      const response = await fetch("/api/products", {
        method: "POST",
        body: productData,
      });

      if (response.ok) {
        console.log("Product created successfully");
      } else {
        console.error("Failed to create product");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }

  return (
    <div className="container mx-auto w-1/2">
      <h1 className="text-2xl pb-8">Create a Product</h1>

      <form className="flex flex-col mx-auto" onSubmit={handleSubmit}>
        <div className="flex flex-col pb-8">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={productFormData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex flex-col pb-8">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={productFormData.description}
            onChange={handleChange}>
          </textarea>
        </div>

        <div className="flex flex-col pb-8">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            value={productFormData.category}
            onChange={handleChange}
            required
          >
            <option value="tattoo_machines">Tattoo Machines</option>
            <option value="flash_material">Flash Material</option>
            <option value="books">Books</option>
            <option value="inks">Inks</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="flex flex-col pb-8">
          <label htmlFor="price">Price</label>
          <input
            type="currency"
            id="price"
            value={productFormData.price}
            onChange={handleChange}
            placeholder="0.00"
            required
          />
        </div>

        <div className="flex flex-col pb-8">
          <label htmlFor="image">Image</label>
          <input
            type="file"
            id="image"
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex flex-col pb-8">
          <label htmlFor="condition">Condition</label>
          <select
            id="condition"
            value={productFormData.condition}
            onChange={handleChange}
            required
          >
            <option value="new">New</option>
            <option value="like_new">Used - Like New</option>
            <option value="good">Used - Good</option>
            <option value="fair">Used - Fair</option>
          </select>
        </div>
      </form>

      <CreateProductButton />
    </div>
  );
}