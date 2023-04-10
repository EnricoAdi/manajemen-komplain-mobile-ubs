 
const LoginPage = (param)=>{      
    const history = useHistory(); 
    const [noInduk,setnoInduk] = useState(""); 

    const [isLoading,setisLoading] = useState(false); 

    const [pass,setpass] = useState(""); 
    // console.log(UserModel().get())
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
    
    const onLogin = async (e)=>{
        e.preventDefault();  
        setisLoading(true);
        let data = {
            "nomor_induk" : noInduk,
            "password" : pass,
        }
        let res = await LoginViewModel.login(data);
        if(!res.status){
            alert("Login gagal, "+res.message);
            setisLoading(false);
        }else{ 
            setisLoading(false);
            console.log(res.hak_akses)
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