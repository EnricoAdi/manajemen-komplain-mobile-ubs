const UserDetailPenyelesaian = ()=>{
    const mainContext = useContext(MainContext);
    const history = useHistory();
    const [isLoading,setisLoading] = useState(false); 
    const [showingLampiran,setShowingLampiran] = useState("");  
    const {no_komplain} = useParams(); 
    const [komplain, setKomplain] = useState(
        { 
            NO_KOMPLAIN : "",
            nama_divisi_penerbit : "",
            nama_penerbit : "",
            lampiran : [''],
            feedback : {}
        } 
    ); 
    async function fetchComplain(){ 
        const res =  await PrivateClient.get('/User/Complained/Penyelesaian/Detail/index_get/'+no_komplain);    
          if(res.status){
            setisLoading(false) 
            setKomplain({
                ...res.data,
                nama_divisi_penerbit : res.data.PENERBIT.NAMA,
                nama_penerbit : res.data.DATA_PENERBIT.NAMA,
                lampiran : res.data.LAMPIRAN,
                feedback : res.data.FEEDBACK
            }) 
          }else{  
            // UserModel.logout();  
            // mainContext.setModalContext({
            //     open : true,
            //     message : "Sesi anda telah habis, silahkan login ulang"
            // }) 
            // history.push("/");
          }
        }
    function moveToPenyelesaian(){ 
        history.push("/user/complained/penyelesaian/add/"+no_komplain);
    }
    useEffect(()=>{ 
        setisLoading(true)
        fetchComplain() 
    },[])

    return(
        <>
            {showingLampiran=="" && <>
                 <PageTitle>Detail Komplain Ditugaskan</PageTitle>
            
            <Button icon="fas fa-fw fa-step-backward mr-2" backgroundColor="danger" href={"/user/complained/penyelesaian"}>Kembali</Button> 

            {!isLoading && 
            <> 
            <div className="row mt-4">
                <div className="col">
                    <div>Nomor Komplain : {komplain.NO_KOMPLAIN} </div> 
                    <div className="mt-2">Pemberi Komplain : {komplain.nama_penerbit} </div>
                    <div className="mt-2">Status : {komplain.STATUS} </div> 
                </div>
            </div>
            <div className="row mt-2">
                <div className="col">
                    <label htmlFor="topik" className="form-label">Topik</label>
                    <input type="text" className="form-control" name="topik" value={komplain.TOPIK+" - "+ komplain.TDESKRIPSI} disabled/>

                    <label htmlFor="subtopik1" className="form-label mt-4">Subtopik 1</label>
                    <input type="text" className="form-control" name="subtopik1" value={komplain.SUB_TOPIK1+" - "+komplain.S1DESKRIPSI} disabled/>

                    <label htmlFor="subtopik2" className="form-label mt-4">Subtopik 2</label>
                    <input type="text" className="form-control" name="subtopik2" value={komplain.SUB_TOPIK2+" - "+komplain.S2DESKRIPSI} disabled/>

                </div>
                <div className="col">
                    <label htmlFor="" className="form-label">Tanggal Komplain</label>
                    <input type="text" className="form-control" name="tanggal" defaultValue={komplain.TGL_KEJADIAN} disabled/>

                    <label className="form-label mt-4">Asal Divisi</label>
                    <input type="text" className="form-control" name="asalDivisi" defaultValue={komplain.nama_divisi_penerbit} disabled/>

                </div>
            </div>
            <br/> 
            <div className="row">
                <div className="col"> 
                    <label className="form-label">Daftar Lampiran Komplain</label>
                    <table className="table">
                        <tbody> 
                        {komplain.lampiran.map((item,index)=>{
                           return <tr key={index}>
                            <td> 
                                <div onClick={()=>setShowingLampiran(UNIVERSAL_URL+"uploads/"+item.KODE_LAMPIRAN)} style={{color:"blue"}} target="_blank">Lampiran {index+1}</div>
                            </td>
                           </tr>  
                        })} 
                        </tbody>
                    </table>
                </div> 
            </div>
            <div className="row mt-4 mb-4">
                <div className="col"> 
                        {komplain.feedback.T_KOREKTIF && <Button icon="fas fa-fw fa-plus mr-2" onclick={moveToPenyelesaian}>Tambah Penyelesaian</Button>}
                        {!komplain.feedback.T_KOREKTIF && <Button icon="fas fa-fw fa-pen mr-2" backgroundColor="warning">Ubah Penyelesaian</Button> }
                </div>
            </div>

            </>
            }
            </>}
           {showingLampiran!="" && <FileLoader back={()=>setShowingLampiran("")} fileUrl={showingLampiran}/>}
        </>

    )
}