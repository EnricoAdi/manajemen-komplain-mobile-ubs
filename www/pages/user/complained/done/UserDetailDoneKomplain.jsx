const UserDetailDoneKomplain = ()=>{
    const mainContext = useContext(MainContext);
    const history = useHistory();
    
    const routeContext = useContext(RouteContext);
    const path = history.location.pathname;
    const [isLoading,setisLoading] = useState(false); 
    const [isLoadingSubmit,setisLoadingSubmit] = useState(false); 
    const [showingLampiran,setShowingLampiran] = useState("");  
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
                T_KOREKTIF : ""
            }
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
                FEEDBACK : res.data.FEEDBACK
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
    async function selesai(){
        let confirm = window.confirm("Apakah anda setuju menyelesaikan penyelesaian komplain?")
        if(confirm){
            setisLoadingSubmit(true)   
            const res =  await PrivateClient.get('User/Complained/Done/Success/index_get/'+no_komplain);     
            
            mainContext.setModalContext({
                open : true,
                message : res.message
            })  
            history.push("/user/complained/done")
             
        }
    }
    async function hapus(){
        let confirm = window.confirm("Apakah anda ingin menghapus penyelesaian komplain?")
        if(confirm){
            setisLoadingSubmit(true)   
            const res =  await PrivateClient.get('User/Complained/Done/Delete/index_get/'+no_komplain);    
            
            mainContext.setModalContext({
                open : true,
                message : res.message
            }) 
            history.push("/user/complained/done")
        }
    }
    useEffect(()=>{ 
        setisLoading(true)
        fetchComplain() 
        
        routeContext.setRouteContext(path)  
    },[])
    return(
        <>
            {showingLampiran=="" && <>
                <PageTitle>Detail Penyelesaian Komplain Untuk Diselesaikan</PageTitle>
                
                <Button icon="fas fa-fw fa-step-backward mr-2" backgroundColor="danger" href={"/user/complained/done"}>Kembali</Button> 
                {!isLoading && 
                <div className="mt-4">
            
                <div className="row">
                    <div className="col"> 
                        <label className="form-label mt-2">Nomor Komplain :  {no_komplain}</label>
                    </div>
                </div>
                <div className="row">
                    <div className="col"> 
                        <label className="form-label mt-2">Masalah Komplain</label>
                        <textarea className="form-control" rows="5" value={komplain.DESKRIPSI_MASALAH} disabled />
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col">
                        <label htmlFor="user" className="form-label mt-4">Akar Masalah</label> 
                        <textarea className="form-control" rows="10"  name="akar-masalah" value={komplain.FEEDBACK.AKAR_MASALAH} disabled/>  
                        <label htmlFor="user" className="form-label mt-4">Tindakan Preventif</label> 
                        <textarea className="form-control" rows="10"  name="preventif" value={komplain.FEEDBACK.T_PREVENTIF} disabled/> 
                        
                        <label htmlFor="user" className="form-label mt-4">Tindakan Korektif</label> 
                        <textarea className="form-control" rows="10" name="korektif" value={komplain.FEEDBACK.T_KOREKTIF} disabled/>
                    </div>  
                    
                </div>

                <div className="row mt-4">
                    <div className="col"> 
                        <label className="form-label">Tanggal Deadline</label>
                       
                        
                        <input type="text" name="tanggal" className="form-control" defaultValue={komplain.TGL_DEADLINE} disabled />

                    </div> 
                </div>
                
                <div className="row mt-4"> 
                    <div className="col">
                        <label className="form-label">Daftar Lampiran</label>
                        <table  className="table"> 
                            <tbody> 
                            { 
                                komplain.lampiran.map((item,index)=>{
                                    return(<tr key={index}>
                                        <td> <div onClick={()=>setShowingLampiran(UNIVERSAL_URL+"uploads/"+item.KODE_LAMPIRAN)} style={{color:"blue"}} target="_blank">Lampiran {index+1}</div></td>
                                        
                                    </tr>)
                                }) 
                            } 
                                
                            </tbody>
                        </table>
                    </div> 
                </div>
                
                <div className="row mt-4 mb-2">
                    <div className="col">    
                        {isLoadingSubmit && <>
                            <Button backgroundColor="secondary"><Loading color="white"/></Button>  
                        </>}
                        {!isLoadingSubmit && <> 
                            <Button icon="fas fa-fw fa-trash mr-2" backgroundColor="danger" onclick={hapus}>Hapus</Button>  
                            <Button className="ml-2" onclick={selesai}>Selesai</Button> 
                        </>}  
                    </div>
                </div>
            </div>
 }
            </>}
            
           {showingLampiran!="" && <FileLoader back={()=>setShowingLampiran("")} fileUrl={showingLampiran}/>}
        </>
    )
}