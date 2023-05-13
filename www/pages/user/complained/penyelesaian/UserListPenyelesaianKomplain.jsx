const UserListPenyelesaianKomplain = ()=>{
    const mainContext = useContext(MainContext);
    const [isLoading,setisLoading] = useState(false);
    const history = useHistory(); 
    const routeContext = useContext(RouteContext);
    const path = history.location.pathname;
    const [data, setData] = useState([
        {
            no_komplain: '12314188',
            tgl_komplain: '12/01/2023', //tanggal kejadian
            topik: 'Penanganan kuranga tepat',
            subtopik2: 'Kurang bersih',
            deskripsi_masalah: 'deskripsi masalah',
            divisi : 'asd',
            status: 'aktif',
            penugasan : '',
            T_KOREKTIF : ""
        } 
    ]);
    fetchComplain = async ()=>{ 
        const res =  await PrivateClient.get('/User/Complained/Penyelesaian/Fetch/index_get');    
        if(res.status){
          setisLoading(false) 
          setData(
              res.data.map((item)=>{
                  return {
                      no_komplain: item.NO_KOMPLAIN,
                      tgl_komplain: "Tanggal Kejadian : "+item.TGL_KEJADIAN,
                      topik: item.TOPIK,
                      subtopik2: item.SUB_TOPIK2,
                      deskripsi_masalah: item.DESKRIPSI_MASALAH,
                      divisi: "Pengirim : "+item.DIVISI_PENGIRIM,
                      status: item.STATUS, 
                      penugasan : item.PENUGASAN,
                      T_KOREKTIF : item.T_KOREKTIF
                  }
              }) 
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
    moveTo = (no_komplain)=>{
        history.push("/user/complained/penyelesaian/detail/"+no_komplain)
    }
    useEffect(()=>{ 
        setisLoading(true)
        fetchComplain()
        
        routeContext.setRouteContext(path)  
    },[]) 
    return(
        <div> 
            <PageTitle>Daftar Komplain Ditugaskan</PageTitle>
            {/*  icon="fas fa-fw fa-list mr-2" */}
            <Button href="/user/complained/listcomplained" className="w-100">Halaman Daftar Komplain Diterima</Button>
            <div> 
                {isLoading &&<div className="mt-4"> 
                    <Loading color="primary"/>
                </div> }
                {!isLoading && data.map((item,index)=>{ 
                    return <ComplainCard complain={item} key={index} onClick={()=>moveTo(item.no_komplain)} backgroundColor={item.T_KOREKTIF?"success":"primary"}/>
                })}
                {!isLoading && data.length < 1  && <div className="mt-4">
                <Card1 judul="Belum Ada Komplain Diterima" isi="" icon="" warna="primary"/>
                </div>}
            </div>
        </div>
    )
}