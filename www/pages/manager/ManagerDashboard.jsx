const ManagerDashboard = ()=>{
    const mainContext = useContext(MainContext); 
    const routeContext = useContext(RouteContext);
    const [isLoading,setisLoading] = useState(false); 
    
    const history = useHistory();  

    const path = history.location.pathname;
    const [data, setData] = useState(
        {
            komplainUrgent: [],
            komplainTerkirim: [],
            komplainDiterima: [],
            divisi: "IT"
        } 
    ); 
    const [jumlahKomplainTerkirim, setJumlahKomplainTerkirim] = useState("1");
    const [komplainDiterima2, setKomplainDiterima2] = useState("3");
    fetchComplain = async ()=>{ 
        const res =  await PrivateClient.get('/manager/Dashboard/index_get');    
        if(res.status<300){
          setisLoading(false) 
          setData(res.data) 

          if(res.data.komplainTerkirim && res.data.komplainTerkirim != "Belum ada")
          { 
            setJumlahKomplainTerkirim(res.data.komplainTerkirim[0].JUMLAH)
          }else{
            setJumlahKomplainTerkirim("<H1> Belum ada komplain terkirim </H1>")
          }

          
          if (res.data.komplainDiterima && res.data.komplainDiterima != "Belum ada") {
             setKomplainDiterima2(res.data.komplainDiterima[0].JUMLAH)
            }
            else {
                setKomplainDiterima2("<H1>Belum ada komplain diterima</H1>")
            }
          
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
        <>
            <PageTitle>Dashboard manager</PageTitle>
            {!isLoading && <>  
                <div className="card shadow mb-4 mt-4">
                    <div className="card-header py-3">
                        <h6 className="m-0 font-weight-bold text-primary">Komplain Belum Diselesaikan Seluruh Divisi </h6>
                    </div>
                    
                    <div className="card-body">
                        <div className="row"> 
                            {data.komplainUrgent && data.komplainUrgent != "Belum ada" &&
                                        data.komplainUrgent.map((komplainUrgent,index)=>(
                                            <div className="col" style={{width:"200px"}}>
                                                <div className="card mb-4 mt-4">
                                                    <div className='card-header py-3'>
                                                        <h6 className='m-0 font-weight-bold text-primary'>No. Komplain :    {komplainUrgent.NOMORKOMPLAIN}</h6>
                                                    </div>
                                                    <div className='card-body'>
                                                    <h6 className='m-0 font-weight-normal text-primary'>Status : ".{komplainUrgent.STATUS}</h6>
                                                    <h6 className='m-0 font-weight-normal text-primary'>Topik : ".{komplainUrgent.JUDUL}</h6>

                                                    <h6 className='m-0 font-weight-normal text-primary'>Deadline : ".{komplainUrgent.DEADLINE}</h6>

                                                    <h6 className='m-0 font-weight-normal text-primary'>Sisa Waktu : ".{komplainUrgent.SISAWAKTU}</h6>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}  
                                {data.komplainUrgent == "Belum ada" && 
                                    <div className='col'>
                                            <div className="card-body">
                                                <h6 className='m-0 font-weight-normal text-primary'>Komplain urgent tidak tersedia</h6>
                                            </div>
                                    </div>
                                } 
                                

                        </div>
                        
                    </div>
                </div>
 
  
                <div className="row mt-2">
                    <div className="col mt-2" style={{height:"100px"}}> 
                        <Card1 judul="Daftar Komplain Terkirim dari semua divisi selama 90 hari terakhir" isi={jumlahKomplainTerkirim} icon="fa-paper-plane" warna="primary"/>   
                    </div>
                    <div className="col mt-2" style={{height:"100px"}}>
                        <Card1 judul="Daftar Komplain Diterima untuk semua divisi selama 90 hari terakhir" isi={komplainDiterima2} icon="fa-check" warna="primary"/>  
                    </div>
                </div>
            </>}

        </>
    )
}