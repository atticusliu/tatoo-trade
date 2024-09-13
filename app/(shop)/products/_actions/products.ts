"use server"

import { z } from "zod";
import { createClient } from '@/utils/supabase/server'
import fs from "fs/promises";
import { redirect } from "next/navigation";
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

// non-exhaustive
const statusEnum = z.enum([
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

export async function createProduct(prevState:unknown, formData: FormData) {
  const result = addSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!result.success) {
    return result.error.formErrors.fieldErrors;
  }

  const supabase = createClient();
  const data = result.data;

  await fs.mkdir("products", { recursive: true });
  const filePath = `products/${crypto.randomUUID()}`;
  // await fs.writeFile(filePath, Buffer.from(await data.file.arrayBuffer()))

  await fs.mkdir("public/products", { recursive: true });
  const imagePath = `/products/${crypto.randomUUID()}-${data.image.name}`;
  await fs.writeFile(
    `public${imagePath}`,
    Buffer.from(await data.image.arrayBuffer())
  );

  console.log("we are here");

  // TODO: actually handle the error maybe lol
  const { error } = await supabase
    .from("Product")
    .insert([
      {
        updatedAt: new Date(),
        title: data.title,
        description: data.description,
        category: data.category,
        priceInCents: data.priceInCents,
        condition: data.condition,
        status: "pending",
        isAvailableForPurchase: false,
        imagePath,
      },
    ]);


  revalidatePath("/")
  revalidatePath("/products")
  redirect("/products");
}
