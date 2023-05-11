const UserModel = { 
      get(){ 
        const user = storage.get('login')
        if(!user){
            return null
        }
        return user
    },
    set(result){ 
        storage.set('login', result);  
    },
    logout(){
        storage.remove('login'); 
    }
}