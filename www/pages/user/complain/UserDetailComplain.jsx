const UserDetailComplain = ()=>{ 
    const mainContext = useContext(MainContext);
    const history = useHistory();
    const [isLoading,setisLoading] = useState(false); 
    const [isLoadingSubmit,setisLoadingSubmit] = useState(false); 
    const [showingLampiran,setShowingLampiran] = useState("");  
    const {no_komplain} = useParams(); 
    const [data, setData] = useState([
        {
            no_komplain: no_komplain,
            tgl_kejadian: '12/01/2023', 
            topik: 'Penanganan kurang tepat',
            subtopik1: 'Kurang bersih',
            subtopik2: 'Kurang bersih',
            deskripsi: 'deskripsi masalah', 
            status: 'OPEN',
            penugasan :'',
            lampiran : []
        } 
    ]); 
    async function fetchComplain(){ 
    const res =  await PrivateClient.get('/User/Complain/Detail/Index/index_get/'+no_komplain);    
      if(res.status){
        setisLoading(false) 
        setData( 
                  {
                    no_komplain: no_komplain,
                    tgl_kejadian: res.data.TGL_KEJADIAN,
                    topik: res.data.TOPIK + " - " + res.data.TDESKRIPSI,
                    subtopik1: res.data.SUB_TOPIK1+ " - " + res.data.S1DESKRIPSI,
                    subtopik2: res.data.SUB_TOPIK2+ " - " + res.data.S2DESKRIPSI,
                    deskripsi: res.data.FEEDBACK.DESKRIPSI_MASALAH, 
                    status: res.data.STATUS,
                    lampiran: res.data.LAMPIRAN,
                    penugasan : res.penugasan 
                } 
        )  
      }else{  
        // UserModel.logout();  
        // mainContext.setModalContext({
        //     open : true,
        //     message : "Sesi anda telah habis, silahkan login ulang"
        // }) 
        // history.push("/");
      }
    }
    async function confirmDeleteComplain(){ 
        let ask = window.confirm("Apakah anda yakin ingin menghapus komplain "+no_komplain+" ? (Anda tidak bisa mengembalikan data yang telah dihapus)")
        if(ask){ 
            setisLoadingSubmit(true)
            const res =  await PrivateClient.get('/User/Complain/Detail/Delete/index_get/'+no_komplain);   
            if(res.data!=-1){ 
                setisLoading(false) 
                mainContext.setModalContext({
                    open : true,
                    message : res.message
                }) 
                history.push("/user/complain/list")
            }else{ 
                mainContext.setModalContext({
                    open : true,
                    message : "Komplain gagal dihapus"
                }) 
            }
            
            setisLoadingSubmit(false)
        }
    }
    function onDeviceReady() {
        alert("hello");
    }
    useEffect(()=>{ 
        setisLoading(true)
        fetchComplain()
        // document.addEventListener('deviceready',)
    },[])
    return(
        <>
        {showingLampiran=="" && <>
            
            <PageTitle>Detail Komplain</PageTitle>
            <Button icon="fas fa-fw fa-step-backward" backgroundColor="danger" href="/user/complain/list">Kembali</Button>
            
                {isLoading &&<div className="mt-4"> 
                    <Loading color="primary"/>
                </div> }
                <div className="mt-4"> 
                    <div className="row">
                        <div className="col"> 
                            <label htmlFor="user" className="form-label">Nomor Komplain : {no_komplain  }</label> <br/>
                             
                            {data.penugasan && <label className='form-label'>User Penugasan : {data.penugasan.NAMA}</label>}
                            
                        </div>
                    </div>     
                    <div className="row mt-2">
                        <div className="col">
                            <label htmlFor="" className="form-label">Status : {data.status} </label> 
                        </div>
                    </div> 
                    <div className="row">
                        <div className="col">
                            <label htmlFor="user" className="form-label">Tanggal Kejadian</label>

                            <input type="text" name="tanggal" id="tanggal" className="form-control" defaultValue={data.tgl_kejadian} disabled />

                            <label htmlFor="subtopik2" className="form-label mt-4">Subtopik 1</label>
                            <input type="text" id="subtopik1" className="form-control" defaultValue={data.subtopik1} disabled/>

                        </div>
                        <div className="col">
                            <label htmlFor="" className="form-label">Topik</label>
                            <input type="text" className="form-control" id="topik" defaultValue={data.topik} disabled/>

                            <label htmlFor="" className="form-label mt-4">Subtopik 2</label>
                            <input type="text" className="form-control" id="subtopik2" defaultValue={data.subtopik2} disabled />
                        </div>
                    </div> 
                    <div className="row">
                        <div className="col">
                            <label htmlFor="" className="form-label mt-4">Deskripsi</label>
                            <textarea type="text" className="form-control"  defaultValue={data.deskripsi} disabled/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col"> 
                            <br/> 
                             {data.lampiran && data.lampiran.map((item,index)=>{
                                return <div key={index} onClick={()=>setShowingLampiran(UNIVERSAL_URL+"uploads/"+item.KODE_LAMPIRAN)} style={{color: "blue"}}>Lampiran {index+1}</div>
                            })}   
                        </div>
                    </div>
                    {!isLoadingSubmit && 
                        <div className="row mt-4">
                            <div className="col"> 
                                <Button icon="fas fa-fw fa-trash mr-2" backgroundColor="danger" onclick={confirmDeleteComplain}>Hapus</Button> 
                                <Button icon="fas fa-fw fa-pen mr-2" className="ml-2">Ubah</Button> 
                            </div>  
                        </div>
                    }
                    {isLoadingSubmit && 
                        <div className="row mt-4">
                            <div className="col"> 
                                <Button btnStyle={{paddingLeft:"10px",paddingRight:"10px"}} backgroundColor="secondary"> <Loading color="white"/></Button> 
                            </div>  
                        </div>
                    }
                </div>
        </>}
        {showingLampiran!="" && <FileLoader back={()=>setShowingLampiran("")} fileUrl={showingLampiran}/>}
        </>
    )
}