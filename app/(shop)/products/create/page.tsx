"use client"

import { useState, ChangeEvent, FormEvent } from "react";
import { formatCurrency } from "@/lib/formatters";
import { Button } from "@/components/ui/button";
import { createProduct } from "../_actions/products";
import { useFormState, useFormStatus } from "react-dom"

export default function CreateProduct() {
  const [error, action] = useFormState(createProduct, {});
  const [priceInCents, setPriceInCents] = useState<number>();

  return (
    <div className="container mx-auto w-1/2">
      <h1 className="text-2xl pb-8">Create a Product</h1>

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
          />
          {error.title && <div className="text-destructive">{error.title}</div>}
        </div>

        <div className="flex flex-col pb-8">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            required
          />
          {error.description && <div className="text-destructive">{error.description}</div>}
        </div>

        <div className="flex flex-col pb-8">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            required
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
            required
          />
          {error.image && <div className="text-destructive">{error.image}</div>}
        </div>

        <div className="flex flex-col pb-8">
          <label htmlFor="condition">Condition</label>
          <select
            id="condition"
            name="condition"
            required
          >
            <option value="new">New</option>
            <option value="like_new">Used - Like New</option>
            <option value="good">Used - Good</option>
            <option value="fair">Used - Fair</option>
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