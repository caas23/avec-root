import { Request, Response } from 'express';
import { getCollection } from './collections';

export const getBikes = async (req: Request, res: Response) => {
  const bikes = await getCollection('bikes').find().toArray();
  res.json(bikes);
};