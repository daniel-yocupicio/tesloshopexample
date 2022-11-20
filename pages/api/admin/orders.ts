import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database';
import { Order } from '../../../models';
import { IOrder } from '../../../interfaces';
import { getSession } from 'next-auth/react';

type Data = 
| { message: string } 
|   IOrder[]

interface User {
    _id: string;
    email: string;
    role: string;
    name: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    const session = await getSession({req});

    if(!session) {
        return res.status(401).json({ message: 'No tiene permisos para usar este endpoint' });
    }

    const validRoles = ['admin','super-user','SEO'];
    const user : User = session.user as User;
    
    if(!validRoles.includes(user.role)){
        return res.status(401).json({ message: 'No tiene permisos para usar este endpoint' });
    }
    
    
    switch( req.method ) {

        case 'GET':
            return getOrders(req, res);

        default:
            return res.status(400).json({ message: 'Ese endpoint no existe'});

    }


}

const getOrders = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
    
    await db.connect();
    const orders = await Order.find()
        .sort({ createdAt: 'desc' })
        .populate('user', 'name email')
        .lean();
    await db.disconnect();

    return res.status(200).json( orders )

}