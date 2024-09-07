import { createClient } from "@/utils/supabase/server";
import { NextApiResponse, NextApiRequest } from 'next';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
const supabase = createClient(supabaseUrl, supabaseKey);


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return getProducts(req, res);
    case 'POST':
      return createProduct(req, res);
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

async function getProducts(req: NextApiRequest, res: NextApiResponse) {
  const { data, error } = await supabase.from('products').select('*');
  if (error) return res.status(500).json({ error: error.message });
  return res.status(200).json(data);
}

async function createProduct(req: NextApiRequest, res: NextApiResponse) {
  const { title, description, category, price, image, condition } = req.body;
  const { data, error } = await supabase.from('products').insert([
    { title, description, category, price, image, condition }
  ]);

  if (error) {
    return res.status(500).json({ error: error.message });
  }
  return res.status(201).json(data);
}