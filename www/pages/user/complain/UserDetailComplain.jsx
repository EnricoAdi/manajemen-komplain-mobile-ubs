/**
 * 
 * Halaman ini digunakan untuk mendapatkan data komplain secara detail berdasarkan parameter nomor komplain yang dikirim oleh user. Halaman ini sendiri akan mengirimkan parameter berupa nomor komplain yang dituju ke API. HTTP Request akan dijalankan dengan menggunakan function Private Client, sehingga Autentikasi juga dikirim dengan parameter token autentikasi di bagian header request, kepada endpoint API “user/complain/detail/index/index_get/:nomor_komplain”.
 */
const UserDetailComplain = ()=>{ 
    const mainContext = useContext(MainContext);
    const history = useHistory();
    const [isLoading,setisLoading] = useState(false);  
    const routeContext = useContext(RouteContext);
    const path = history.location.pathname;

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

    /**
     * Bagian ini digunakan untuk menghapus data komplain berdasarkan parameter nomor komplain yang dikirim oleh user. HTTP Request akan dijalankan dengan menggunakan function Private Client, sehingga Autentikasi juga dikirim dengan parameter token autentikasi di bagian header request, kepada endpoint API “user/complain/detail/delete/index_get/:nomor_komplain”. 
     */
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
    function moveToEdit(){
        history.push("/user/complain/edit/"+no_komplain)
    }
    function onDeviceReady() {
        alert("hello");
    }
    useEffect(()=>{ 
        setisLoading(true)
        fetchComplain()
        // document.addEventListener('deviceready',)
        
        routeContext.setRouteContext(path)  
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
                            <label htmlFor="user" className="form-label mt-4">Tanggal Kejadian</label>

                            <input type="text" name="tanggal" id="tanggal" className="form-control" defaultValue={data.tgl_kejadian} disabled />

                            <label htmlFor="" className="form-label mt-4">Topik</label>
                            <input type="text" className="form-control" id="topik" defaultValue={data.topik} disabled/>


                            <label htmlFor="subtopik2" className="form-label mt-4">Subtopik 1</label>
                            <input type="text" id="subtopik1" className="form-control" defaultValue={data.subtopik1} disabled/>

                            <label htmlFor="" className="form-label mt-4">Subtopik 2</label>
                            <input type="text" className="form-control" id="subtopik2" defaultValue={data.subtopik2} disabled />

                        </div> 
                    </div> 
                    <div className="row">
                        <div className="col">
                            <label htmlFor="" className="form-label mt-4">Deskripsi</label>
                            <textarea type="text" className="form-control" rows="5" defaultValue={data.deskripsi} disabled/>
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
                    {data.status!="CLOSE"&& <> 
                        {!isLoadingSubmit && 
                            <>
                            <div className="row mt-4"> 
                                    <Button icon="fas fa-fw fa-trash mr-2" backgroundColor="danger" onclick={confirmDeleteComplain} className="w-100">Hapus</Button>  
                            </div>
                            <div className="row mt-2 mb-2">  
                                    <Button icon="fas fa-fw fa-pen mr-2" className="w-100" onclick={moveToEdit}>Ubah</Button>  
                            </div>
                            </>
                        }
                        {isLoadingSubmit && 
                            <div className="row mt-4 mb-2">
                                <div className="col"> 
                                    <Button btnStyle={{paddingLeft:"10px",paddingRight:"10px"}} backgroundColor="secondary" className="w-100"> <Loading color="white"/></Button> 
                                </div>  
                            </div>
                        }
                    </>}
                </div>
        </>}
        {showingLampiran!="" && <FileLoader back={()=>setShowingLampiran("")} fileUrl={showingLampiran}/>}
        </>
    )
}