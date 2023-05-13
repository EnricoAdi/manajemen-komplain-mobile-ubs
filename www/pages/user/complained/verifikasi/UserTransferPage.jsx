const UserTransferPage = ()=>{
    const mainContext = useContext(MainContext);
    const history = useHistory();
    
    const routeContext = useContext(RouteContext);
    const path = history.location.pathname;

    const [isLoading,setisLoading] = useState(false); 
    const [isLoadingSubmit,setisLoadingSubmit] = useState(false); 

    const [komplain,setKomplain] = useState({

    }); 
    const [subtopics,setSubtopics] = useState([{
        kode : "", 
        nama : "" 
    }]); 

    const [inputSubtopik1,setInputSubtopik1] = useState({
        kode : "",
        nama : ""}); 
    const [inputSubtopik2,setInputSubtopik2] = useState({
        kode : "",
        nama : ""}); 
    const [inputTopik,setInputTopik] = useState({
        kode : "",
        nama : ""
    }); 
    const [inputDivisi,setInputDivisi] = useState({
        kode : "",
        nama : ""}); 

    const {no_komplain} = useParams(); 
    function changeSelected(e){
       
        const data = e.target.value.split("/*")
        setInputTopik({
            kode : data[0],
            nama : data[1]
        })
        setInputSubtopik1({
            kode : data[2],
            nama : data[3]
        })
        setInputSubtopik2({
            kode : data[4],
            nama : data[5]
        }) 
        setInputDivisi({
            kode : data[6],
            nama : data[7]
        }) 
    }
    async function fetchComplain(){ 
        const res =  await PrivateClient.get('/User/Complained/Transfer/index_get/'+no_komplain);    
          if(res.status==202){ 
            setKomplain(res.data.komplain)
            setSubtopics(res.data.subtopics)  
            setInputTopik({
                kode : res.data.komplain.TOPIK,
                nama : res.data.komplain.TDESKRIPSI
            })
            setInputSubtopik1({
                kode : res.data.komplain.SUB_TOPIK1,
                nama : res.data.komplain.S1DESKRIPSI
            })
            setInputSubtopik2({
                kode : res.data.komplain.SUB_TOPIK2,
                nama : res.data.komplain.S2DESKRIPSI
            })
            setInputDivisi({
                kode : res.data.komplain.KODEDIV,
                nama : res.data.komplain.NAMA_DIVISI
            })
            setSubtopics(res.data.subtopics)  
            setisLoading(false)
          }else{  
            // UserModel.logout();  
            // mainContext.setModalContext({
            //     open : true,
            //     message : "Sesi anda telah habis, silahkan login ulang"
            // }) 
            // history.push("/");
          }
        }
    async function sendTransfer(){ 
        setisLoadingSubmit(true)
        const payload  = {
            "inputTopik" : inputTopik.kode,
            "inputSubtopik1" : inputSubtopik1.kode,
            "inputSubtopik2" : inputSubtopik2.kode,
        } 
        const res =  await PrivateClient.post('/User/Complained/Transfer/index_post/'+no_komplain,payload);   
        mainContext.setModalContext({
            open : true,
            message : res.message
        }) 
        setisLoadingSubmit(false)
        if(res.status<300){ 
            history.push("/user/complained/listComplained")
            return;
        }
    }
    useEffect(()=>{
        setisLoading(true)
        fetchComplain(); 
        
        routeContext.setRouteContext(path)  
    },[])
    return (
        <>
            <PageTitle>Transfer Komplain</PageTitle>
            
            <Button icon="fas fa-fw fa-step-backward mr-2" backgroundColor="danger" href={"/user/complained/verifikasi/"+no_komplain}>Kembali</Button>

            <div className="row">
                <div className="col">
                    <label htmlFor="" className="form-label mt-4">Nomor Feedback : {komplain.NO_KOMPLAIN} </label>
                </div>
            </div>
            <div className="row mt-4">
                <div className="col">
                    <label htmlFor="topik" className="form-label">Subtopik 2</label>
                {!isLoading &&
                    <select id="subtopik2" className="form-control" defaultValue={inputTopik.kode+"/*"+inputTopik.nama+"/*"+inputSubtopik1.kode+"/*"+inputSubtopik1.nama+"/*"+inputSubtopik2.kode+"/*"+inputSubtopik2.nama+"/*"+inputDivisi.kode+"/*"+inputDivisi.nama} onChange={changeSelected}>  
                        { 
                            subtopics.map((subtopik,index)=>{   
                                return <option value={subtopik.KODE_TOPIK+"/*"+subtopik.TOPIK+"/*"+subtopik.SUB_TOPIK1+"/*"+subtopik.S1DESKRIPSI+"/*"+subtopik.SUB_TOPIK2+"/*"+subtopik.S2DESKRIPSI+"/*"+subtopik.KODEDIV+"/*"+subtopik.NAMA_DIVISI} key={index} >{subtopik.NAMA_DIVISI +" - "+ subtopik.TOPIK+" - "+subtopik.S1DESKRIPSI+" - "+subtopik.S2DESKRIPSI}</option>
                            })
                        } 
                    </select> }

                    <label htmlFor="topik" className="form-label mt-4">Topik</label>
                    <input type="text" className="form-control" id="topik" value={inputTopik.kode+" - "+inputTopik.nama} disabled/> 

                    <label htmlFor="subtopik1" className="form-label mt-4">Subtopik 1</label>
                    <input type="text" className="form-control" id="subtopik1"  value={inputSubtopik1.kode+" - "+inputSubtopik1.nama} disabled />

                    <label htmlFor="" className="form-label mt-4">Divisi Tujuan</label>
                    <input type="text" className="form-control" name="asalDivisi" id="divisi"  value={inputDivisi.kode + " - "+inputDivisi.nama} disabled/>

                    <label htmlFor="" className="form-label mt-4">Detail Transfer</label>
                    <textarea className="form-control" name="detail"/>
                </div> 
            </div>

            <div className="row mt-4 mb-2">
                <div className="col">  
                {isLoadingSubmit && <>
                         <Button btnStyle={{paddingLeft:"10px",paddingRight:"10px"}} backgroundColor="danger" className="w-100"> <Loading color="white"/></Button> 
                    </>}
                {!isLoadingSubmit && <Button className="w-100" backgroundColor="danger" onclick={sendTransfer}>Transfer</Button> }
                    
                </div>
            </div>
        </>
    )
}