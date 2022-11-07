import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database';
import { User } from '../../../models';
import bcrypt from 'bcryptjs';
import { jwt, validations } from '../../../utils';

type Data = 
    | {message: string}
    | {
        token: string;
        user: {
            email: string; 
            role: string; 
            name: string;
        }
    }

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'POST':
            return registerUser(req, res);

        default:
            return res.status(400).json({ message: 'El endpoint no existe' });
    }
}

const registerUser = async (req: NextApiRequest, res: NextApiResponse) => {
    const {email = '' , password = '', name = ''} = req.body as {email: string, password: string, name: string};

    if(password.length < 6){
        return res.status(400).json({ message: 'La contraseña tiene que ser mayor de 6 carácteres' });
    }

    if(!validations.isValidEmail(email)) {
        return res.status(400).json({ message: 'El correo no tiene un formato válido' });
    }   

    await db.connect();
    const user = await User.findOne({email});

    if(user) {
        await db.disconnect();
        return res.status(400).json({ message: 'Ese correo no se puede utilizar' });
    }

    const newUser = new User({
        email: email.toLowerCase(),
        password: bcrypt.hashSync(password),
        role: 'client',
        name: name
    })

    try {
        await newUser.save({validateBeforeSave: true});
    } catch (e) {
        return res.status(500).json({message: ''})
    }

    const {role, _id} = newUser;

    const token = jwt.signToken(_id, email);

    return res.status(200).json({
                                token,
                                user: {
                                    email, role, name
                                }
                            });
}