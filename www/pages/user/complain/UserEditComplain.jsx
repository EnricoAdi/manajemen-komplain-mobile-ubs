/**
 * 
 * Halaman ini ini digunakan untuk melakukan perubahan pada data komplain berdasarkan parameter nomor komplain yang dikirim oleh user. Untuk halaman ini sendiri akan mengirimkan parameter form data berupa tanggal, deskripsi, dan lampiran dari komplain kepada API. HTTP Request akan dijalankan dengan menggunakan function Private Client, sehingga Autentikasi juga dikirim dengan parameter token autentikasi di bagian header request, kepada endpoint API user/complain/detail/index/index_post/:nomor_komplain.
 */
const UserEditComplain = ()=>{
    const mainContext = useContext(MainContext);
    const history = useHistory();
    const routeContext = useContext(RouteContext);
    const path = history.location.pathname;

    const [isLoading,setisLoading] = useState(false);  
    const [isLoadingSubmit,setisLoadingSubmit] = useState(false); 
    const [showingLampiran,setShowingLampiran] = useState("");  
    const {no_komplain} = useParams(); 
    const [komplain, setKomplain] = useState(
        { 
            NO_KOMPLAIN : "",
            nama_divisi_penerbit : "",
            nama_penerbit : "",
            LAMPIRAN : [''],
            FEEDBACK : {}
        } 
    ); 
    const [tanggal,setTanggal] = useState("")
    const [deskripsi,setDeskripsi] = useState("")
     
    const [fileList, setFileList] = useState([])
    const handleFileChange = (e)=>{
        setFileList(e.target.files)  
    }

    const minDate = new Date(new Date().setDate(new Date().getDate() - 14)).toISOString().slice(0, 10)

    async function fetchComplain(){ 
        const res =  await PrivateClient.get('/User/Complained/Penyelesaian/Detail/index_get/'+no_komplain);    
          if(res.status){
            setisLoading(false) 
            setKomplain({
                ...res.data,
                nama_divisi_penerbit : res.data.PENERBIT.NAMA,
                nama_penerbit : res.data.DATA_PENERBIT.NAMA,
                LAMPIRAN : res.data.LAMPIRAN,
                FEEDBACK : res.data.FEEDBACK,
                TGL_KEJADIAN : new Date(res.data.TGL_KEJADIAN).toISOString().split("T")[0] 
            })   
            setTanggal(new Date(res.data.TGL_KEJADIAN).toISOString().split("T")[0] )
            setDeskripsi(res.data.DESKRIPSI_MASALAH)
        } 
    }
    async function editComplain(){
        if(deskripsi==""||tanggal==""){ 
            mainContext.setModalContext({
                open : true,
                message : "Semua input harus diisi"
            }) 
            return;
        }
        
        setisLoadingSubmit(true)
        const formData = new FormData();
        formData.append("deskripsi",deskripsi) 
        formData.append("tanggal",tanggal)  
        if(fileList.length<1){ 
            formData.append("lampiran[]",null)
        }
        else if(fileList.length>0){ 
            for (let i = 0; i < fileList.length; i++) {
                const file = fileList[i]; 
                formData.append(`lampiran[]`,file) 
            }
        } 
        
        const result =  await PrivateClient.post_file(`/User/Complain/Detail/Index/index_post/${no_komplain}`,formData);    
 
        mainContext.setModalContext({
            open : true,
            message : result.message
        }) 
        if(result.status < 300){  
            history.push("/user/complain/detail/"+no_komplain) 
        }else{ 
            setisLoadingSubmit(false)
        } 
    }
    useEffect(()=>{ 
        setisLoading(true)
        fetchComplain() 
        routeContext.setRouteContext(path)  
    },[])
    return(
        <>   
            {showingLampiran=="" && !isLoading && 
            <>
                <PageTitle>Ubah Komplain</PageTitle> 
                <Button icon="fas fa-fw fa-step-backward mr-2" backgroundColor="danger" href={"/user/complain/detail/"+no_komplain}>Kembali</Button> 

                <div className="mt-4">
                    <div className="row">
                        <div className="col"> 
                            <label htmlFor="user" className="form-label">Nomor Komplain : {komplain.NO_KOMPLAIN}</label>
                        </div>
                    </div>
                </div>
                <div className="row">
         <div className="col"> 
             <label htmlFor="user" className="form-label mt-4">Tanggal Kejadian</label> 
             <input type="date" name="tanggal" id="tanggal" className="form-control" defaultValue={komplain.TGL_KEJADIAN} onChange={(e)=>{setTanggal(e.target.value)}} min={minDate} required/>

             <label htmlFor="" className="form-label mt-4">Divisi Terkomplain</label>
             <input type="text" className="form-control" id="divisi" defaultValue={komplain.NAMA_DIVISI} disabled/>

             <label htmlFor="" className="form-label mt-4">Topik</label>
             <input type="text" className="form-control" id="topik" value={komplain.TOPIK+" - "+komplain.TDESKRIPSI} disabled/> 

             <label htmlFor="" className="form-label mt-4">Subtopik 1</label>
             <input type="text" className="form-control" id="subtopik1" value={komplain.SUB_TOPIK1+" - "+komplain.S1DESKRIPSI} disabled/>
             
             <label htmlFor="subtopik2" className="form-label mt-4">Subtopik 2</label>
             <input type="text" id="subtopik2" className="form-control" value={komplain.SUB_TOPIK2+" - "+komplain.S2DESKRIPSI} disabled/>
                 
 
         </div> 
     </div>
     
    <div className="row mt-4"> 
        <div className="col">
            <label className="form-label">Tambah Lampiran</label>
            <input type="file" className="form-control" name="lampiran[]" style={{paddingTop:"30px", paddingLeft:"20px", height:"100px"}} onChange={handleFileChange} multiple/>
        </div>
    </div>
    
    <div className="row mt-4">
        <div className="col"> 
            <label className="form-label">Deskripsi Masalah</label>
            <textarea name="deskripsi" className="form-control" cols="30" rows="5" defaultValue={komplain.DESKRIPSI_MASALAH} onChange={(e)=>{setDeskripsi(e.target.value)}} required/> 

        </div>
    </div>
    <div className="row mt-4">
        <div className="col"> 
            <label className="form-label">Lampiran Tersimpan</label>
            <br/>
            <table  className="table">
                <thead> 
                    <tr>
                        <th scope="col">Nomor Lampiran</th>
                        <th scope="col">Aksi</th>
                    </tr>
                </thead>
                <tbody> 
                {komplain.LAMPIRAN && komplain.LAMPIRAN.map((item,index)=>{ 
                            return(
                                <tr key={index}>
                                    <td>
                                        <div onClick={()=>setShowingLampiran(UNIVERSAL_URL+"uploads/"+item.KODE_LAMPIRAN)} style={{color:"blue"}}>Lampiran {index+1}</div>
                                    </td>
                                    <td> 
                                        <div onClick={()=>deleteLampiran(item.KODE_LAMPIRAN)} className="btn btn-danger">
                                            <i className='fas fa-fw fa-trash'></i>
                                            Hapus
                                        </div>
                                    </td> 
                                </tr>
                            )
                        
                    })}  
                </tbody>
            </table>
        </div>
    </div>
     
     {komplain.STATUS != "CLOSE" && 
        <div className="row mt-4 mb-2">
            <div className="col">  
                    {!isLoadingSubmit && <Button icon="fas fa-fw fa-pen mr-2" className="w-100" onclick={editComplain}>Simpan</Button>}
                    {isLoadingSubmit && <Button className="w-100"><Loading color="white"/></Button>}
                
            </div>
        </div>
     }

            </>
            }
           {showingLampiran!="" && <FileLoader back={()=>setShowingLampiran("")} fileUrl={showingLampiran}/>}
        </>
    )
}