 
const AdminHomePage = () => {
    let logedIn = UserModel.get();
    
    return(
        <div id="wrapper">
 
        <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
 
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
                <a className="nav-link" href="<?= base_url(); ?>Admin/Dashboard" data-toggle="collapse" data-target="#collapsePages" aria-expanded="true" aria-controls="collapsePages">

                    <i className="fas fa-fw fa-book"></i>
                    <span>Master</span>
                </a>
                <div id="collapsePages" className="collapse" aria-labelledby="headingPages" data-parent="#accordionSidebar">

                    <div className="bg-white py-2 collapse-inner rounded">
                        <h6 className="collapse-header">Menu Master :</h6>
                        <a className="collapse-item" href="<?= base_url(); ?>Admin/Master/Topik/Menu">Master Topik</a>
                        <a className="collapse-item" href="<?= base_url(); ?>Admin/Master/User">Master User</a>
                        <a className="collapse-item" href="<?= base_url(); ?>Admin/Master/Email">Master Email</a>
                    </div>
                </div>
            </li>
            <li className="nav-item active">
                <a className="nav-link" href="<?= base_url(); ?>Admin/Dashboard" data-toggle="collapse" data-target="#collapsePagesLaporan" aria-expanded="true" aria-controls="collapsePagesLaporan">

                    <i className="fas fa-fw fa-file"></i>
                    <span>Laporan</span>
                </a>
                <div id="collapsePagesLaporan" className="collapse" aria-labelledby="headingPages" data-parent="#accordionSidebar">

                    <div className="bg-white py-2 collapse-inner rounded">
                        <h6 className="collapse-header">Laporan :</h6>
                        <a className="collapse-item" href="<?= base_url(); ?>Admin/Laporan/JumlahKomplain">Laporan Jumlah Komplain</a>
                        <a className="collapse-item" href="<?= base_url(); ?>Admin/Laporan/DetailFeedback">Laporan Detail Feedback</a>
                        <a className="collapse-item" href="<?= base_url(); ?>Admin/Laporan/PerTopik">Laporan Per Topik</a>
                    </div>
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
 
                    <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
                        <i className="fa fa-bars"></i>
                    </button>
 
                    
                    
                    <TopbarProfile/>

                </nav> 
                <div className="container-fluid">
                </div> 
				
            </div> 
 

        </div> 

    </div>
    )
}