const TopbarProfile = ()=>{ 
    const history = useHistory(); 
    // console.log(UserModel.get());
    const [clicked,setClicked] = useState(false); 
    const user = UserModel.get(); 
    function clickProfile(){ 
        setClicked(!clicked);
    }
    function confirmLogout(){
        let confirm = window.confirm("Apakah anda yakin ingin logout?");
        if(confirm){
            UserModel.logout(); 
            // alert('Berhasil logout')
            history.push("/");
        }
    }
    return( 
        <ul className="navbar-nav ml-auto" onClick={clickProfile}>
            <div className="topbar-divider d-none d-sm-block"></div>
            {/*  Nav Item - User Information */}
            <div className="nav-item dropdown no-arrow" >
                <div className="nav-link dropdown-toggle" id="userDropdown"  >
                    <span className="mr-2 d-none d-lg-inline text-gray-600 small"> {user.nama} </span>
                    <img className="img-profile rounded-circle" src="./img/undraw_profile.svg"/>
                </div>
                {/*  Dropdown - User Information */}
                {clicked && 
                <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in show"  >
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
                </div>} 
                 
            </div> 
    </ul>

   
    );
}  