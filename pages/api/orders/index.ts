import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react';
import { db } from '../../../database';
import { IOrder } from '../../../interfaces/order';
import { Order } from '../../../models';
import Product from '../../../models/Product';

type Data = 
  | { message: string }
  | IOrder

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'POST':
            return createOrder(req, res);
    
        default:
            return res.status(400).json({ message: 'El endpoint no existe' })
    }
}

const createOrder = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const {orderItems, total} = req.body as IOrder;
    const session: any = await getSession({req});

    if(!session) {
        return res.status(401).json({message: "No esta autorizado para usar esta operación"});
    }

    const productsIds = orderItems.map(p => p._id);

    await db.connect();
    const dbProduct = await Product.find({_id: {$in:productsIds}});

    try {
        const subTotal = orderItems.reduce((prev, current) => { 
            
            const currentPrice = dbProduct.find(prod => prod.id === current._id)!.price;

            if(!currentPrice) {
                throw new Error('verifique el carrito de nuevo, el producto no existe');
            }
            
            return (current.quantity * current.price) + prev 
        },0);

        const taxtRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0);
        const backendTotal = subTotal * (taxtRate + 1);

        if(backendTotal !== total) {
            throw new Error('El total no cuadra con el monto');
        }

        const userId = session.user._id;
        const newOrder = new Order({...req.body, isPaid: false, user: userId});
        newOrder.total = Math.round(newOrder.total * 100) / 100;

        await newOrder.save();
        await db.disconnect();
                
        return res.status(201).json(newOrder);

    } catch(e){
        await db.disconnect();
        return res.status(400).json({ message: e.message || 'Error en el servidor, cheque los logs' });
    }
}