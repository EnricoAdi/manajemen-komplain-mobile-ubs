const UserAddPenyelesaian = ()=>{
    const mainContext = useContext(MainContext);
    const history = useHistory();
    
    const routeContext = useContext(RouteContext);
    const path = history.location.pathname;
    const [isLoading,setisLoading] = useState(false); 
    const {no_komplain} = useParams(); 
    const [komplain, setKomplain] = useState(
        { 
            NO_KOMPLAIN : "",  
            LAMPIRAN : [''],
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

    async function fetchComplain(){ 
        const res =  await PrivateClient.get('/User/Complained/Penyelesaian/Detail/index_get/'+no_komplain);    
        if(res.status){
            setisLoading(false) 
            setKomplain({
                ...res.data,  
                LAMPIRAN : res.data.LAMPIRAN,
                FEEDBACK : res.data.FEEDBACK
            }) 
        } 
    }
    function moveToAddLampiran(){
        if(akar==""||preventif==""||korektif==""||deadline==""){
            mainContext.setModalContext({
                open : true,
                message : "Semua field harus diisi"
            })
        }else{
            //set data to localstorage 
            storage.set("preSendedFeedback",{
                akar : akar,
                preventif : preventif,
                korektif : korektif,
                deadline : deadline,
                deskripsi : komplain.DESKRIPSI_MASALAH
            })
            history.push("/user/complained/penyelesaian/add/lampiran/"+no_komplain);
        }
    }
    useEffect(()=>{ 
        setisLoading(true)
        let preSended = storage.get("preSendedFeedback");
        if(preSended){
            setAkar(preSended.akar);
            setPreventif(preSended.preventif);
            setKorektif(preSended.korektif);
            setDeadline(preSended.deadline);
        }
        fetchComplain() 
        
        routeContext.setRouteContext(path)  
    },[])
    
    return(
        <> 
            <nav aria-label="breadcrumb">
            <ol className="breadcrumb" style={{backgroundColor:"#F1F2F5"}}> 
                    <li className="breadcrumb-item active">Detail</li>
                    <li className="breadcrumb-item">...</li>
                </ol>
            </nav>

            <PageTitle>Tambah Penyelesaian Komplain</PageTitle>
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
                        <label className="form-label">Tanggal Deadline</label>
                        <input type="date" name="tanggal" id="tanggal" className="form-control"  defaultValue={deadline} onChange={(e)=>{setDeadline(e.target.value)}} required/>

                    </div> 
                </div>
                <div className="row mt-4 mb-2">
                    <div className="col">    
                        <Button onclick={moveToAddLampiran} className="w-100">Berikutnya</Button>
                    </div>
                </div> 
            </>}
        </>
    )
}