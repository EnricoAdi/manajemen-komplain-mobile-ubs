const ManagerDetailComplain = ()=>{
    const mainContext = useContext(MainContext);
    const history = useHistory();
    const [isLoading,setisLoading] = useState(false);  
    const routeContext = useContext(RouteContext);
    
    const [showingLampiran,setShowingLampiran] = useState("");  
    const path = history.location.pathname;
    const {no_komplain} = useParams(); 
    const [data, setData] = useState(
        {
            no_komplain: no_komplain,
            tgl_kejadian: '12/01/2023', 
            topik: 'Penanganan kurang tepat',
            subtopik1: 'Kurang bersih',
            subtopik2: 'Kurang bersih',
            deskripsi: 'deskripsi masalah', 
            status: 'OPEN', 
            lampiran : [],
            FEEDBACK : {
                AKAR_MASALAH : "",
                T_PREVENTIF : "",
                T_KOREKTIF : "", 
            },
            PENERBIT : {
                NOMOR_INDUK : "",
                NAMAPENERBIT : ""
            }
        } 
    ); 
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
                    FEEDBACK : res.data.FEEDBACK, 
                    PENERBIT : res.data.PENERBIT
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
    useEffect(()=>{ 
        setisLoading(true)
        fetchComplain() 
        
        routeContext.setRouteContext(path)  
    },[])
    return(
        <>
        {!showingLampiran && <>
            
            <PageTitle>Detail Komplain</PageTitle>
            <Button icon="fas fa-fw fa-step-backward" backgroundColor="danger" href="/manager/complain/list">Kembali</Button>
            
            {isLoading &&<div className="mt-4"> 
                    <Loading color="primary"/>
                </div> }
            {!isLoading &&  
            
                <div className="mt-4 mb-4"> 
                    <div className="row">
                        <div className="col"> 
                            <label htmlFor="user" className="form-label">Nomor Komplain : {no_komplain}</label> <br/>
                               
                        </div>
                    </div> 
                    
                    <div className="row">
                        <div className="col">  
                            <label className="form-label mt-2">Pemberi komplain : {data.PENERBIT.NOMOR_INDUK} - {data.PENERBIT.NAMAPENERBIT}</label> 
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

                    {(data.status=="CLOSE" || data.status=="cancel") && <>
                        
                        <div className="row mt-4">
                            <div className="col">
                                <label htmlFor="user" className="form-label">Akar Masalah</label> 
                                <textarea className="form-control" rows="10" name="akar-masalah" defaultValue={data.FEEDBACK.AKAR_MASALAH} disabled/> 
                            </div>   
                        </div>
                        <div className="row mt-4"> 
                            <div className="col">
                                <label htmlFor="user" className="form-label">Tindakan Preventif</label> 
                                <textarea className="form-control" rows="10" name="preventif" defaultValue={data.FEEDBACK.T_PREVENTIF} disabled/> 
                            </div>  
                        </div>
                        <div className="row mt-4"> 
                            <div className="col">
                                <label htmlFor="user" className="form-label">Tindakan Korektif</label> 
                                <textarea className="form-control" rows="10" name="korektif" defaultValue={data.FEEDBACK.T_KOREKTIF} disabled/> 
                            </div> 
                        </div>
                    </>}
                    
                    <div className="row">
                        <div className="col"> 
                            <br/> 
                             {data.lampiran && data.lampiran.map((item,index)=>{
                                return <div key={index} onClick={()=>setShowingLampiran(UNIVERSAL_URL+"uploads/"+item.KODE_LAMPIRAN)} style={{color: "blue"}}>Lampiran {index+1}</div>
                            })}   
                        </div>
                    </div> 
                </div>}
        </>}
                
        {showingLampiran!="" && <FileLoader back={()=>setShowingLampiran("")} fileUrl={showingLampiran}/>}
        </>
    )
}