const UserListDoneKomplain = ()=>{
    const mainContext = useContext(MainContext);
    const history = useHistory(); 
    const [isLoading,setisLoading] = useState(false); 
    const [data, setData] = useState([
        {
            no_komplain: '12314188',
            tgl_komplain: '12/01/2023', //tanggal kejadian
            topik: 'Penanganan kuranga tepat',
            subtopik2: 'Kurang bersih',
            deskripsi_masalah: 'deskripsi masalah',
            divisi : 'asd',
            status: 'aktif'
        },{
            no_komplain: '12314188',
            tgl_komplain: '12/01/2023', //tanggal kejadian
            topik: 'Penanganan kuranga tepat',
            subtopik2: 'Kurang bersih',
            deskripsi_masalah: 'deskripsi masalah',
            divisi : 'asd',
            status: 'aktif'
        },
    ]);
    fetchComplain = async ()=>{ 
        const res =  await PrivateClient.get('/User/Complained/Done/Fetch/index_get');    
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
                      status: item.STATUS
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
        history.push("/user/complained/done/detail/"+no_komplain)
    }
    useEffect(()=>{ 
        setisLoading(true)
        fetchComplain()
    },[]) 
    return(
        <div> 
            <PageTitle>Daftar Penyelesaian Komplain untuk Diselesaikan</PageTitle>
            <Button icon="fas fa-fw fa-list mr-2" href="/user/complained/listcomplained">Halaman Daftar Komplain Diterima</Button>
            <div> 
                {isLoading &&<div className="mt-4"> 
                    <Loading color="primary"/>
                </div> }
                {!isLoading && data.map((item,index)=>{ 
                    return <ComplainCard complain={item} key={index} onClick={()=>moveTo(item.no_komplain)}/>
                })}
                {!isLoading && data.length < 1  && <div className="mt-4">
                <Card1 judul="Belum Ada Komplain Untuk Diselesaikan" isi="" icon="" warna="primary"/>
                </div>}
            </div>
        </div>
    )
}