
 
const UserAddComplainPilihSubtopik1 = ()=>{
    const history = useHistory();  
    let {divisiParam,topikParam} = useParams();
    const mainContext = useContext(MainContext);
    const [isLoading,setisLoading] = useState(false); 

    const [divisi,setDivisi] = useState({ 
        kode: divisiParam,
        nama: 'ACCOUNTING' 
    })
    const [topik,setTopik] = useState({
        kode: topikParam,
        topik : 'ACCOUNTING'
    });
    const [data, setData] = useState([
        {
            sub_topik1: '0001',
            deskripsi: 'ABCD' 
        } 
    ]);  
    const [subtopik1,setSubtopik1] = useState("0001")

    const moveToPilihSubTopik2 = ()=>{ 
        history.push(`/user/complain/add/pilihSubtopik2/${divisiParam}/${topikParam}/${subtopik1}`);
    }
    async function fetchSubTopik1(){ 
        const res =  await PrivateClient.get(`/User/Complain/Add/PilihSubTopik1/index_get/${divisiParam}/${topikParam}`);    

        if(res.status){
          setisLoading(false) 
          setData(
              res.data.map((item)=>{
                  return {
                      sub_topik1: item.SUB_TOPIK1, 
                      deskripsi: item.DESKRIPSI 
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
          if(res.data.length > 0 ){ 
            return { 
                sub_topik1: res.data[0].SUB_TOPIK1, 
                deskripsi: res.data[0].DESKRIPSI 
            }
          }else{
            return { 
                sub_topik1: "", 
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
    const onChangeSubTopik1 = (e)=>{
        setSubtopik1(e.target.value)  
    } 
    useEffect(()=>{ 
        setisLoading(true)
        fetchSubTopik1().then((res)=>{ 
            setSubtopik1(res.sub_topik1) 
        })
    },[])
    return(
        <div> 
            <nav aria-label="breadcrumb">
            <ol className="breadcrumb" style={{backgroundColor:"#F1F2F5"}}>
                    <li className="breadcrumb-item"><Link to="/user/complain/add/pilihDivisi">Pilih Divisi</Link></li>
                    <li className="breadcrumb-item"><Link to={`/user/complain/add/pilihTopik/${divisiParam}`}>Pilih Topik</Link></li>
                    <li className="breadcrumb-item active">Pilih Subtopik1</li>
                    <li className="breadcrumb-item">...</li>
                </ol>
            </nav>
            <PageTitle>Tambah Komplain Baru</PageTitle>
            <label className="form-label">Silahkan pilih subtopik1 yang mau dikomplain</label> 
            <div className="row mt-4">  
                <div className="col"> 
                    <label htmlFor="divisi" className="form-label" >Divisi</label>
                    <input type="text" className="form-control mb-3" name="divisi" value={divisiParam+ " - "+divisi.nama} disabled/>  
                    <label htmlFor="topik" className="form-label" >Topik</label>
                    <input type="text" className="form-control mb-3" name="topik"  value={topikParam+ " - "+topik.topik} disabled/>  
                </div>
            </div>
            <div className="row">
                <div className="col"> 
                    <label htmlFor="subtopik1" className="form-label" >Subtopik 1</label>
                    
                    {isLoading &&<div className="mt-4"> 
                        <Loading color="primary"/>
                    </div> }
                    {!isLoading && 
                    <select className="form-control" name="subtopik1" onChange={onChangeSubTopik1}> 
                    {data.map((item,index)=>{
                        return <option value={item.sub_topik1} key={index} >{item.sub_topik1} - {item.deskripsi}</option>
                    })} 
                    </select> }

                    
                     
                </div>
                <div className="col"></div>
            </div>
            <div className="row mt-4">
                <div className="col">
                    <Button href={`/user/complain/add/pilihTopik/${divisiParam}`} backgroundColor="danger">Sebelumnya</Button> 
                    <Button onclick={moveToPilihSubTopik2} className="ml-2" backgroundColor="primary">Berikutnya</Button> 
                </div>
            </div> 
        </div>
    )
}