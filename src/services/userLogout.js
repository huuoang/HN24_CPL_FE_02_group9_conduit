function userLogout()
{
    try{
        localStorage.removeItem("loggedUser");
        return {
            Headers:null,
            isAuth:false,
            loggedUser:{
                bio:null,
                email:"",
                image:null,
                token:"",
                username:""
            },
        };
    }catch(error){
        console.error("Error while logging out",error);
        return null;
    }
}

export default userLogout