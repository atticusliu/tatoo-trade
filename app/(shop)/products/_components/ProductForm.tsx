"use client"

import { useState } from "react";
import { formatCurrency } from "@/lib/formatters";
import { Button } from "@/components/ui/button";
import { createProduct, updateProduct } from "../_actions/products";
import { useFormState, useFormStatus } from "react-dom"
import { Product } from "@prisma/client";
import Image from "next/image";

export function ProductForm({
  product
} : {
  product? : Product | null
}) {
  const [error, action] = useFormState(
    product == null ? createProduct : updateProduct.bind(null, product.id),
    {}
  );
  const [priceInCents, setPriceInCents] = useState<number | undefined>(product?.priceInCents);

  return (
    <div className="container mx-auto w-1/2">
      <form
        action={action}
        className="flex flex-col mx-auto"
      >
        <div className="flex flex-col pb-8">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            required
            defaultValue={product?.title || ""}
          />
          {error.title && <div className="text-destructive">{error.title}</div>}
        </div>

        <div className="flex flex-col pb-8">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            required
            defaultValue={product?.description}
          />
          {error.description && <div className="text-destructive">{error.description}</div>}
        </div>

        <div className="flex flex-col pb-8">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            required
            defaultValue={product?.category}
          >
            <option value="tattoo_machines">Tattoo Machines</option>
            <option value="flash_material">Flash Material</option>
            <option value="books">Books</option>
            <option value="inks">Inks</option>
            <option value="other">Other</option>
          </select>
          {error.category && <div className="text-destructive">{error.category}</div>}
        </div>

        <div className="flex flex-col pb-8">
          <label htmlFor="priceInCents">Price In Cents</label>
          <input
            type="number"
            id="priceInCents"
            name="priceInCents"
            onChange={e => setPriceInCents(Number(e.target.value) || undefined)}
            placeholder="0"
            required
            defaultValue={priceInCents}
            />
          {error.priceInCents && <div className="text-destructive">{error.priceInCents}</div>}
          <div className="text-muted-foreground">
            {formatCurrency((priceInCents || 0) / 100)}
          </div>
        </div>

        <div className="flex flex-col pb-8">
          <label htmlFor="image">Image</label>
          <input
            type="file"
            id="image"
            name="image"
            required={product === null}
          />
          {product != null && (
            <Image
              src={product.imagePath}
              height="400"
              width="400"
              alt="Product Image"
            />
          )}
          {error.image && <div className="text-destructive">{error.image}</div>}
        </div>

        <div className="flex flex-col pb-8">
          <label htmlFor="condition">Condition</label>
          <select
            id="condition"
            name="condition"
            required
            defaultValue={product?.condition}
          >
            <option value="new">New</option>
            <option value="used_like_new">Used - Like New</option>
            <option value="used_good">Used - Good</option>
            <option value="used_fair">Used - Fair</option>
          </select>
          {error.condition && <div className="text-destructive">{error.condition}</div>}
        </div>
        <SubmitButton />
      </form>
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Saving..." : "Save"}
    </Button>
  );
}