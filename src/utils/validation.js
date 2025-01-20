const validator =require("validator")
const validationSignup=(data)=>{

    const {firstName,lastName,email,password,age}=data;

    if(!firstName || !lastName){
        throw new Error("Please enter valide name");
    }
    else if(!validator.isEmail(email)){
        throw new Error("Please the valide emailId");
    }
    else if(!validator.isStrongPassword(password)){
        if(password.length < 8){
            throw new Error("Atleast 8 characters password");
        }else{
            throw new Error("please enter strong password(1 captial ,1 small,1 number,1 symbol)");
        }
        
    }
    else if(age<18){
        throw new Error("Your age is less than 18");
    }

}

module.exports={validationSignup};