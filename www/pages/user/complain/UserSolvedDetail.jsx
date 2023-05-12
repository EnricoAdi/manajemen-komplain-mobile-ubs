const UserSolvedDetail = ()=>{ 
    const mainContext = useContext(MainContext);
    const history = useHistory();
    const [isLoading,setisLoading] = useState(false); 
    const [isLoadingSubmit,setisLoadingSubmit] = useState(""); 
    const [showingLampiran,setShowingLampiran] = useState("");  

    const [keputusan,setKeputusan] = useState("");  
    const [keberatan,setKeberatan] = useState("");  

    const {no_komplain} = useParams(); 
    const [komplain, setKomplain] = useState(
        { 
            NO_KOMPLAIN : "",
            nama_divisi_penerbit : "",
            nama_penerbit : "",
            lampiran : [''], 
            FEEDBACK : {
                AKAR_MASALAH : "",
                T_PREVENTIF : "",
                T_KOREKTIF : "", 
            },
            PENERBIT : {
                NOMOR_INDUK : "",
                NAMAPENERBIT : ""
            },
            TGL_DEADLINE : "",
            STATUS: ""
        } 
    );
    async function fetchComplain(){ 
        const res =  await PrivateClient.get('/User/Complained/Penyelesaian/Detail/index_get/'+no_komplain);    
        if(res.status){
            setisLoading(false) 
            setKomplain({
                ...res.data,  
                LAMPIRAN : res.data.LAMPIRAN,
                FEEDBACK : res.data.FEEDBACK,
                TGL_DEADLINE : new Date(res.data.TGL_DEADLINE).toISOString().split("T")[0]
            })    
        } 
    }
    async function selesai(){
        if(keputusan==""){ 
            mainContext.setModalContext({
                open : true,
                message : "Silahkan memilih keputusan terlebih dahulu"
            }) 
        }else{ 
            if(keputusan=="banding" && keberatan==""){ 
                mainContext.setModalContext({
                    open : true,
                    message : "Silahkan mengisi keberatan terlebih dahulu"
                }) 
            }
            let confirm = window.confirm(`Apakah anda setuju untuk melakukan ${keputusan} pada komplain ini?`)
            //todo send api request
        }
    }
    useEffect(()=>{
        setisLoading(true) 
        fetchComplain() 
    },[])
    return(
        <> 
          {showingLampiran=="" && <>
            
            <PageTitle>Detail Penyelesaian Komplain Diterima</PageTitle>
            <Button icon="fas fa-fw fa-step-backward" backgroundColor="danger" href="/user/complain/solved/">Kembali</Button>
          
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
                        <input type="date" name="tanggal" id="tanggal" className="form-control"  defaultValue={komplain.TGL_DEADLINE} disabled/>

                    </div> 
                </div>
                <div className="row mt-4">
                    <div className="col">
                        <label htmlFor="user" className="form-label">Akar Masalah</label> 
                        <textarea className="form-control" rows="10" name="akar-masalah" defaultValue={komplain.FEEDBACK.AKAR_MASALAH} disabled/> 
                    </div>   
                </div>
                <div className="row mt-4"> 
                    <div className="col">
                        <label htmlFor="user" className="form-label">Tindakan Preventif</label> 
                        <textarea className="form-control" rows="10" name="preventif" defaultValue={komplain.FEEDBACK.T_PREVENTIF} disabled/> 
                    </div>  
                </div>
                <div className="row mt-4"> 
                    <div className="col">
                        <label htmlFor="user" className="form-label">Tindakan Korektif</label> 
                        <textarea className="form-control" rows="10" name="korektif" defaultValue={komplain.FEEDBACK.T_KOREKTIF} disabled/> 
                    </div> 
                </div>

                <div className="row mt-4">
                    <div className="col">
                        <label className="form-label">Daftar Lampiran Komplain</label>
                        <table className="table">
                            <tbody>
                            {komplain.LAMPIRAN && komplain.LAMPIRAN.map((item,index)=>{ 
                                    return(
                                        <tr key={index}>
                                            <td>
                                            <div onClick={()=>setShowingLampiran(UNIVERSAL_URL+"uploads/"+item.KODE_LAMPIRAN)} style={{color:"blue"}}>Lampiran {index+1} ({item.TIPE==0?"Komplain":"Feedback"})</div>
                                            </td> 
                                        </tr>
                                    ) 
                            })} 
                            </tbody>
                        </table>
                         

                    </div>
                </div>
                 {komplain.STATUS!="CLOSE" && 
                 
        <div className="row mt-4">
            <div className="col">
        
            <div className="form-control" style={{height:"fit-content", paddingBottom:"20px"}}>
                    <p style={{marginTop:"10px", fontWeight:"bold"}}>Keputusan :</p>
                    <div className="row">
                        <div className="col"><input type="radio" name="keputusan" onChange={()=>setKeputusan("cancel")} className="mr-2"/>Cancel</div>
                        <div className="col"><input type="radio" name="keputusan" onChange={()=>setKeputusan("validasi")} className="mr-2"/>Validasi</div>
                        <div className="col"><input type="radio" name="keputusan" onChange={()=>setKeputusan("banding")} className="mr-2"/>Banding</div>
                    </div>
                    
                    {keputusan=="banding" && 
                    <div className="row mt-4" id="banding-section">
                        <div className="col">
                            <label className="form-label">Permintaan Banding</label>
                            <input type="text" id="permintaanBanding" className="form-control" onChange={(e)=>setKeberatan(e.target.value)} />
                        </div>
                    </div>}
                </div>
            </div>
        </div> 
        }
    
 
                <div className="row mt-4 mb-2">
                    <div className="col">    
                        {isLoadingSubmit!="" &&
                            <>
                                <Button className="ml-2"> <Loading color="white"/></Button>  
                            </> 
                        }
                        {isLoadingSubmit=="" && 
                            <> 
                                <Button icon="fas fa-fw fa-pen mr-2" className="ml-2"  onclick={selesai}>Selesai</Button>   
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