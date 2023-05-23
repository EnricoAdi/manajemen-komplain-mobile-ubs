 
const AdminHomePage = () => {
    const routeContext = useContext(RouteContext);
    let logedIn = UserModel.get();
    const [sidebarClass,setSidebarClass] = useState("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion");
    const [user,setUser] = useState({
        token : '123',
        divisi : 'divisi',
        nama : 'nama',
        hak_akses : '1',
        nomor_induk : '123'
    });

    const toggleSidebar = ()=>{ 
        if(sidebarClass=="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"){
            setSidebarClass("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled")
        }else{
            setSidebarClass("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion")
        }
    }

    const history = useHistory();   
    const path = history.location.pathname;
    cekToken = async()=>{ 
        const res =  await PrivateClient.get('TesVerification/index_get');    
        return res.status
    }
    
    const confirmLogout = ()=>{
        let confirm = window.confirm("Apakah anda yakin ingin logout?");
        if(confirm){
            UserModel.logout();   
            history.push("/");
        }
    }

    useEffect(()=>{  
        setUser(UserModel.get())  
        const userCek = UserModel.get()  
        routeContext.setRouteContext(path)
        if(userCek){  
            setUser(UserModel.get()) 
            cekToken().then((res)=>{
                if(!res){ 
                    UserModel.logout();  
                    history.push("/")   
                }
            })
            if(userCek.hak_akses=='2'){ 
                history.push("/manager")    
            }
            if(userCek.hak_akses=='3'){ 
                history.push("/gm")    
            }
            if(userCek.hak_akses==1){  
                history.push("/user")    
            } 
        }else{ 
            history.push("/")   
        } 
    },[])
    return(
        <div id="wrapper">
 
        <ul className={sidebarClass} id="accordionSidebar">
 
            <a className="sidebar-brand d-flex align-items-center justify-content-center" href="#"> 
                <img src="./img/logo.png" alt="ubs" className="rounded-3 w-100 mt-4"/>
            </a>
 
            <hr className="sidebar-divider my-2"/>
 
            <li className="nav-item active">
                <a className="nav-link" href="<?= base_url(); ?>Admin/Dashboard">
                    <i className="fas fa-fw fa-tachometer-alt"></i>
                    <span>Dashboard</span></a>
            </li>
 
            <li className="nav-item active">
                <div className="nav-link btn-danger mt-5 text-center" onClick={confirmLogout}>     
                    LOGOUT 
                </div>
            </li>

            <hr className="sidebar-divider d-none d-md-block"/>

            <div className="text-center d-none d-md-inline">
                <button className="rounded-circle border-0" id="sidebarToggle"></button>
            </div>

        </ul> 
 
        <div id="content-wrapper" className="d-flex flex-column">
 
            <div id="content"> 
                <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
 
                    <button onClick={toggleSidebar} className="btn btn-link d-md-none rounded-circle mr-3">
                        <i className="fa fa-bars"></i>
                    </button> 
                    
                    <TopbarProfile user={user}/>

                </nav> 
                <div className="container-fluid">
                <Switch>    
                    <Route exact path="/admin/dashboard">
                        <AdminDashboard/>
                    </Route>
                    <Route path="/admin">
                        <Redirect to="/admin/dashboard"/>
                    </Route>
                </Switch>
                       
                </div> 
				
            </div> 
 

        </div> 

    </div>
    )
}