const UserDashboard = ()=>{ 
    const mainContext = useContext(MainContext); 
    const routeContext = useContext(RouteContext);
    const [isLoading,setisLoading] = useState(false); 
    
    const history = useHistory();  

    const path = history.location.pathname;
    const [data, setData] = useState(
        {
            jumlahKomplainTerkirim: 11,
            jumlahKomplainDiterimaByUser: 10,
            jumlahKomplainDikerjakanByUser: 8,
            jumlahKomplainDikerjakanByUser: 8,
            listKomplainOnGoingByUser : [],
            listKomplainDikirimBulanIniByUser : []
        } 
    ); 
    /**
     * Halaman ini digunakan untuk menampilkan semua data yang akan ditampilkan pada dashboard end user, yaitu antara lain jumlah komplain terkirim oleh user, jumlah komplain diterima oleh user, jumlah komplain dikerjakan oleh user, daftar komplain dikirim oleh user bulan ini, serta daftar komplain sedang diselesaikan oleh user, dengan mengirimkan parameter token autentikasi di bagian header request kepada endpoint API “user/dashboard/index_get”.
     */
    fetchComplain = async ()=>{ 
        const res =  await PrivateClient.get('/User/Dashboard/index_get');    
        if(res.status<300){
          setisLoading(false) 
          setData(res.data)
        }else{  
          UserModel.logout();  
          mainContext.setModalContext({
              open : true,
              message : "Sesi anda telah habis, silahkan login ulang"
          }) 
          history.push("/");
        }
      }
    useEffect(()=>{  
        setisLoading(true)
        fetchComplain()
        
        routeContext.setRouteContext(path)   
    },[]) 
    return(
        <div className="mb-4"> 
            <PageTitle>Dashboard User</PageTitle> 
            <Button icon="fas fa-fw fa-paper-plane mr-2" href="/user/complain/add/pilihDivisi" className="w-100">Ajukan Komplain </Button> 
            <div className="row mt-2">
                <div className="col mt-2">
                    <Card1 judul="Komplain Terkirim" isi={data.jumlahKomplainTerkirim} icon="fa-paper-plane" warna="primary"/> 
                </div> 
            </div>
            <div className="row mt-2"> 
                <div className="col mt-2">
                    <Card1 judul="Komplain Diterima" isi={data.jumlahKomplainDiterimaByUser} icon="fa-check" warna="primary"/>  
                </div> 
            </div>
            <div className="row mt-2">  
                <div className="col mt-2">
                    <Card1 judul="Komplain Sedang Ditangani" isi={data.jumlahKomplainDikerjakanByUser} icon="fa-clock" warna="primary"/>  
                </div>
            </div>
            
            <h4 className="h4 mt-4 text-gray-800 font-weight-bold">Komplain Dikirim Bulan Ini</h4>

                {data.listKomplainDikirimBulanIniByUser.length>4 && <Link to="/user/complain/list" className="text-primary">Lihat lainnya...</Link> }
                
                    {data.listKomplainDikirimBulanIniByUser.length < 1 &&  <Card1 judul="Belum Ada Komplain" isi="" icon="" warna="primary"/> }
                    {data.listKomplainDikirimBulanIniByUser.length > 0 && 
                        <div className="">
                            {data.listKomplainDikirimBulanIniByUser.map((item,index)=>{
                                if(index<4){
                                    
                                let color = "success"
                                if(item.STATUS == "OPEN"){
                                    color = "success"
                                }
                                else if(item.STATUS == "CLOSE"){
                                    color = "danger"
                                }
                                return <Link to={`/user/complain/detail/${item.NO_KOMPLAIN}`} key={index}>
                                            <div className='card shadow h-100 py-2 mr-3 mt-3 w-100' >
                                                <div className='card-body'>
                                                    <div className='row no-gutters align-items-center'>
                                                        <div className='col mr-2'>
                                                            <div className='text-xs font-weight-bold text-uppercase mb-1'>
                                                                Nomor : {item.NO_KOMPLAIN}</div>
                                                                <div className='text-xs font-weight-bold text-uppercase mb-1'>
                                                                    Status : <span className={"text-"+color}>{item.STATUS}</span> </div> 
                                                            <div className='h6 mt-3 font-weight-bold text-gray-800'>Topik : <br/>{item.NAMATOPIK} DIVISI {item.NAMADIVISI}</div>
                                                            <div className='text-xs font-weight-bold text-uppercase mt-4'>
                                                                Terbit : {item.TGL_TERBIT}</div>
                                                        </div> 
                                                    </div>
                                                </div>
                                            </div> 
                                        </Link>
                                }
                            })}
                        </div>
                        }
                   
            <h4 className="h4 mt-4 text-gray-800 font-weight-bold">Komplain Sedang Diselesaikan</h4>
            
            {data.listKomplainOnGoingByUser.length>4 && <Link to="/user/complained/penyelesaian" className="text-primary">Lihat lainnya...</Link> }

                    {data.listKomplainOnGoingByUser.length< 1 && <Card1 judul="Belum Ada Komplain" isi="" icon="" warna="primary"/>  }
                    {data.listKomplainOnGoingByUser.length > 0 && 
                        <div className=" mb-4">
                            {data.listKomplainOnGoingByUser.map((item,index)=>{
                                if(index<4){
                                    let progress = 20;
                                    if (item.T_KOREKTIF != null) {
                                        progress = 50;
                                        if (item.USER_DONE != null) {
                                            progress = 75;
                                            if (item.USER_VALIDASI != null) {
                                                progress = 100;
                                            }
                                            if (item.USER_CANCEL != null) {
                                                progress = 100;
                                            }
                                            if (item.USER_BANDING != null) {
                                                progress = 100;
                                            }
                                        }
                                    }
                                return <Link to={`/User/Complained/Penyelesaian/detail/${item.NO_KOMPLAIN}`} key={index}> 
                                            <div className='card shadow h-100 py-2 mr-3 mt-3 w-100'  >
                                                <div className='card-body'>
                                                    <div className='row no-gutters align-items-center'>
                                                        <div className='col mr-2'>
                                                            <div className='text-xs font-weight-bold text-uppercase mb-2 text-black'>
                                                                No : {item.NO_KOMPLAIN}</div>

                                                                <div className='text-xs font-weight-bold text-uppercase mb-1'>
                                                                Proses Penyelesaian</div>
                                                                <div className='progress progress-md mb-2 mt-3'>
                                                                    <div className='progress-bar' role='progressbar' style={{width: progress+"%"}}
                                                                        aria-valuenow={progress} aria-valuemin='0' aria-valuemax='100'>
                                                                        {progress}%</div>
                                                                </div>  
                                                            <div className='h6 mt-3 font-weight-bold text-gray-800'>Topik : <br/>{item.NAMATOPIK} DIVISI {item.NAMADIVISI}</div>
                                                            <div className='text-xs font-weight-bold text-uppercase mt-4'>
                                                                DITERBITKAN : {item.TGL_TERBIT}</div>
                                                        </div> 
                                                    </div>
                                                </div>
                                            </div>
                                </Link>
                                }
                              
                            })}

                        </div>
                    }
                    
        </div>
    )
}