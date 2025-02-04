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
const validationProfileEditData=(body)=>{
    const {about,skills}=body;
    const NOT_ALLOW_UPDATE=["email","password"];
        Object.keys(body).forEach((key)=>{
            if(NOT_ALLOW_UPDATE.includes(key)===true){
                throw new Error("You can't Update the "+ key);
                
            }
        })
        if(about && about.length>100) throw new Error("About section should be less than 150 characters");
        if(skills && skills.length>20)throw new Error("Skills should be less than 20");
        return true;
}
const isStatusValide=(status)=>{
    const ALLOW_Status=["interested","ignored"];
    if(!ALLOW_Status.includes(status)){
        return false;
    }
    return true;
}
module.exports={validationSignup,validationProfileEditData,isStatusValide};