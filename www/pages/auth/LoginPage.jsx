  /**
     * 
     * Untuk melakukan proses login ke dalam aplikasi, program akan mengirimkan data melalui HTTP Request dengan metode POST kepada API.  Data user akan dibungkus dalam JSON dan dikirimkan bersama dengan HTTP Request tadi. Nantinya endpoint akan memberikan response hasil login.} data 
     * 
     */
const LoginPage = (param)=>{      
    
    const mainContext = useContext(MainContext); 

    const history = useHistory(); 
    const [noInduk,setnoInduk] = useState(""); 

    const [isLoading,setisLoading] = useState(false); 

    const [pass,setpass] = useState("");  

    const urlImage = "img/logo.png"

    const onChangeNoInduk = (e)=>{
        setnoInduk(e.target.value); 
    }
    const onChangePass = (e)=>{
        setpass(e.target.value);
    }
    const bodyStyle = {
        height:"100%",
        backgroundColor:"#004882", 
        paddingBottom:"15%", 
    };
    const wrapStyle = {
        paddingBottom: "7%", 
        paddingTop:"10px"
    }
    const imgStyle = {
        backgroundImage: `url(${urlImage})`, 
        backgroundSize:"90%"
    } 
    const btnStyle = {
        width: "100%"
    }
    
   
   async function login (data){   
    const result =  await PublicClient.post('Auth/index_post',data);   
    if(result.status){ 
        UserModel.set({
          divisi : result.divisi,
          nama : result.nama,
          hak_akses : result.hak_akses,
          nomor_induk : result.nomor_induk,
          token : result.token
        }); 
        return {
          status : true,
          hak_akses : result.hak_akses,
          nama : result.nama,
          divisi : result.divisi,
          nomor_induk : result.nomor_induk,
        } 
    }  
        return {
          status : false,
          message : result.message
        };
    
}
    const onLogin = async (e)=>{
        e.preventDefault();  
        setisLoading(true);
        let data = {
            "nomor_induk" : noInduk,
            "password" : pass,
        }
        let res = await login(data);
        if(!res.status){  
            setisLoading(false); 
            mainContext.setModalContext({
                open : true,
                message : "Login gagal, "+res.message
            }) 
        }else{ 
            setisLoading(false); 
            switch(res.hak_akses){
                case '1': 
                    history.push("user")   
                    break;
                case '2': 
                    history.push("manager")   
                    break;
                case '3': 
                    history.push("gm")  
                    break;
                case '4':  
                    history.push("admin")  
                    break;
                // default: 
                //     history.push("admin")  
            }
        }
    }  
    useEffect(()=>{ 
        const userCek = UserModel.get() 
        if(userCek){ 
            switch(userCek.hak_akses){
                case '1': 
                    history.push("user")   
                    break;
                case '2': 
                    history.push("manager")   
                    break;
                case '3': 
                    history.push("gm")  
                    break;
                case '4':  
                    history.push("admin")  
                    break; 
            }
        }  
    
         
    },[]) 
    return (
        <div style={bodyStyle}>  
            <section className="pt-4">
                <div className="container"> 
                    <div className="row justify-content-center"> 
                        <div className=" col-md-12 col-lg-10">
                            <div className="wrap d-md-flex" style={wrapStyle}>
                                <div className="img" style={imgStyle}> 
                                </div>
                                <div className="login-wrap p-4 p-md-5">
                                    <div className="d-flex">
                                        <div className="w-100">
                                            <h2 className="mb-4 fw-bold">Manajemen Komplain Antar Departemen</h2>
                                        </div>
                                    </div>
                                    <div className="d-flex">
                                        <div className="w-100">
                                            <h3 className="mb-4">Login</h3>
                                        </div>
                                    </div>

                                    <form action="#" onSubmit={onLogin} className="signin-form" id="loginForm"> 
                                        <div className="form-group mb-3">
                                            <label className="label" htmlFor="name">Nomor Induk</label>
                                            <input type="text" className="form-control" placeholder="01234513" onChange={onChangeNoInduk} required/>
                                        </div>
                                        <div className="form-group mb-3">
                                            <label className="label" htmlFor="password">Password</label>
                                            <input type="password" className="form-control" placeholder="Password"  onChange={onChangePass} required/>
                                        </div>

                                        <div className="form-group">  
                                                    {isLoading &&  <Button btnStyle={btnStyle}> <Loading color="white"/></Button> }
                                                    {!isLoading &&  <Button type="submit" btnStyle={btnStyle}> Login</Button>}
                                                     
                                        </div> 
                                    </form> 
                                </div>
                            </div>
                        </div>
                    </div>
                </div> 
            </section>
        </div>
    );
}
// exports.LoginPage = LoginPage