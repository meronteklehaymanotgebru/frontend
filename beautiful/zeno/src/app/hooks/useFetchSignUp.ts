import { useState } from "react";
import { fetchSignUp } from "../utils/fetchsignup";

export function useFetchSignUp(){
    const[isLoading,setIsLoading]= useState(false);
    const[error, setError]=useState<Error | null>(null);

    async function signUp(data:{first_name:string, last_name:string, email:string, password:string}){
        setIsLoading(true);
        setError(null);
        try{
            const register_data =await fetchSignUp(data);
            if(register_data &&  register_data.token){
                localStorage.setItem("token", register_data.token);
                
            }
            setIsLoading(false);
            return register_data;
    
        }
        catch(error){
            setError(error as Error);
            setIsLoading(false)
            return null
        }
    }
    return {signUp, isLoading, error}
}