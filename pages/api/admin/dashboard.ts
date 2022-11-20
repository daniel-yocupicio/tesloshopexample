import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react';
import { db } from '../../../database';
import { Order, User } from '../../../models';
import Product from '../../../models/Product';

type Data = 
  | {message: string}
  | {
    numberOfOrders          : number;
    paidOrders              : number;
    notPaidOrders           : number;
    numberOfClients         : number;
    numberOfProducts        : number;
    productsWithNoInventory : number;
    lowInventory            : number;
  }

interface User {
    _id: string;
    email: string;
    role: string;
    name: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    const session = await getSession({req: req});

    if(!session) {
        return res.status(400).json({ message: 'No tiene permisos para usar este endpoint' });
    }

    const validRoles = ['admin','super-user','SEO'];
    const user : User = session.user as User;
    
    if(!validRoles.includes(user.role)){
        return res.status(400).json({ message: 'No tiene permisos para usar este endpoint' });
    }
    

    switch(req.method){

        case 'GET':
            return getDataDashboard(req, res)

        default:
            return res.status(400).json({ message: 'Ese endpoint no existe' });
    }
}

const getDataDashboard = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    await db.connect();

    const numberOfOrders          = await Order.count();
    const paidOrders              = await Order.find({isPaid: true}).count();
    const notPaidOrders           = numberOfOrders - paidOrders;
    const numberOfClients         = await User.find({role: 'client'}).count();
    const numberOfProducts        = await Product.count();
    const productsWithNoInventory = await Product.find({inStock: 0}).count();
    const lowInventory            = await Product.find({inStock: {$lte: 10}}).count();

    await db.disconnect();

    return res.status(200).json({ 
        numberOfProducts,
        paidOrders,
        notPaidOrders,
        numberOfOrders,
        numberOfClients,
        productsWithNoInventory,
        lowInventory
    });
}
