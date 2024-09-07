import { createClient } from "@/utils/supabase/server";
import { NextApiResponse, NextApiRequest } from 'next';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'PUT':
      return updateProduct(req, res);
    case 'DELETE':
      return deleteProduct(req, res);
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

async function updateProduct(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const { title, description, category, price, image, condition } = req.body;
  const { data, error } = await supabase.from('products').update({
    title, description, category, price, image, condition
  }).eq('id', id);

  if (error) {
    return res.status(500).json({ error: error.message });
  }
  return res.status(200).json(data);
}

async function deleteProduct(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const { data, error } = await supabase.from('products').delete().eq('id', id);

  if (error) {
    return res.status(500).json({ error: error.message });
  }
  return res.status(200).json(data);
}