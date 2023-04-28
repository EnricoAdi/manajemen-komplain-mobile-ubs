const UserHomePage = ()=>{  
    const [sidebarClass,setSidebarClass] = useState("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion");
    const [user,setUser] = useState({
        token : '123',
        divisi : 'divisi',
        nama : 'nama',
        hak_akses : '1',
        nomor_induk : '123'
    });
 

    const history = useHistory();  
    const path = history.location.pathname.toLowerCase().split("/");
    

    // console.log(path)
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
  
                        <li className="nav-item"> 
                            <Link className="nav-link" to="/user/dashboard">
                                <i className="fas fa-fw fa-tachometer-alt"></i>
                                <span>Dashboard</span>
                            </Link> 
                        </li>

                        {/*  Divider */}
                        <hr className="sidebar-divider"/>

                        {/*  Heading */}
                        <div className="sidebar-heading">
                            Komplain Diajukan
                        </div>
                        <li className="nav-item">
                            <a className="nav-link" data-toggle="collapse" data-target="#collapsePagesPengajuan" aria-expanded="true" aria-controls="collapsePagesPengajuan">

                                <i className="fas fa-fw fa-paper-plane"></i>
                                <span>Ajukan Komplain</span>
                            </a>
                            <div id="collapsePagesPengajuan" className="collapse" aria-labelledby="headingPages" data-parent="#accordionSidebar">

                                <div className="bg-white py-2 collapse-inner rounded animated--fade-in">
                                    <h6 className="collapse-header">Pengajuan Komplain</h6>
                                    <Link className="collapse-item" to="/user/complain/list">Daftar Komplain</Link>
                                    <Link className="collapse-item" to="/user/complain/add/pilihDivisi">Tambah Komplain</Link>
                                </div>
                            </div>
                        </li> 
                        
                        <li className="nav-item">
                            <Link className="nav-link" to="/user/complain/solved">
                            <i className="fas fa-fw fa-envelope-open"></i>
                                <span>Penyelesaian Komplain Diterima</span>
                            </Link>
                        </li>
                        {/*  Divider */}
                        <hr className="sidebar-divider"/>

                        {/*  Heading */}
                        <div className="sidebar-heading">
                            Komplain Diterima
                        </div>
 
                        <li className="nav-item">
                            <Link className="nav-link" to="/user/complained/listComplained">
                                <i className="fas fa-fw fa-list"></i>
                                <span>Daftar Komplain</span>
                            </Link>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link" data-toggle="collapse" data-target="#collapsePagesPenyelesaianKomplain" aria-expanded="true" aria-controls="collapsePagesPenyelesaianKomplain">

                                <i className="fas fa-fw fa-inbox"></i>
                                <span>Penyelesaian Komplain Diajukan</span>
                            </a>
                            <div id="collapsePagesPenyelesaianKomplain" className="collapse" aria-labelledby="headingPages" data-parent="#accordionSidebar">

                                <div className="bg-white py-2 collapse-inner rounded animated--fade-in">
                                    <h6 className="collapse-header">Penyelesaian Komplain</h6>
                                    <Link className="collapse-item" to="/user/complained/penugasan">Penugasan</Link>
                                    <Link className="collapse-item" to="/user/complained/done">Done</Link>
                                </div>
                            </div>
                        </li>
                        
                        <li className="nav-item"> 
                            <Link className="nav-link active" to="/user/complained/penyelesaian">
                                <i className="fas fa-fw fa-wrench"></i>
                            <span>Komplain Ditugaskan</span></Link>
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
                                    <Route path="/user/complain/add/">
                                        <UserAddComplain/>
                                    </Route> 
                                    <Route path="/user/complain/solved">
                                        <UserSolvedList/>
                                    </Route>
                                    <Route path="/user/complain/list">
                                        <UserListComplain/>
                                    </Route>
                                    <Route exact path="/user/complained/listcomplained">
                                        <UserListComplained/>
                                    </Route>
                                    <Route exact path="/user/complained/penyelesaian">
                                        <UserListPenyelesaianKomplain/>
                                    </Route>
                                    <Route exact path="/user/complained/penugasan/add/:no_komplain">
                                        <UserIsiPenugasan/>
                                    </Route>
                                    <Route exact path="/user/complained/penugasan">
                                        <UserListPenugasan/>
                                    </Route>
                                    <Route exact path="/user/complained/done">
                                        <UserListDoneKomplain/>
                                    </Route>
                                    <Route exact path="/user/dashboard">
                                        <UserDashboard/>
                                    </Route>
                                    <Route path="/user">
                                        <Redirect to="/user/dashboard"/>
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