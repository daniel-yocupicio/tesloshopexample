import bcrypt from 'bcryptjs';
import { User } from "../models";
import { db } from "./"

export const checkUserEmailPassword = async (email: string, password: string) => {

    console.log(2312312312312312312);
    
    await db.connect();
    console.log(2);
    
    const user = await User.findOne({email});
    console.log(3);
    
    await db.disconnect();
    console.log(4);    

    if (!user) {
        return null;
    }

    if (!bcrypt.compareSync(password, user.password!)){
        return null;
    }

    const {role, name, _id} = user;

    return {
        _id,
        email: email.toLowerCase(),
        role,
        name,
    }
}