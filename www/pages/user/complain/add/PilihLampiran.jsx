 
const UserAddComplainPilihLampiran = ()=>{
    const history = useHistory();  
    const mainContext = useContext(MainContext);
    const routeContext = useContext(RouteContext);
    const path = history.location.pathname;
    const [isLoading,setisLoading] = useState(false);    
    let {divisiParam,topikParam,subtopik1Param,subtopik2Param,tanggalParam} = useParams();
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
    const [subtopik2, setSubtopik2] = useState(
        {
            sub_topik2: subtopik2Param,
            deskripsi: 'ABCD' 
        } 
    ); 
    
    const [fileList, setFileList] = useState([])
    const handleFileChange = (e)=>{
        setFileList(e.target.files) 
    }

    const [deskripsi, setDeskripsi] = useState("")
    const changeDeskripsi = (e)=>{
        setDeskripsi(e.target.value) 
    } 

    async function sendComplain(){ 
        if(deskripsi==""){ 
            mainContext.setModalContext({
                open : true,
                message : "Semua input harus diisi"
            }) 
            return;
        }
        setisLoading(true)
        const formData = new FormData();
        formData.append("deskripsi",deskripsi) 
        if(fileList.length<1){ 
            formData.append("lampiran[]",null)
        }
        else if(fileList.length>0){ 
            for (let i = 0; i < fileList.length; i++) {
                const file = fileList[i]; 
                formData.append(`lampiran[]`,file) 
            }
        } 
        const result =  await PrivateClient.post_file(`/User/Complain/Add/SendComplain/index_post/${divisiParam}/${topikParam}/${subtopik1Param}/${subtopik2Param}/${tanggalParam}`,formData);    
 
        mainContext.setModalContext({
            open : true,
            message : result.message
        }) 
        if(result.status < 300){  
            history.push("/user/complain/list")
        }else{ 
            setisLoading(false)
        } 
    }
    async function fetchData(){ 
        const res =  await PrivateClient.get(`/User/Complain/Add/PilihLampiran/index_get/${divisiParam}/${topikParam}/${subtopik1Param}/${subtopik2Param}`);    

        if(res.status){  
          setSubtopik2(
            {
                sub_topik2: res.subtopik2.SUB_TOPIK2, 
                deskripsi: res.subtopik2.DESKRIPSI 
            } 
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
        setisLoading(false)
        fetchData()
        routeContext.setRouteContext(path)  
    },[])
    return(
        <div className="mb-2"> 
            <nav aria-label="breadcrumb">
            <ol className="breadcrumb" style={{backgroundColor:"#F1F2F5"}}>
                    <li className="breadcrumb-item"><Link to="/user/complain/add/pilihDivisi">Pilih Divisi</Link></li>
                    <li className="breadcrumb-item"><Link to={`/user/complain/add/pilihTopik/${divisiParam}`}>Pilih Topik</Link></li>
                    <li className="breadcrumb-item"><Link to={`/user/complain/add/pilihSubtopik1/${divisiParam}/${topikParam}`}>Pilih Subtopik1</Link></li>
                    <li className="breadcrumb-item"><Link to={`/user/complain/add/pilihSubtopik2/${divisiParam}/${topikParam}/${subtopik1Param}`}>Pilih Subtopik2</Link></li>
                    <li className="breadcrumb-item active">Pilih Lampiran</li>
                    <li className="breadcrumb-item">...</li>
                </ol>
            </nav>
            
            <PageTitle>Tambah Komplain Baru</PageTitle>
            
            <div className="row">
                <div className="col">
                    <label className="form-label">Tanggal</label>
                    <input type="date" className="form-control" name="tanggal" value={tanggalParam} disabled/>
                </div>
            </div>
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
                    <input type="text" className="form-control mb-3" name="subtopik2" value={subtopik2.sub_topik2+" - "+subtopik2.deskripsi} disabled/>   
                </div>
            </div>
            <div className="row mt-2">
                <div className="col">
                <label className="form-label">Unggah Lampiran (.jpg, .png, .pdf, .docx, .xlsx, .txt)</label>
                <input type="file" className="form-control" name="lampiran[]" style={{paddingTop:"30px", paddingLeft:"20px", height:"100px"}}  accept=".jpg,.png,.pdf,.docx,.xls,.xlsx,.txt" multiple onChange={handleFileChange}/></div> 
            </div>
            <div className="row mt-4">
                <div className="col"> 
                    <label className="form-label">Deskripsi Masalah</label>
                    <textarea name="deskripsi" className="form-control" cols="30" rows="3" onChange={changeDeskripsi} required></textarea>
                </div>
            </div>
            
                     
                    {isLoading &&
                    <>
                        <div className="row mt-4">
                            <div className="col">
                                <Button backgroundColor="danger" className="w-100">Sebelumnya</Button> 
                            </div>
                        </div> 
                        <div className="row mt-2">
                            <div className="col">
                                <Button className="w-100"> <Loading color="white"/></Button>
                            </div>
                        </div>  
                    </> 
                     }
                    {!isLoading &&
                    <> 
                        <div className="row mt-4">
                            <div className="col">
                                    <Button href={`/user/complain/add/pilihSubtopik2/${divisiParam}/${topikParam}/${subtopik1Param}`} backgroundColor="danger" className="w-100">Sebelumnya</Button>  
                            </div>
                        </div>
                        <div className="row mt-2">
                            <div className="col">  
                                <Button type="submit" className="w-100" icon="fas fa-fw fa-paper-plane mr-2" onclick={sendComplain}>Kirim</Button>
                            </div>
                        </div>
                    </>  }

        </div>
    )
}