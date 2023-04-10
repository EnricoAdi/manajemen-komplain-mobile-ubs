// import url from "../helper/url.js";
// import storage from "../helper/storage.js";

const PrivateClient = {  
    async get(extended_url){  
        try { 
            let result = await fetch(API_URL + extended_url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Authorization' :  'Bearer '+storage.get('login_token')
                }
            }).then((response) => response.json())
            .then((response) => {return response}); 
            console.log(API_URL+extended_url)
 
            return result;
        } catch (error) {
            console.log("ERROR : "+API_URL+extended_url) 
            console.log(error)
            return error;
        } 
     },

    async post(extended_url, payload){ 
        try{
            let result = await fetch(API_URL + extended_url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Authorization' :  'Bearer '+storage.get('login_token')
                }, 
                body: JSON.stringify(payload)
            }).then((response) => response.json())
            .then((response) => { 
                return response
            });   
            return result;
        }
        catch(error){
            console.log("ERROR FETCH : "+API_URL+extended_url)
            console.log(error) 
            return error;
        }
     }
} 
// export default privateClient;
