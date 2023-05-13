
const UserAddComplainPilihSubtopik2 = ()=>{
    const history = useHistory();   
    const routeContext = useContext(RouteContext);
    const path = history.location.pathname;
    const [isLoading,setisLoading] = useState(false);  
    let {divisiParam,topikParam,subtopik1Param} = useParams(); 

    const [divisi,setDivisi] = useState({ 
        kode: divisiParam,
        nama: 'ACCOUNTING' 
    })
    const [topik,setTopik] = useState({
        kode: topikParam,
        topik : 'ACCOUNTING'
    });
    const [subtopik1,setSubtopik1] = useState({ 
        sub_topik1: subtopik1Param,
        deskripsi: 'ABCD' 
    });
    const [data, setData] = useState([
        {
            sub_topik2: '0001',
            deskripsi: 'ABCD' 
        } 
    ]);  
    //datenow
    const dateNow = new Date().toISOString().slice(0, 10)  
    //get 14 days before
    const minDate = new Date(new Date().setDate(new Date().getDate() - 14)).toISOString().slice(0, 10)
      

    const [subtopik2, setSubtopik2] = useState("0001");
    const [datePick, setDatePick] = useState(dateNow);

    async function fetchSubTopik2(){ 
        const res =  await PrivateClient.get(`/User/Complain/Add/PilihSubTopik2/index_get/${divisiParam}/${topikParam}/${subtopik1Param}`);    

        if(res.status){
          setisLoading(false) 
          setData(
              res.data.map((item)=>{
                  return {
                      sub_topik2: item.SUB_TOPIK2, 
                      deskripsi: item.S2DESKRIPSI 
                  }
              }) 
          )
          setDivisi({
            kode: res.divisi.KODE_DIVISI,
            nama: res.divisi.NAMA_DIVISI,
          })
          setTopik({
            kode: res.topik.KODE_TOPIK,
            topik: res.topik.TOPIK,
          })
          setSubtopik1({
            sub_topik1: res.subtopik1.SUB_TOPIK1,
            deskripsi: res.subtopik1.DESKRIPSI,
          })
          if(res.data.length > 0 ){ 
            return { 
                sub_topik2: res.data[0].SUB_TOPIK2, 
                deskripsi: res.data[0].S2DESKRIPSI 
            }
          }else{
            return { 
                sub_topik2: "", 
                deskripsi: "" 
            }
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
    const onChangeSubTopik2 = (e)=>{
        setSubtopik2(e.target.value)  
    } 
    const onChangeDatePick = (e)=>{
        setDatePick(e.target.value)
    }
    useEffect(()=>{ 
        setisLoading(true)
        fetchSubTopik2().then((res)=>{ 
            setSubtopik2(res.sub_topik2) 
        })
        
        routeContext.setRouteContext(path)  
    },[])
    const moveToPilihLampiran = ()=>{ 
        history.push(`/user/complain/add/pilihLampiran/${divisiParam}/${topikParam}/${subtopik1Param}/${subtopik2}/${datePick}`);
    }
    return(
        <div> 
        <nav aria-label="breadcrumb">
        <ol className="breadcrumb" style={{backgroundColor:"#F1F2F5"}}>
                <li className="breadcrumb-item"><Link to="/user/complain/add/pilihDivisi">Pilih Divisi</Link></li>
                <li className="breadcrumb-item"><Link to={`/user/complain/add/pilihTopik/${divisiParam}`}>Pilih Topik</Link></li>
                <li className="breadcrumb-item"><Link to={`/user/complain/add/pilihSubtopik1/${divisiParam}/${topikParam}`}>Pilih Subtopik1</Link></li> 
                <li className="breadcrumb-item active">Pilih Subtopik2</li>
                <li className="breadcrumb-item">...</li>
            </ol>
        </nav>
            <PageTitle>Tambah Komplain Baru</PageTitle>
            <label className="form-label">Silahkan pilih subtopik2 yang mau dikomplain</label>
            <div className="row mt-4">  
                <div className="col"> 
                    <label htmlFor="divisi" className="form-label" >Divisi</label>
                    <input type="text" className="form-control mb-3" name="divisi" value={divisi.kode+" - "+divisi.nama} disabled/>  
                    <label htmlFor="topik" className="form-label" >Topik</label>
                    <input type="text" className="form-control mb-3" name="topik" value={topik.kode+" - "+topik.topik} disabled/>  
                </div>
            </div>
            <div className="row">
                <div className="col"> 
                    <label htmlFor="subtopik1" className="form-label" >Subtopik 1</label>
                    <input type="text" className="form-control mb-3" name="subtopik1" value={subtopik1.sub_topik1+" - "+subtopik1.deskripsi} disabled/>  
 
                        <label htmlFor="subtopik2" className="form-label" >Subtopik 2</label>
                        
                        {isLoading &&<div className="mt-4"> 
                            <Loading color="primary"/>
                        </div> }
                        {!isLoading && 
                            <select className="form-control" name="subtopik2" onChange={onChangeSubTopik2}>  
                                    {data.map((item,index)=>{
                                        return <option value={item.sub_topik2} key={index} >{item.sub_topik2} - {item.deskripsi}</option>
                                    })} 
                            </select>  
                        }  
              
                </div> 
            </div>
            <div className="row mt-4"> 
                <div className="col">  
                        <label htmlFor="tanggal" className="form-label">Tanggal</label>
                        <input type="date" name="tanggal" id="tanggal" className="form-control mb-3" min={minDate} onChange={onChangeDatePick} defaultValue={dateNow}/>
                </div>
            </div>
            <div className="row mt-4">
                <div className="col">
                    <Button href={`/user/complain/add/pilihSubtopik1/${divisiParam}/${topikParam}`} backgroundColor="danger" className="w-100">Sebelumnya</Button>  
                </div>
            </div>
            <div className="row mt-2">
                <div className="col"> 
                    <Button onclick={moveToPilihLampiran} className="w-100">Berikutnya</Button> 
                </div>
            </div>
        </div>
    )
}