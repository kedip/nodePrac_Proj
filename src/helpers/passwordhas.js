import bcrypt from "bcrypt";


export const passwordHas = (password)=>{
    const saltRounds = 10;
    const hashedPassword =  bcrypt.hashSync(password, saltRounds);
    return hashedPassword;
}