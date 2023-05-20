const ManagerHomePage = ()=>{
    const routeContext = useContext(RouteContext);
    const [sidebarClass,setSidebarClass] = useState("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion");
    const [user,setUser] = useState({
        token : '123',
        divisi : 'divisi',
        nama : 'nama',
        hak_akses : '1',
        nomor_induk : '123'
    });
    
    const history = useHistory();  
    const path = history.location.pathname;
    
    const toggleSidebar = ()=>{ 
        if(sidebarClass=="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"){
            setSidebarClass("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled")
        }else{
            setSidebarClass("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion")
        }
    }

    const confirmLogout = ()=>{
        let confirm = window.confirm("Apakah anda yakin ingin logout?");
        if(confirm){
            UserModel.logout();   
            history.push("/");
        }
    }

    cekToken = async()=>{ 
        const res =  await PrivateClient.get('TesVerification/index_get');    
        return res.status
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
            if(userCek.hak_akses=='3'){ 
                history.push("/gm")    
            }
            if(userCek.hak_akses=='1'){ 
                history.push("/user")    
            }
            if(userCek.hak_akses==4){  
                history.push("/admin")    
            } 
        }else{ 
            history.push("/")   
        } 
    },[])
    return( 
            <div id="wrapper"> 
                       {/*  Sidebar */} 
                           <ul className={sidebarClass} id="accordionSidebar">
                           {/*  Sidebar - Brand */}
                           <a className="sidebar-brand d-flex align-items-center justify-content-center mt-2">
                               <img src="./img/logo.png" alt="ubs" className="rounded-3 w-100 mt-4"/>
                           </a>
   
                           {/*  Divider */}
                           <hr className="sidebar-divider my-2"/>
     
                           <li className={routeContext.routeContext.includes("dashboard")?"nav-item active":"nav-item"}> 
                               <Link className="nav-link" to="/manager/dashboard">
                                   <i className="fas fa-fw fa-tachometer-alt"></i>
                                   <span>Dashboard</span>
                               </Link> 
                           </li>

                           <li className={routeContext.routeContext.includes("complain")?"nav-item active":"nav-item"}> 
                               <Link className="nav-link" to="/manager/complain/list">
                                   <i className="fas fa-fw fa-paper-plane"></i>
                                   <span>Komplain</span>
                               </Link> 
                           </li>
     
                            
                           <li className="nav-item active">
                               <div className="nav-link btn-danger mt-5 text-center" onClick={confirmLogout}>     
                                   LOGOUT 
                               </div>
                           </li>
                           {/*  Divider */}
                           <hr className="sidebar-divider d-none d-md-block"/>
   
                           {/*  Sidebar Toggler (Sidebar) */}
                           <div className="text-center d-none d-md-inline">
                               <button className="rounded-circle border-0" id="sidebarToggle"></button>
                           </div>
   
                       </ul>
                       {/*  End of Sidebar */}
   
                       {/*  Content Wrapper */}
                       <div id="content-wrapper" className="d-flex flex-column">
   
                           {/*  Main Content */}
                           <div id="content">
   
                               {/*  Topbar */}
                               <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
   
                                   {/*  Sidebar Toggle (Topbar) */}
                                   <button onClick={toggleSidebar} className="btn btn-link d-md-none rounded-circle mr-3" id="sidebarToggle">
                                       <i className="fa fa-bars"></i>
                                   </button>
   
                                   <TopbarProfile user={user}/>
   
                               </nav>
                               {/*  End of Topbar */}
   
                               {/*  Begin Page Content */} 
                               <div className="container-fluid"> 
                                   <Switch>   
                                       <Route exact path="/manager/complain/detail/:no_komplain">
                                           <ManagerDetailComplain/>
                                       </Route>  
                                       <Route path="/manager/complain/list">
                                           <ManagerListComplain/>
                                       </Route> 
                                       <Route exact path="/manager/dashboard">
                                           <ManagerDashboard/>
                                       </Route>
                                       <Route path="/manager">
                                           <Redirect to="/manager/dashboard"/>
                                       </Route>
                                   </Switch>
                       
                               {/* <!-- /.container-fluid --> */}
                   
                       </div>
                       {/* <!-- End of Main Content --> */}
           
           
                   </div>
               {/* <!-- End of Content Wrapper --> */}
           
               </div>
               {/* <!-- End of Page Wrapper --> */}
           
               {/* <!-- Scroll to Top Button--> */}
               <ScrollToTopButton/> 
               </div> 
       
    )
}