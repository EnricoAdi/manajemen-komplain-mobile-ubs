/**
 * 
 * Halaman ini digunakan untuk mengisi data user yang ditugaskan untuk menangani komplain berdasarkan parameter nomor komplain yang dikirim oleh user. Karena tujuan dari penugasan adalah menyimpan data user yang bertanggung jawab, sehingga akan dikirimkan parameter nomor induk user dalam request body. HTTP Request akan dijalankan menggunakan function Private Client, sehingga autentikasi juga dikirim dengan parameter token autentikasi di bagian header request, kepada endpoint API “user/complained/penugasan/add/index_post/:nomor_komplain”. 
 */
const UserIsiPenugasan = ()=>{
    const mainContext = useContext(MainContext);
    const history = useHistory();
    
    const routeContext = useContext(RouteContext);
    const path = history.location.pathname;
    const [isLoading,setisLoading] = useState(false); 
    const [isLoadingSubmit,setisLoadingSubmit] = useState(false); 
    const {no_komplain} = useParams();
    const [komplain,setKomplain] = useState({
        NO_KOMPLAIN : no_komplain,
        PENUGASAN : "null",
        NAMADIVISI : ""
    })
    const [users,setUsers] = useState([
        {
            NOMOR_INDUK : "123",
            nama : "asd"
        }
    ])
    const [inputUser,setInputUser] = useState({
        NOMOR_INDUK : "",
        NAMA : ""
    })
    function changeUser(e){ 
        setInputUser({
            NOMOR_INDUK : e.target.value
        })
    }
    async function fetchComplain(){ 
        const res =  await PrivateClient.get('/User/Complained/Penugasan/Add/index_get/'+no_komplain);    
          if(res.status==200){ 
            setKomplain({...res.data.komplain,
                NAMADIVISI : res.data.komplain.PENERBIT.NAMA}  )
            setUsers(res.data.users)  
            setisLoading(false)  
            if((komplain.PENUGASAN==null||komplain.PENUGASAN==""||komplain.PENUGASAN=="null") && res.data.users.length>0){
                setInputUser({
                    NOMOR_INDUK : res.data.users[0].NOMOR_INDUK
                })
            } 
          }else{  
            // UserModel.logout();  
            // mainContext.setModalContext({
            //     open : true,
            //     message : "Sesi anda telah habis, silahkan login ulang"
            // }) 
            // history.push("/");
          }
    }
    /**Function ini digunakan untuk mengisi data user yang ditugaskan untuk menangani komplain berdasarkan parameter nomor komplain yang dikirim oleh user. Karena tujuan dari penugasan adalah menyimpan data user yang bertanggung jawab, sehingga akan dikirimkan parameter nomor induk user dalam request body. HTTP Request akan dijalankan menggunakan function Private Client, sehingga autentikasi juga dikirim dengan parameter token autentikasi di bagian header request, kepada endpoint API user/complained/penugasan/add/index_post/:nomor_komplain.  */
    async function sendPenugasan(){ 
        const payload = {
            "user" : inputUser.NOMOR_INDUK
        } 
        setisLoadingSubmit(true)
        const res =  await PrivateClient.post('/User/Complained/Penugasan/Add/index_post/'+no_komplain,payload);  

        mainContext.setModalContext({
            open : true,
            message : res.message
        }) 
        setisLoadingSubmit(false)
        if(res.status==200){ 
            // history.push("/user/complained/penugasan")
            setisLoading(true)
            fetchComplain();
        }
    }

    /**
     * Function ini digunakan untuk menghapus data user yang ditugaskan untuk menangani komplain berdasarkan parameter nomor komplain yang dikirim. HTTP Request akan dijalankan menggunakan function Private Client, sehingga autentikasi juga dikirim dengan parameter token autentikasi di bagian header request, kepada endpoint API “user/complained/penugasan/delete/index_get/:nomor_komplain”. 
     */
    async function deletePenugasan(){  
        const res =  await PrivateClient.get('/User/Complained/Penugasan/Delete/index_get/'+no_komplain);  
        setisLoadingSubmit(true)
        mainContext.setModalContext({
            open : true,
            message : res.message
        }) 
        setisLoadingSubmit(false)
        if(res.status==200){ 
            // history.push("/user/complained/penugasan")
            setisLoading(true)
            fetchComplain();
        }
    }
    useEffect(()=>{
        setisLoading(true)
        fetchComplain(); 
        
        routeContext.setRouteContext(path)  
    },[])
    return(
        <> 
            <PageTitle>Isi Penugasan</PageTitle>
            <Button icon="fas fa-fw fa-step-backward mr-2" backgroundColor="danger" href="/user/complained/penugasan">Kembali</Button> 
            <div className="row">
                <div className="col">
                    <label htmlFor="" className="form-label mt-4">Nomor Komplain : {no_komplain}</label>
                    
                </div>
            </div>  
        {!isLoading && 
            <div className="row mt-4">
                <div className="col">
                
                <label htmlFor="" className="form-label">Asal Divisi</label>
                    <input type="text" className="form-control" name="asalDivisi" value={komplain.NAMADIVISI} disabled/> 
                    <label htmlFor="topik" className="form-label mt-4">Topik</label>
                    <input type="text" className="form-control" name="topik" value={no_komplain+" - "+komplain.TDESKRIPSI} disabled/>

                    <label htmlFor="subtopik1" className="form-label mt-4">Subtopik 1</label>
                    <input type="text" className="form-control" name="subtopik1" value={komplain.SUB_TOPIK1+" - "+komplain.S1DESKRIPSI} disabled/>

                    <label htmlFor="subtopik2" className="form-label mt-4">Subtopik 2</label>
                    <input type="text" className="form-control" name="subtopik2" value={komplain.SUB_TOPIK2+" - "+ komplain.S2DESKRIPSI} disabled/>

                    <label htmlFor="" className="form-label mt-4">Tanggal Komplain</label>
                    <input type="text" className="form-control" name="tanggal" value={komplain.TGL_KEJADIAN} disabled/>


                    <label htmlFor="user" className="form-label mt-4">User untuk ditugaskan</label>
                    {komplain.PENUGASAN && <select name='user' className='form-control' defaultValue={komplain.PENUGASAN} disabled>
                        {users.map((user,index)=>{
                            return <option key={index} value={user.NOMOR_INDUK}>{user.NOMOR_INDUK} - {user.NAMA}</option>
                        })}
                    </select>}
                    {!komplain.PENUGASAN && <select name='user' className='form-control' defaultValue={inputUser.NOMOR_INDUK} onChange={changeUser}>
                        {users.map((user,index)=>{
                            return <option key={index} value={user.NOMOR_INDUK}>{user.NOMOR_INDUK} - {user.NAMA}</option>
                        })}
                    </select>} 

                </div> 
            </div>
    }

    <div className="row mt-4 mb-4">
        <div className="col">  
            {!komplain.PENUGASAN && 
            <>
                {!isLoadingSubmit && <Button icon="fas fa-fw fa-save mr-2" backgroundColor="primary" onclick={sendPenugasan} className="w-100">Simpan Penugasan</Button>}
                {isLoadingSubmit && <Button className="w-100"><Loading color="white"/></Button>}
                
            </>
            }
            {komplain.PENUGASAN && 
            <>
                {!isLoadingSubmit && <Button className="w-100" icon="fas fa-fw fa-trash mr-2" backgroundColor="danger" onclick={deletePenugasan}>Hapus Penugasan</Button>}
                {isLoadingSubmit && <Button className="w-100"><Loading color="white" backgroundColor="danger"/></Button>}
            </>
            } 
        </div>
    </div>
        </>
    )
}