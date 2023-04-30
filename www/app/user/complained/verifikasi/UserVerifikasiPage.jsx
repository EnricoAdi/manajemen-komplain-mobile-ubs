const UserVerifikasiPage = ()=>{
    const mainContext = useContext(MainContext);
    const history = useHistory();
    const [isLoading,setisLoading] = useState(false); 
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
            lampiran : [],
            url : "",
        } 
    ]); 
    const [setuju,setSetuju] = useState(false);
    const onChangeSetuju = (e)=>{
        setSetuju(e.target.checked)
    }
    fetchComplain = async ()=>{ 
        const res =  await PrivateClient.get('/User/Complain/Detail/Index/index_get/'+no_komplain);    
          if(res.status){ 
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
                        penugasan : res.penugasan,
                        url : res.url
                    } 
            )  
          }else{  
            UserModel.logout();  
            mainContext.setModalContext({
                open : true,
                message : "Sesi anda telah habis, silahkan login ulang"
            }) 
            history.push("/");
          }
        }
    async function verifikasi(){
        if(!setuju){ 
            mainContext.setModalContext({
                open : true,
                message : "Anda harus mencentang setuju verifikasi sebelum melanjutkan"
            }) 
            return;
        }
        setisLoading(true)
        const res =  await PrivateClient.get('/User/Complained/Verifikasi/index_get/'+no_komplain); 
    
        mainContext.setModalContext({
            open : true,
            message : res.message
        }) 
        history.push("/user/complained/listComplained")
       
    }
    function moveToTransfer(){
        history.push("/user/complained/transfer/"+no_komplain)
    }
    useEffect(()=>{  
        fetchComplain()
    },[])
    return (
        <>
            <PageTitle>Halaman Verifikasi Komplain</PageTitle>
            <Button icon="fas fa-fw fa-step-backward mr-2" backgroundColor="danger" href="/user/complained/listComplained">Kembali</Button> 
                <div className="mt-4"> 
                    <div className="row">
                        <div className="col"> 
                            <label htmlFor="user" className="form-label">Nomor Komplain : {no_komplain  }</label> <br/> 
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
                            <label htmlFor="" className="form-label mt-4">Deskripsi Masalah</label>
                            <textarea type="text" className="form-control"  defaultValue={data.deskripsi} disabled/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col"> 
                            <br/> 
                             {data.lampiran && data.lampiran.map((item,index)=>{
                                return <div key={index}><a href={data.url+"uploads/"+item.KODE_LAMPIRAN} target="_blank">Lampiran {index+1}</a></div>
                            })}   
                        </div>
                    </div>
                    <div className="row mt-4">
                    
                    {isLoading && <div className="col">
                         <Button btnStyle={{paddingLeft:"10px",paddingRight:"10px"}} backgroundColor="success"> <Loading color="white"/></Button> 
                    </div>}
                        
                    {!isLoading && 
                    <div className="col">  
                        <input type="checkbox" name="" className="mb-4" onChange={onChangeSetuju} /> Saya Menyetujui Verifikasi <br />
                        <Button className="" backgroundColor="danger" onclick={moveToTransfer}>Transfer</Button> 
                        <Button className="ml-2" backgroundColor="success" onclick={verifikasi}>Verifikasi</Button> 
                    </div> }
                    </div>
                </div>
        </>
    )
}