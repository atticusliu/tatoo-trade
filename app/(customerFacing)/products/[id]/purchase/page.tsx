import NotFound from "@/app/(shop)/not-found/page";
import { createClient } from "@/utils/supabase/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  // apiVersion: "2020-08-27",
});

export default async function PurchasePage({
  params: { id },
 } : {
  params: { id: string }
 }) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("Product")
    .select()
    .match({ id });

  if (error || data.length === 0) {
    return <NotFound />;
  }

  return (
    <div>
      <div>
        <h1>Purchase Page</h1>
        <p>Buy this item</p>
      </div>
    </div>
  );
}