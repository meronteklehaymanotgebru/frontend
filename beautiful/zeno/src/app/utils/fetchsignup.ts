const baseUrl='api/signup'

export async function fetchSignUp(data:{first_name:string, last_name:string,email:string, password:string}){
    try{
        const response = await fetch(baseUrl,{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(data)
        })
        if(!response.ok){
            const errorText= await response.text()
            throw new Error("something went wrong please try again"+ errorText);
        }
        const result= await response.json()
        if(result.token){
            localStorage.setItem("token", result.token);
        }
        return result;


    }
    catch(error){
        throw new Error("Failed to sign up" + (error as Error).message)
    }
}