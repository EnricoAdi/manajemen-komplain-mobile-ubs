const UserEditPenyelesaian = () => {
    const mainContext = useContext(MainContext);
    const history = useHistory();
    
    const routeContext = useContext(RouteContext);
    const path = history.location.pathname;
    const [isLoading,setisLoading] = useState(false); 

    const [isLoadingSubmit,setisLoadingSubmit] = useState(""); 
    const [showingLampiran,setShowingLampiran] = useState("");  
    const {no_komplain} = useParams(); 
    const [komplain, setKomplain] = useState(
        { 
            NO_KOMPLAIN : "",
            nama_divisi_penerbit : "",
            nama_penerbit : "",
            lampiran : [''], 
            FEEDBACK : {},
            PENERBIT : {
                NOMOR_INDUK : "",
                NAMAPENERBIT : ""
            }
        } 
    );
    const [akar,setAkar] = useState("");
    const [preventif,setPreventif] = useState("");
    const [korektif,setKorektif] = useState("");
    const [deadline,setDeadline] = useState("");

    
    const [fileList, setFileList] = useState([])
    const handleFileChange = (e)=>{
        setFileList(e.target.files)  
    }

    async function fetchComplain(){ 
        const res =  await PrivateClient.get('/User/Complained/Penyelesaian/Detail/index_get/'+no_komplain);    
        if(res.status){
            setisLoading(false) 
            setKomplain({
                ...res.data,  
                LAMPIRAN : res.data.LAMPIRAN,
                FEEDBACK : res.data.FEEDBACK
            })  
            setAkar(res.data.FEEDBACK.AKAR_MASALAH)
            setPreventif(res.data.FEEDBACK.T_PREVENTIF)
            setKorektif(res.data.FEEDBACK.T_KOREKTIF)
            const newDateFormat = new Date(res.data.TGL_DEADLINE).toISOString().split("T")[0] 
            setDeadline(newDateFormat) 
        } 
    }

    async function deleteLampiran(kode_lampiran){
        let confirm = window.confirm("Apakah anda yakin ingin menghapus lampiran ini?")
        if(confirm){ 
            // delete lampiran
            const res =  await PrivateClient.get(`/User/Complained/Penyelesaian/DeleteLampiran/index_get/${no_komplain}/${kode_lampiran}`); 
        
            mainContext.setModalContext({
                open : true,
                message : res.message
            })  
            if(res.status < 300){
                setKomplain({
                    ...komplain,  
                    LAMPIRAN : res.data
                })  
            }
        }
    }
    /**
     * Function ini digunakan untuk menghapus data penyelesaian komplain (feedback terhadap komplain) berdasarkan komplain yang dipilih oleh user. HTTP Request akan dijalankan menggunakan function Private Client, sehingga autentikasi juga dikirim dengan parameter token autentikasi di bagian header request, kepada endpoint API “user/complained/penyelesaian/edit/index_get/:nomor_komplain”. 
     */
    async function deleteFeedback(){
        let confirm = window.confirm("Apakah anda yakin ingin menghapus data penyelesaian komplain ini?")
        if(confirm){
            
            setisLoadingSubmit("delete")
            //delete feedback 
            const res =  await PrivateClient.get(`/User/Complained/Penyelesaian/Edit/index_get/${no_komplain}`); 
        
            mainContext.setModalContext({
                open : true,
                message : res.message
            }) 
            if(res.status < 300){
                history.push("/user/complained/penyelesaian/detail/"+no_komplain) 
            }
        }
    }

    /**
     * 
     * Function ini digunakan untuk mengubah data penyelesaian komplain (feedback terhadap komplain) berdasarkan parameter nomor komplain yang dikirim oleh user. Halaman ini akan mengirimkan beberapa parameter, yaitu data akar masalah, tindakan preventif, tindakan korektif, dan tanggal deadline baru berdasarkan input user untuk sebuah komplain. Lalu untuk pengubahan data penyelesaian komplain juga bisa menambah lampiran apabila user ingin memberikan lampiran dalam bentuk file. HTTP Request akan dijalankan menggunakan function Private Client, sehingga autentikasi juga dikirim dengan parameter token autentikasi di bagian header request, kepada endpoint API “user/complained/penyelesaian/edit/index_post/:nomor_komplain”. 
     */
    async function updateFeedback(){
        let confirm = window.confirm("Apakah anda yakin ingin mengubah data penyelesaian komplain ini?")
        if(confirm){
            //update feedback
            if(akar=="" || preventif=="" || korektif=="" || deadline==""){ 
                mainContext.setModalContext({
                    open : true,
                    message : "Semua input harus diisi"
                }) 
                return;
            } 
            setisLoadingSubmit("update")

            const formData = new FormData();
            formData.append("akar",akar) 
            formData.append("preventif",preventif) 
            formData.append("korektif",korektif) 
            formData.append("deadline",deadline) 
            if(fileList.length<1){ 
                formData.append("lampiran[]",null)
            }
            else if(fileList.length>0){ 
                for (let i = 0; i < fileList.length; i++) {
                    const file = fileList[i]; 
                    formData.append(`lampiran[]`,file) 
                }
            } 
            
            const result =  await PrivateClient.post_file(`/User/Complained/Penyelesaian/Edit/index_post/${no_komplain}`,formData);    
     
            mainContext.setModalContext({
                open : true,
                message : result.message
            }) 
            if(result.status < 300){  
                history.push("/user/complained/penyelesaian/detail/"+no_komplain) 
            }else{ 
                setisLoadingSubmit("")
            }
        }
    }
    useEffect(()=>{
        setisLoading(true) 
        fetchComplain() 
        
        routeContext.setRouteContext(path)  
    },[])
    return(
        <>  {showingLampiran=="" && <>
           
            <PageTitle>Ubah Penyelesaian Komplain</PageTitle>
            <Button icon="fas fa-fw fa-step-backward mr-2" backgroundColor="danger" href={"/user/complained/penyelesaian/detail/"+no_komplain}>Kembali</Button>  

            {!isLoading && <> 
                <div className="row mt-4">
                    <div className="col"> 
                        <label className="form-label mt-2">Nomor Komplain : {komplain.NO_KOMPLAIN}</label>
                    </div>
                </div>
                <div className="row">
                    <div className="col"> 
                        <label className="form-label mt-2">Topik :{komplain.TDESKRIPSI} -  {komplain.S1DESKRIPSI} -  {komplain.S2DESKRIPSI}</label>
                    </div>
                </div>
                <div className="row">
                    <div className="col">  
                        <label className="form-label mt-2">Pemberi komplain : {komplain.PENERBIT.NOMOR_INDUK} -  {komplain.PENERBIT.NAMAPENERBIT}</label>
                    </div>
                </div>
                <div className="row">
                    <div className="col"> 
                        <label className="form-label mt-2">Masalah Komplain</label>
                        <textarea className="form-control" rows="5" defaultValue={komplain.DESKRIPSI_MASALAH} disabled/>
                    </div>
                </div>
                
                <div className="row mt-4">
                    <div className="col"> 
                        <label className="form-label">Tanggal Deadline</label>
                        <input type="date" name="tanggal" id="tanggal" className="form-control"  defaultValue={deadline} onChange={(e)=>{setDeadline(e.target.value)}} required/>

                    </div> 
                </div>
                <div className="row mt-4">
                    <div className="col">
                        <label htmlFor="user" className="form-label">Akar Masalah</label> 
                        <textarea className="form-control" rows="10" name="akar-masalah" defaultValue={akar} onChange={(e)=>{setAkar(e.target.value)}} required/> 
                    </div>   
                </div>
                <div className="row mt-4"> 
                    <div className="col">
                        <label htmlFor="user" className="form-label">Tindakan Preventif</label> 
                        <textarea className="form-control" rows="10" name="preventif" defaultValue={preventif} onChange={(e)=>{setPreventif(e.target.value)}} required/> 
                    </div>  
                </div>
                <div className="row mt-4"> 
                    <div className="col">
                        <label htmlFor="user" className="form-label">Tindakan Korektif</label> 
                        <textarea className="form-control" rows="10" name="korektif" defaultValue={korektif} onChange={(e)=>{setKorektif(e.target.value)}} required/> 
                    </div> 
                </div>

                <div className="row mt-4">
                    <div className="col">
                        <label className="form-label">Daftar Lampiran Komplain</label>
                        <table className="table">
                            <tbody>
                            {komplain.LAMPIRAN && komplain.LAMPIRAN.map((item,index)=>{
                                if(item.TIPE==0){ 
                                    return(
                                        <tr key={index}>
                                            <td>
                                            <div onClick={()=>setShowingLampiran(UNIVERSAL_URL+"uploads/"+item.KODE_LAMPIRAN)} style={{color:"blue"}}>Lampiran {index+1}</div>
                                            </td> 
                                        </tr>
                                    )
                                }
                            })} 
                            </tbody>
                        </table>
                        
                        <label className="form-label mt-4">Daftar Lampiran Penyelesaian</label>
                        <table className="table">
                            <tbody> 
                            {komplain.LAMPIRAN && komplain.LAMPIRAN.map((item,index)=>{
                                if(item.TIPE==1){ 
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
                                }
                            })}  
                            </tbody>
                        </table>

                    </div>
                </div>
                
                <div className="row mt-2">
                    
                    <div className="col">

                        <label className="form-label">Tambah Lampiran Penyelesaian (tidak wajib)</label>
                        <input type="file" className="form-control" style={{paddingTop:"30px", paddingLeft:"20px", height:"100px"}} multiple onChange={handleFileChange}/>

                    </div> 
                </div> 
    
 
                <div className="row mt-4 mb-2">
                    <div className="col">    
                        {isLoadingSubmit!="" &&
                            <>
                                <Button className="w-100" backgroundColor={isLoadingSubmit=="delete"?"danger":"primary"}> <Loading color="white"/></Button>  
                            </> 
                        }
                        {isLoadingSubmit=="" && 
                            <>
                                <Button backgroundColor="danger" icon="fas fa-fw fa-trash mr-2" onclick={deleteFeedback} className="w-100">Hapus</Button>
                                <Button icon="fas fa-fw fa-pen mr-2" className="w-100 mt-2"  onclick={updateFeedback} >Edit</Button>   
                            </>
                        }
                  
                       
                    </div>
                </div> 
            </>}

            </>}
            {showingLampiran!="" && <FileLoader back={()=>setShowingLampiran("")} fileUrl={showingLampiran}/>}
        </>
    )   
}