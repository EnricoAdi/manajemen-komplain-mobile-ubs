const UserAddComplainPilihTopik = ()=>{  
    const history = useHistory();  
    const mainContext = useContext(MainContext);
    
    const routeContext = useContext(RouteContext);
    const path = history.location.pathname;
    const [isLoading,setisLoading] = useState(false); 
    let {divisiParam} = useParams();
    const [divisi,setDivisi] = useState({ 
        kode: divisiParam,
        nama: 'ACCOUNTING' 
    })
    const [topik,setTopik] = useState("");
    const [data, setData] = useState([
        {
            kode: 'CAR',
            topik: 'COST' 
        } 
    ]);  
    
    const moveToPilihSubTopik1 = ()=>{ 
        history.push(`/user/complain/add/pilihSubtopik1/${divisiParam}/${topik}`);
    }
    async function fetchTopik(){ 
        const res =  await PrivateClient.get('/User/Complain/Add/PilihTopik/index_get/'+divisiParam);    
        if(res.status){
          setisLoading(false) 
          setData(
              res.data.map((item)=>{
                  return {
                      kode: item.KODE_TOPIK, 
                      topik: item.TOPIK 
                  }
              }) 
          )
          setDivisi({
            kode: res.divisi.KODE_DIVISI,
            nama: res.divisi.NAMA_DIVISI,
          })
          return {
            kode: res.data[0].KODE_TOPIK,
            topik: res.data[0].TOPIK
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
    const onChangeTopik = (e)=>{
        setTopik(e.target.value)  
    } 
    useEffect(()=>{ 
        setisLoading(true)
        fetchTopik().then((res)=>{ 
            setTopik(res.kode)
        })
        
        routeContext.setRouteContext(path)  
    },[])
    return(
        <div> 
            <nav aria-label="breadcrumb">
            <ol className="breadcrumb" style={{backgroundColor:"#F1F2F5"}}>
                    <li className="breadcrumb-item"><Link to="/user/complain/add/pilihDivisi">Pilih Divisi</Link></li>
                    <li className="breadcrumb-item active">Pilih Topik</li>
                    <li className="breadcrumb-item">...</li>
                </ol>
            </nav>
            <PageTitle>Tambah Komplain Baru</PageTitle>
            <label className="form-label">Silahkan pilih topik yang mau dikomplain</label>
            <div className="row mt-4">  
                <div className="col"> 
                    <label htmlFor="divisi" className="form-label" >Divisi</label>
                    <input type="text" className="form-control mb-3" name="divisi" value={divisi.kode+" - "+divisi.nama} disabled/>  
                    <label htmlFor="topik" className="form-label" >Topik</label>
                    {isLoading &&<div className="mt-4"> 
                        <Loading color="primary"/>
                    </div> }
                    {!isLoading &&
                        <select className="form-control" name="topik" onChange={onChangeTopik}> 
                            {data.map((item,index)=>{
                            return <option value={item.kode} key={index} >{item.kode} - {item.topik}</option>
                            })}
                        </select>  
                    }
                </div>
            </div>
            <div className="row mt-4">
            
            <div className="col">
                    
                    <label htmlFor="subtopik1" className="form-label" >Subtopik 1</label>
                    <input type="text" className="form-control mb-3" name="subtopik1" disabled/> 
                    
                    <label htmlFor="subtopik2" className="form-label" >Subtopik 2</label>
                    <input type="text" className="form-control mb-3" name="subtopik1" disabled/>  
                    
            </div>
            </div>
            <div className="row mt-4">
                <div className="col">
                    <Button href="/user/complain/add/pilihDivisi" backgroundColor="danger" className="w-100">Sebelumnya</Button>  
                </div>  
                 
            </div> 
            <div className="row mt-2">
                <div className="col">
                    <Button onclick={moveToPilihSubTopik1} className="w-100" backgroundColor="primary">Berikutnya</Button>  
                </div>  
                 
            </div> 
        </div>
    )
}