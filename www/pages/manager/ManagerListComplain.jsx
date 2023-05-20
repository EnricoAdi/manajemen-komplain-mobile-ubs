const ManagerListComplain = ()=>{
    const mainContext = useContext(MainContext); 
    const routeContext = useContext(RouteContext);
    const [isLoading,setisLoading] = useState(false); 
    const [divisi, setDivisi] = useState("");
    const history = useHistory();  
    const [data, setData] = useState([
        { 
            no_komplain: "",
            tgl_komplain: "Deadline : ",
            topik: "",
            subtopik2: "",
            deskripsi_masalah: "",
            divisi: "Tujuan : " ,
            status: "OPEN"
        } 
    ]); 

    fetchComplain = async ()=>{ 
        const res =  await PrivateClient.get('/Manager/Fetch/index_get');    
        if(res.status<300){
          setisLoading(false)  
          setData(
              res.data.map((item)=>{
                  return {
                    no_komplain: item.NOMORKOMPLAIN,
                    tgl_komplain: "Deadline : "+item.DEADLINE,
                    topik: item.JUDUL,
                    subtopik2: item.S2DESKRIPSI,
                    deskripsi_masalah: "",
                    divisi: "Tujuan : "+item.DIVISITUJUAN,
                    status: item.STATUS 
                  }
              }) 
          )
        }else{  
          if(res.status == 401){
              mainContext.setModalContext({
                  open : true,
                  message : "Sesi anda telah habis, silahkan login ulang"
              }) 
              UserModel.logout();  
              history.push("/");
          } 
        }
      }
      async function moveToDetail(no_komplain){  
          history.push("/manager/complain/detail/"+no_komplain)
      }
    const path = history.location.pathname;
    
    useEffect(()=>{  
        setisLoading(true) 
        fetchComplain()
        routeContext.setRouteContext(path)   
        setDivisi(UserModel.get().divisi)
    },[]) 
    return(
        <>
            <PageTitle>Daftar Komplain Divisi {divisi}</PageTitle>
            {isLoading &&<div className="mt-4"> 
                <Loading color="primary"/>
            </div> }
            {!isLoading && data.map((item,index)=>{ 
                return <ComplainCard complain={item} key={index} onClick={()=>moveToDetail(item.no_komplain)}/>
            })}
            {!isLoading && data.length < 1  && <div className="mt-4">
            <Card1 judul="Belum Ada Komplain Diajukan" isi="" icon="" warna="primary"/>
            </div>}
        </>
    )
}