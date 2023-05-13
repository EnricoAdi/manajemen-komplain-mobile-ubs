const UserAddComplainPilihDivisi= ()=>{ 
    const history = useHistory();   
    const mainContext = useContext(MainContext);
    const routeContext = useContext(RouteContext);
    const path = history.location.pathname;
    const [isLoading,setisLoading] = useState(false); 
    const [data, setData] = useState([
        {
            kode: 'AC',
            nama: 'ACCOUNTING' 
        } 
    ]); 
    const [divisi,setDivisi] = useState("")

    const moveToPilihTopik = ()=>{ 
        history.push("/user/complain/add/pilihTopik/"+divisi);
    }
    async function fetchDivisi(){ 
        const res =  await PrivateClient.get('/User/Complain/Add/PilihDivisi/index_get');    
        if(res.status){
          setisLoading(false) 
          setData(
              res.data.map((item)=>{
                  return {
                      kode: item.KODE_DIVISI, 
                      nama: item.NAMA_DIVISI 
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
    const onChangeDivisi = (e)=>{
        setDivisi(e.target.value) 
    } 
    useEffect(()=>{ 
        setisLoading(true)
        fetchDivisi().then((res)=>setDivisi(data[0].kode))
        routeContext.setRouteContext(path)  
    },[])
    return(
        <div> 
        <nav aria-label="breadcrumb">
        <ol className="breadcrumb" style={{backgroundColor:"#F1F2F5"}}>
                <li className="breadcrumb-item active">Pilih Divisi</li>
                <li className="breadcrumb-item">...</li>
            </ol>
        </nav>
            <PageTitle>Tambah Komplain Baru</PageTitle> 
            <label className="form-label">Silahkan pilih divisi yang mau dikomplain</label> 
            <div className="row mt-4">  
                <div className="col">
                    <label className="form-label">Silahkan pilih divisi yang mau dikomplain</label>
                    {isLoading &&<div className="mt-4"> 
                        <Loading color="primary"/>
                    </div> }
                    {!isLoading && 
                        <select className="form-control" name="divisi" id="divisi" onChange={onChangeDivisi}> 
                            {data.map((item,index)=>{
                                return <option value={item.kode} key={index} >{item.kode} - {item.nama}</option>
                            })}
                        </select> 
                    }
                </div>
            </div>
            <div className="row mt-4">
                <div className="col">
                    <Button onclick={moveToPilihTopik} backgroundColor="primary" className="w-100">Berikutnya</Button> 
                </div>
            </div> 
        </div>
    )
}