import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { isValidObjectId } from 'mongoose';
import { db } from '../../../database';
import { IUser } from '../../../interfaces';
import { User } from '../../../models';

type Data = 
  |  { message: string }
  |  IUser[]

interface User {
    _id: string;
    email: string;
    role: string;
    name: string;
}

export default async function handller(req: NextApiRequest, res: NextApiResponse<Data>) {
    const session = await getSession({req: req});

    if(!session) {
        return res.status(401).json({ message: 'No tiene permisos para usar este endpoint' });
    }

    const validRoles = ['admin','super-user','SEO'];
    const user : User = session.user as User;
    
    if(!validRoles.includes(user.role)){
        return res.status(401).json({ message: 'No tiene permisos para usar este endpoint' });
    }
    

    switch(req.method){

        case 'GET':
            return getUsers(req, res);

        case 'PUT':
            return updateUser(req, res);

        default:
            return res.status(400).json({ message: 'Ese endpoint no existe' });
    }
}

const getUsers = async(req: NextApiRequest, res: NextApiResponse<Data>) =>  {

    await db.connect();
    const users = await User.find().select('-password').lean();
    await db.disconnect();

    return res.status(200).json( users );


}



const updateUser = async(req: NextApiRequest, res: NextApiResponse<Data>) =>  {
    
    const { userId = '', role = '' } = req.body;
    
    if ( !isValidObjectId(userId) ) {
        return res.status(400).json({ message: 'No existe usuario por ese id' })
    }

    const validRoles = ['admin','super-user','SEO','client'];
    if ( !validRoles.includes(role) ) {
        return res.status(400).json({ message: 'Rol no permitido: ' + validRoles.join(', ') })
    }

    await db.connect();
    const user = await User.findById( userId );

    if ( !user ) {
        await db.disconnect();
        return res.status(404).json({ message: 'Usuario no encontrado: ' + userId });
    }

    user.role = role;
    await user.save();
    await db.disconnect();

    return res.status(200).json({ message: 'Usuario actualizado' });
     
}