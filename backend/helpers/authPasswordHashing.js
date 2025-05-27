import bcrypt from "bcrypt"

// hasing password encrryption method

export const hashedPassword = async(password)=>{
    try {
        const hashedPassword = await bcrypt.hash(password,10);
        return hashedPassword;
        
    } catch (error) {
        console.log("Error in hashing password " + error)
    }
};

// password decryption method or compare 

export const comparePassword = async(password,hashedPassword)=>{
    try {
        return bcrypt.compare(password,hashedPassword)
    } catch (error) {
        console.log("Error in compare hasing password" + error)
    }
}
