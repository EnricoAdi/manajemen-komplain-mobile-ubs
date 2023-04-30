const UserDashboard = ()=>{ 
    const mainContext = useContext(MainContext); 
    const [isLoading,setisLoading] = useState(false); 
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
    fetchComplain = async ()=>{ 
        const res =  await PrivateClient.get('/User/Dashboard/index_get');    
        if(res.status){
          setisLoading(false) 
          setData(
              res.data
          )
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
    },[]) 
    return(
        <div className="mb-4"> 
            <PageTitle>Dashboard User</PageTitle> 
            <Button icon="fas fa-fw fa-paper-plane mr-2" href="/user/complain/add/pilihDivisi">Ajukan Komplain </Button> 
            <div className="row mt-2">
                <div className="col mt-2">
                    <Card1 judul="Komplain Terkirim" isi={data.jumlahKomplainTerkirim} icon="fa-paper-plane" warna="primary"/> 
                </div>
                <div className="col mt-2">
                    <Card1 judul="Komplain Diterima" isi={data.jumlahKomplainDiterimaByUser} icon="fa-check" warna="primary"/>  
                </div>
                <div className="col mt-2">
                    <Card1 judul="Komplain Sedang Ditangani" isi={data.jumlahKomplainDikerjakanByUser} icon="fa-clock" warna="primary"/>  
                </div>
            </div>
            
            <h4 className="h4 mt-4 text-gray-800 font-weight-bold">Komplain Dikirim Bulan Ini</h4>
                    {data.listKomplainDikirimBulanIniByUser.length < 1 &&  <Card1 judul="Belum Ada Komplain" isi="" icon="" warna="primary"/> }
                    {data.listKomplainDikirimBulanIniByUser.length > 0 && 
                        <div className="d-flex flex-wrap align-items-start ">
                            {data.listKomplainDikirimBulanIniByUser.map((item,index)=>{
                                let color = "success"
                                if(item.STATUS == "OPEN"){
                                    color = "success"
                                }
                                else if(item.STATUS == "CLOSE"){
                                    color = "danger"
                                }
                                return <Link to={`/user/complain/detail/${item.NO_KOMPLAIN}`} key={index}>
                                            <div className='card shadow h-100 py-2 mr-3 mt-3' style={{width:"200px"}}>
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
                            })}
                        </div>
                        }
                   
            <h4 className="h4 mt-4 text-gray-800 font-weight-bold">Komplain Sedang Diselesaikan</h4>
                    {data.listKomplainOnGoingByUser.length< 1 && <Card1 judul="Belum Ada Komplain" isi="" icon="" warna="primary"/>  }
                    {data.listKomplainOnGoingByUser.length > 0 && 
                        <div className="d-flex flex-wrap align-items-start mb-4">
                            {data.listKomplainOnGoingByUser.map((item,index)=>{
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
                                return <Link to={`User/Complained/Penyelesaian/detail/${item.NO_KOMPLAIN}`} key={index}> 
                                            <div className='card shadow h-100 py-2 mr-3 mt-3' style={{width:"200px"}}>
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
                            })}

                        </div>
                    }
                    
        </div>
    )
}