const cekSession = ()=>{
    const history = useHistory(); 
    const user = UserModel.get();
    if(user==null){
        history.push("/");
    }
    // console.log('sudah login')
}
const cekAlreadyLogin =()=>{ 
    const history = useHistory(); 
    const user = UserModel.get();
    if(user!=null){
        console.log('sudah login')
    }else{
        console.log('blm login')
        
    }
}