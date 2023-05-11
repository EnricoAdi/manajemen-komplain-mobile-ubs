const TopbarProfile = (props)=>{

    const {user} = props; 
    const history = useHistory();   
    function confirmLogout(){
        let confirm = window.confirm("Apakah anda yakin ingin logout?");
        if(confirm){
            UserModel.logout();  
            history.push("/");
        }
    }
    return( 
        <ul className="navbar-nav ml-auto"> 
        <span className="  mt-4 d-lg-inline text-gray-600 small" style={{paddingTop:"3px"}}> {user.nama} </span>
            <div className="topbar-divider d-none d-sm-block"></div>
            {/*  Nav Item - User Information */}
            <li className="nav-item dropdown no-arrow" >
                <a className="nav-link dropdown-toggle" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
                    {/* <span className="mr-2 d-none d-lg-inline text-gray-600 small"> {user.nama} </span> */}
                    <img className="img-profile rounded-circle" src="./img/undraw_profile.svg"/>
                </a>
                {/*  Dropdown - User Information */}
               
                <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown" >
                    <div className="dropdown-item">
                        {user.nomor_induk} - {user.nama}
                    </div>
                    <div className="dropdown-item" >
                        {user.divisi}
                    </div>
                    <div className="dropdown-item" onClick={confirmLogout}>
                        <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                        Logout
                    </div>
                </div>
                 
            </li> 
    </ul>
 
    );
}  

