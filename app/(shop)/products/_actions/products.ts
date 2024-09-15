"use server"

import { z } from "zod";
import { createClient } from '@/utils/supabase/server'
import fs from "fs/promises";
import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache"

const categoryEnum = z.enum([
  "tattoo_machines",
  "flash_material",
  "books",
  "inks",
  "other",
]);

const conditionEnum = z.enum([
  "new",
  "used_like_new",
  "used_good",
  "used_fair",
]);

// non-exhaustive, and I could be doing this totally wrong
const statusEnum = z.enum([
  "on_sale",
  "pending",
  "shipped",
  "delivered",
  "cancelled",
]);

const fileSchema = z.instanceof(File, { message: "Required" });
const imageSchema = fileSchema.refine(
  file => file.size === 0 || file.type.startsWith("image/")
);

const addSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  category: categoryEnum,
  priceInCents: z.coerce.number().int().min(0),
  condition: conditionEnum,
  // status: statusEnum,
  isAvailableForPurchase: z.coerce.boolean(),
  image: imageSchema.refine(file => file.size > 0, "Required"),
});

const editSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  category: categoryEnum.optional(),
  priceInCents: z.coerce.number().int().min(0).optional(),
  condition: conditionEnum.optional(),
  image: imageSchema.optional(),
});

export async function createProduct(prevState:unknown, formData: FormData) {
  const formDataCopy = Object.fromEntries(formData.entries());
  const product = {
    id: crypto.randomUUID(),
    ...formDataCopy,
  }
  const result = addSchema.safeParse(product);

  if (!result.success) {
    console.log(result.error);
    return result.error.formErrors.fieldErrors;
  }

  const supabase = createClient();
  const data = result.data;

  await fs.mkdir("products", { recursive: true });
  const filePath = `products/${crypto.randomUUID()}`;

  await fs.mkdir("public/products", { recursive: true });
  const imagePath = `/products/${crypto.randomUUID()}-${data.image.name}`;
  await fs.writeFile(
    `public${imagePath}`,
    Buffer.from(await data.image.arrayBuffer())
  );

  const { error } = await supabase
    .from("Product")
    .insert([
      {
        id: product.id,
        updatedAt: new Date(),
        title: data.title,
        description: data.description,
        category: data.category,
        priceInCents: data.priceInCents,
        condition: data.condition,
        status: "available",
        isAvailableForPurchase: false,
        imagePath,
      },
    ]);

  if (error) {
    console.log(error);
    return error;
  }


  revalidatePath("/")
  revalidatePath("/profile")
  redirect("/profile");
}

export async function updateProduct(id: string, prevState: unknown, formData: FormData) {
  const result = editSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!result.success) {
    return result.error.formErrors.fieldErrors;
  }

  const supabase = createClient();
  const data = result.data;
  const productData = await supabase.from("Product").select().match({ id });

  if (productData.error || productData.data.length === 0) {
    return notFound();
  }

  const product = productData.data[0];
  let imagePath = product.imagePath;

  if (data.image != null && data.image.size > 0) {
    await fs.unlink(`public${product.imagePath}`);
    imagePath = `/products/${crypto.randomUUID()}-${data.image.name}`;
    await fs.writeFile(
      `public${imagePath}`,
      Buffer.from(await data.image.arrayBuffer())
    );
  }

  // update the product
  await supabase
    .from("Product")
    .update({
      title: data.title,
      description: data.description,
      category: data.category,
      priceInCents: data.priceInCents,
      condition: data.condition,
      updatedAt: new Date(),
      imagePath,
    })
    .match({ id });

  revalidatePath("/")
  revalidatePath("/profile")
  redirect("/profile");
}

export async function toggleProductAvailability(id: string, isAvailableForPurchase: boolean) {
  const supabase = createClient();
  await supabase
    .from("Product")
    .update({ isAvailableForPurchase })
    .match({ id });
}

export async function deleteProduct(id: string) {
  const supabase = createClient();
  const data = await supabase.from("Product").delete().match({ id });

  if (data.error || data.count === 0) {
    return notFound();
  }

  await fs.unlink(`public{product.imagePath}`);
}