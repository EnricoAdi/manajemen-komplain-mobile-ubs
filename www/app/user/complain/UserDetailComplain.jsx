const UserDetailComplain = ()=>{ 
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
            penugasan :''
        } 
    ]); 
    fetchComplain = async ()=>{ 
    const res =  await PrivateClient.get('/User/Complain/Detail/index_get/'+no_komplain);    
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
                    penugasan : res.penugasan
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
    async function confirmDeleteComplain(){ 
        let ask = window.confirm("Apakah anda yakin ingin menghapus komplain "+no_komplain+" ?")
        if(ask){
            alert("deleted")
            history.push("/user/complain/list")
        }
    }
    useEffect(()=>{ 
        setisLoading(true)
        fetchComplain()
    },[])
    return(
        <>
            <PageTitle>Detail Komplain</PageTitle>
            <Button icon="fas fa-fw fa-step-backward" backgroundColor="danger" href="/user/complain/list">Back</Button>
            
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
                    {!isLoading && 
                    <div className="row">
                        <div className="col">
                            <label htmlFor="user" className="form-label">Tanggal Kejadian</label>

                            <input type="text" name="tanggal" id="tanggal" className="form-control" defaultValue={data.tgl_kejadian} disabled />

                            <label htmlFor="subtopik2" className="form-label mt-4">Subtopik 2</label>
                            <input type="text" id="subtopik2" className="form-control" defaultValue={data.subtopik2} disabled/>

                        </div>
                        <div className="col">
                            <label htmlFor="" className="form-label">Topik</label>
                            <input type="text" className="form-control" id="topik" defaultValue={data.topik} disabled/>

                            <label htmlFor="" className="form-label mt-4">Subtopik 1</label>
                            <input type="text" className="form-control" id="subtopik1" defaultValue={data.subtopik1} disabled />
                        </div>
                    </div>}
                    <div className="row">
                        <div className="col">
                            <label htmlFor="" className="form-label mt-4">Deskripsi</label>
                            <textarea type="text" className="form-control"  defaultValue={data.deskripsi} disabled/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col"> 
                            <br/>
                            {/* <?php
                                $counter = 1;
                                foreach($komplain->LAMPIRAN as $lampiran){
                                    
                                    echo '<a href="'.base_url().'uploads/'.$lampiran->KODE_LAMPIRAN.'" target="_blank">Lampiran '.$counter.'</a><br>';
                                    $counter = $counter + 1;
                                }
                            ?> */}
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col"> 
                            <Button icon="fas fa-fw fa-trash mr-2" backgroundColor="danger" onclick={confirmDeleteComplain}>Hapus</Button> 
                            <Button icon="fas fa-fw fa-pen mr-2" className="ml-2">Ubah</Button> 
                        </div> 
                    </div>
                </div>
        </>
    )
}