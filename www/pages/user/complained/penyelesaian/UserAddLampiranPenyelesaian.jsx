const UserAddLampiranPenyelesaian = ()=>{
    const mainContext = useContext(MainContext);
    const history = useHistory();
    
    const routeContext = useContext(RouteContext);
    const path = history.location.pathname;
    
    const [isLoading,setisLoading] = useState(false); 
    const {no_komplain} = useParams(); 

    const [deskripsi,setDeskripsi] = useState("");
    const [akar,setAkar] = useState("");
    const [preventif,setPreventif] = useState("");
    const [korektif,setKorektif] = useState("");
    const [deadline,setDeadline] = useState("");
    

    const [fileList, setFileList] = useState([])
    const handleFileChange = (e)=>{
        setFileList(e.target.files)  
    }

    async function sendFeedback(){
        if(deskripsi=="" || akar=="" || preventif=="" || korektif=="" || deadline==""){ 
            mainContext.setModalContext({
                open : true,
                message : "Semua input harus diisi"
            }) 
            return;
        } 
        setisLoading(true)
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
        
        const result =  await PrivateClient.post_file(`/User/Complained/Penyelesaian/SendFeedback/index_post/${no_komplain}`,formData);    
 
        mainContext.setModalContext({
            open : true,
            message : result.message
        }) 
        if(result.status < 300){  
            history.push("/user/complained/penyelesaian")
            storage.remove("preSendedFeedback")
        }else{ 
            setisLoading(false)
        } 
    }
    useEffect(()=>{  
        let preSended = storage.get("preSendedFeedback");
        if(!preSended){
            history.push("/user/complained/penyelesaian/add/"+no_komplain);
        }else{ 
            setDeskripsi(preSended.deskripsi);
            setAkar(preSended.akar);
            setPreventif(preSended.preventif);
            setKorektif(preSended.korektif);
            setDeadline(preSended.deadline);
        } 
        
        routeContext.setRouteContext(path)  
    },[])
    return(
        <> 
        <nav aria-label="breadcrumb">
        <ol className="breadcrumb" style={{backgroundColor:"#F1F2F5"}}> 
                <li className="breadcrumb-item"><Link to={"/user/complained/penyelesaian/add/"+no_komplain}>Detail</Link> </li>
                <li className="breadcrumb-item active">Lampiran</li> 
            </ol>
        </nav>

        <PageTitle>Tambah Penyelesaian Komplain</PageTitle>
        <Button icon="fas fa-fw fa-step-backward mr-2" backgroundColor="danger" href={"/user/complained/penyelesaian/add/"+no_komplain}>Kembali</Button> 

        
        <div className="mt-4">

        <div className="row mt-4">
            <div className="col">
                <label htmlFor="user" className="form-label">Input Lampiran (tidak wajib)</label>
                <input type="file" className="form-control" style={{paddingTop:"30px", paddingLeft:"20px", height:"100px"}}  accept=".jpg,.png,.pdf,.docx,.xls,.xlsx,.txt" multiple onChange={handleFileChange}/>

            </div>
            <div className="col">
                <label htmlFor="user" className="form-label">Rangkuman Input Penyelesaian Komplain</label>
                <div className="form-control" style={{height:"fit-content",paddingBottom:" 20px"}}>
                    Deskripsi Masalah : {deskripsi} <br/><br/>
                    Akar Masalah : {akar} <br/><br/>
                    Tindakan Preventif : {preventif} <br/><br/>
                    Tindakan Korektif : {korektif} <br/><br/>
                    Tanggal Deadline : {deadline} <br/><br/> <br/><br/>

                    <div className="row">

                        <div className="col"></div>
                        <div className="col"></div>
                        <div className="col"> 
                        {isLoading && <Button className="ml-2"> <Loading color="white"/></Button> }
                        {!isLoading && <Button onclick={sendFeedback}>Kirimkan</Button>  }
                           
                        </div>
                    </div>


                </div>
            </div>
        </div>

        </div>
    </>
    )
}