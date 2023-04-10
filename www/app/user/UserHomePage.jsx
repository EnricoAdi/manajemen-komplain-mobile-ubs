const UserHomePage = ()=>{ 
    const [collapsePagePengajuan,setCollapsePagePengajuan] = useState("collapse");
    const [collapsePagesPenyelesaianKomplain,setCollapsePagesPenyelesaianKomplain] = useState("collapse");
    const [sidebarClass,setSidebarClass] = useState("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion");
     
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

    const togglePengajuan = ()=>{
        if(collapsePagePengajuan=="collapse"){
            setCollapsePagePengajuan("collapse show") 
        }else{
            setCollapsePagePengajuan("collapse") 
        }
    }
    const togglePenyelesaianKomplain = ()=>{
        if( collapsePagesPenyelesaianKomplain=="collapse"){
            setCollapsePagesPenyelesaianKomplain("collapse show")
        }else{
            setCollapsePagesPenyelesaianKomplain("collapse")
        }
    }
    // const setActive = ()=>{
    //     else if(path[2]=="complain"){ 
    //         if(path[3]=="list" || path[3]=="add"){
    //             setActiveState({
    //                 dashboard:" nav-item",
    //                 pengajuan:"nav-item active",
    //                 penyelesaian_komplain_diterima:"nav-item",
    //                 daftar_komplain:"nav-item",
    //                 penyelesaian_komplain_diajukan:"nav-item",
    //                 komplain_ditugaskan:"nav-item",
    //             }); 
    //         }else{
    //             setActiveState({
    //                 dashboard:" nav-item",
    //                 pengajuan:"nav-item",
    //                 penyelesaian_komplain_diterima:"nav-item active",
    //                 daftar_komplain:"nav-item",
    //                 penyelesaian_komplain_diajukan:"nav-item",
    //                 komplain_ditugaskan:"nav-item",
    //             }); 
    //         }
    //     }else if(path[2]=="complained"){ 
    //         if(path[3]=="listcomplained"){ 
    //             setActiveState({ 
    //                 dashboard:" nav-item",
    //                 pengajuan:"nav-item",
    //                 penyelesaian_komplain_diterima:"nav-item",
    //                 daftar_komplain:"nav-item active",
    //                 penyelesaian_komplain_diajukan:"nav-item",
    //                 komplain_ditugaskan:"nav-item",
    //             });
    //         }else if(path[3]=="penyelesaian"){
    //             setActiveState({ 
    //                 dashboard:" nav-item",
    //                 pengajuan:"nav-item",
    //                 penyelesaian_komplain_diterima:"nav-item",
    //                 daftar_komplain:"nav-item",
    //                 penyelesaian_komplain_diajukan:"nav-item",
    //                 komplain_ditugaskan:"nav-item active",
    //             });
    //         }else{
    //             setActiveState({ 
    //                 dashboard:" nav-item",
    //                 pengajuan:"nav-item",
    //                 penyelesaian_komplain_diterima:"nav-item",
    //                 daftar_komplain:"nav-item",
    //                 penyelesaian_komplain_diajukan:"nav-item active",
    //                 komplain_ditugaskan:"nav-item",
    //             });
    //         }
    //     }
        
    // }
    // useEffect(()=>{
    //     setActive();
    // },[activeState]);
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
 
                        <ListLink equal="/user/dashboard">
                            <Link className="nav-link" to="/user/dashboard">
                                <i className="fas fa-fw fa-tachometer-alt"></i>
                                <span>Dashboard</span>
                            </Link>
                        </ListLink>

                        {/*  Divider */}
                        <hr className="sidebar-divider"/>

                        {/*  Heading */}
                        <div className="sidebar-heading">
                            Komplain Diajukan
                        </div>
                        <ListLink equal="/user/complain/list">
                            <a className="nav-link" data-toggle="collapse" onClick={togglePengajuan}>

                                <i className="fas fa-fw fa-paper-plane"></i>
                                <span>Ajukan Komplain</span>
                            </a>
                            <div id="collapsePagesPengajuan" className={collapsePagePengajuan} aria-labelledby="headingPages" data-parent="#accordionSidebar">

                                <div className="bg-white py-2 collapse-inner rounded">
                                    <h6 className="collapse-header">Pengajuan Komplain</h6>
                                    <Link className="collapse-item" to="/user/complain/list">Daftar Komplain</Link>
                                    <Link className="collapse-item" to="/user/complain/add/page/1">Tambah Komplain</Link>
                                </div>
                            </div>
                        </ListLink> 
                        
                        <ListLink equal="/user/complain/solved">
                            <Link className="nav-link" to="/user/complain/solved">
                            <i className="fas fa-fw fa-envelope-open"></i>
                                <span>Penyelesaian Komplain Diterima</span>
                            </Link>
                        </ListLink>
                        {/*  Divider */}
                        <hr className="sidebar-divider"/>

                        {/*  Heading */}
                        <div className="sidebar-heading">
                            Komplain Diterima
                        </div>
 
                        <ListLink equal="/user/complained/listComplained">
                            <Link className="nav-link" to="/user/complained/listComplained">
                                <i className="fas fa-fw fa-list"></i>
                                <span>Daftar Komplain</span>
                            </Link>
                        </ListLink>

                        <ListLink equal="/user/complained/penugasan">
                            <a className="nav-link" onClick={togglePenyelesaianKomplain} data-toggle="collapse" >

                                <i className="fas fa-fw fa-inbox"></i>
                                <span>Penyelesaian Komplain Diajukan</span>
                            </a>
                            <div id="collapsePagesPenyelesaianKomplain" className={collapsePagesPenyelesaianKomplain}aria-labelledby="headingPages" data-parent="#accordionSidebar">

                                <div className="bg-white py-2 collapse-inner rounded">
                                    <h6 className="collapse-header">Penyelesaian Komplain</h6>
                                    <Link className="collapse-item" to="/user/complained/penugasan">Penugasan</Link>
                                    <Link className="collapse-item" to="/user/complained/done">Done</Link>
                                </div>
                            </div>
                        </ListLink>
                        
                        <ListLink equal="/user/complained/penyelesaian"> 
                            <Link className="nav-link" to="/user/complained/penyelesaian">
                                <i className="fas fa-fw fa-wrench"></i>
                            <span>Komplain Ditugaskan</span></Link>
                        </ListLink>
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
                                <button onClick={toggleSidebar} className="btn btn-link d-md-none rounded-circle mr-3">
                                    <i className="fa fa-bars"></i>
                                </button>

                                <TopbarProfile/>

                            </nav>
                            {/*  End of Topbar */}

                            {/*  Begin Page Content */} 
                            <div className="container-fluid"> 
                                <Switch>  
                                    <Route path="/user/complain/add/page/:num">
                                        <div>halaman 1</div>
                                    </Route> 
                                    <Route path="/user/complain/solved">
                                        <div>solved</div>
                                    </Route>
                                    <Route path="/user/complain/list">
                                        <div>halaman Daftar</div>
                                    </Route>
                                    <Route exact path="/user/complained/listcomplained">
                                        <div>halaman Selesai</div>
                                    </Route>
                                    <Route exact path="/user/complained/penyelesaian">
                                        <div>halaman Penyelesaian</div>
                                    </Route>
                                    <Route exact path="/user/complained/penugasan">
                                        <div>halaman Penugasan</div>
                                    </Route>
                                    <Route exact path="/user/complained/done">
                                        <div>halaman done</div>
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