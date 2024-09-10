import { createClient } from "@/utils/supabase/server";
import { NextApiResponse, NextApiRequest } from 'next';

const supabase = createClient();

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