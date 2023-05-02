const UserAddComplainPilihDivisi= ()=>{ 
    const history = useHistory();   
    const mainContext = useContext(MainContext);
    const [isLoading,setisLoading] = useState(false); 
    const [data, setData] = useState([
        {
            kode: 'AC',
            nama: 'ACCOUNTING' 
        } 
    ]); 
    const [divisi,setDivisi] = useState("")

    const moveToPilihTopik = ()=>{ 
        history.push("/user/complain/add/pilihTopik/"+divisi);
    }
    async function fetchDivisi(){ 
        const res =  await PrivateClient.get('/User/Complain/Add/PilihDivisi/index_get');    
        if(res.status){
          setisLoading(false) 
          setData(
              res.data.map((item)=>{
                  return {
                      kode: item.KODE_DIVISI, 
                      nama: item.NAMA_DIVISI 
                  }
              }) 
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
    const onChangeDivisi = (e)=>{
        setDivisi(e.target.value) 
    } 
    useEffect(()=>{ 
        setisLoading(true)
        fetchDivisi().then((res)=>setDivisi(data[0].kode))
    },[])
    return(
        <div> 
        <nav aria-label="breadcrumb">
        <ol className="breadcrumb" style={{backgroundColor:"#F1F2F5"}}>
                <li className="breadcrumb-item active">Pilih Divisi</li>
                <li className="breadcrumb-item">...</li>
            </ol>
        </nav>
            <PageTitle>Tambah Komplain Baru</PageTitle> 
            <label className="form-label">Silahkan pilih divisi yang mau dikomplain</label> 
            <div className="row mt-4">  
                <div className="col">
                    <label className="form-label">Silahkan pilih divisi yang mau dikomplain</label>
                    {isLoading &&<div className="mt-4"> 
                        <Loading color="primary"/>
                    </div> }
                    {!isLoading && 
                        <select className="form-control" name="divisi" id="divisi" onChange={onChangeDivisi}> 
                            {data.map((item,index)=>{
                                return <option value={item.kode} key={index} >{item.kode} - {item.nama}</option>
                            })}
                        </select> 
                    }
                </div>
            </div>
            <div className="row mt-4">
                <div className="col">
                    <Button onclick={moveToPilihTopik} backgroundColor="primary">Berikutnya</Button> 
                </div>
            </div> 
        </div>
    )
}
const UserAddComplainPilihTopik = ()=>{  
    const history = useHistory();  
    const mainContext = useContext(MainContext);
    const [isLoading,setisLoading] = useState(false); 
    let {divisiParam} = useParams();
    const [divisi,setDivisi] = useState({ 
        kode: divisiParam,
        nama: 'ACCOUNTING' 
    })
    const [topik,setTopik] = useState("");
    const [data, setData] = useState([
        {
            kode: 'CAR',
            topik: 'COST' 
        } 
    ]);  
    
    const moveToPilihSubTopik1 = ()=>{ 
        history.push(`/user/complain/add/pilihSubtopik1/${divisiParam}/${topik}`);
    }
    async function fetchTopik(){ 
        const res =  await PrivateClient.get('/User/Complain/Add/PilihTopik/index_get/'+divisiParam);    
        if(res.status){
          setisLoading(false) 
          setData(
              res.data.map((item)=>{
                  return {
                      kode: item.KODE_TOPIK, 
                      topik: item.TOPIK 
                  }
              }) 
          )
          setDivisi({
            kode: res.divisi.KODE_DIVISI,
            nama: res.divisi.NAMA_DIVISI,
          })
          return {
            kode: res.data[0].KODE_TOPIK,
            topik: res.data[0].TOPIK
          }
        }else{  
          UserModel.logout();  
          mainContext.setModalContext({
              open : true,
              message : "Sesi anda telah habis, silahkan login ulang"
          }) 
          history.push("/");
        }
    }
    const onChangeTopik = (e)=>{
        setTopik(e.target.value)  
    } 
    useEffect(()=>{ 
        setisLoading(true)
        fetchTopik().then((res)=>{ 
            setTopik(res.kode)
        })
    },[])
    return(
        <div> 
            <nav aria-label="breadcrumb">
            <ol className="breadcrumb" style={{backgroundColor:"#F1F2F5"}}>
                    <li className="breadcrumb-item"><Link to="/user/complain/add/pilihDivisi">Pilih Divisi</Link></li>
                    <li className="breadcrumb-item active">Pilih Topik</li>
                    <li className="breadcrumb-item">...</li>
                </ol>
            </nav>
            <PageTitle>Tambah Komplain Baru</PageTitle>
            <label className="form-label">Silahkan pilih topik yang mau dikomplain</label>
            <div className="row mt-4">  
                <div className="col"> 
                    <label htmlFor="divisi" className="form-label" >Divisi</label>
                    <input type="text" className="form-control mb-3" name="divisi" value={divisi.kode+" - "+divisi.nama} disabled/>  
                    <label htmlFor="topik" className="form-label" >Topik</label>
                    {isLoading &&<div className="mt-4"> 
                        <Loading color="primary"/>
                    </div> }
                    {!isLoading &&
                        <select className="form-control" name="topik" onChange={onChangeTopik}> 
                            {data.map((item,index)=>{
                            return <option value={item.kode} key={index} >{item.kode} - {item.topik}</option>
                            })}
                        </select>  
                    }
                </div>
            </div>
            <div className="row mt-4">
                <div className="col">
                    <Button href="/user/complain/add/pilihDivisi" backgroundColor="danger">Sebelumnya</Button> 
                    <Button onclick={moveToPilihSubTopik1} className="ml-2" backgroundColor="primary">Berikutnya</Button> 
                </div>
            </div> 
        </div>
    )
}
const UserAddComplainPilihSubtopik1 = ()=>{
    const history = useHistory();  
    let {divisiParam,topikParam} = useParams();
    const mainContext = useContext(MainContext);
    const [isLoading,setisLoading] = useState(false); 

    const [divisi,setDivisi] = useState({ 
        kode: divisiParam,
        nama: 'ACCOUNTING' 
    })
    const [topik,setTopik] = useState({
        kode: topikParam,
        topik : 'ACCOUNTING'
    });
    const [data, setData] = useState([
        {
            sub_topik1: '0001',
            deskripsi: 'ABCD' 
        } 
    ]);  
    const [subtopik1,setSubtopik1] = useState("0001")

    const moveToPilihSubTopik2 = ()=>{ 
        history.push(`/user/complain/add/pilihSubtopik2/${divisiParam}/${topikParam}/${subtopik1}`);
    }
    async function fetchSubTopik1(){ 
        const res =  await PrivateClient.get(`/User/Complain/Add/PilihSubTopik1/index_get/${divisiParam}/${topikParam}`);    

        if(res.status){
          setisLoading(false) 
          setData(
              res.data.map((item)=>{
                  return {
                      sub_topik1: item.SUB_TOPIK1, 
                      deskripsi: item.DESKRIPSI 
                  }
              }) 
          )
          setDivisi({
            kode: res.divisi.KODE_DIVISI,
            nama: res.divisi.NAMA_DIVISI,
          })
          setTopik({
            kode: res.topik.KODE_TOPIK,
            topik: res.topik.TOPIK,
          })
          if(res.data.length > 0 ){ 
            return { 
                sub_topik1: res.data[0].SUB_TOPIK1, 
                deskripsi: res.data[0].DESKRIPSI 
            }
          }else{
            return { 
                sub_topik1: "", 
                deskripsi: "" 
            }
          }
        }else{  
          UserModel.logout();  
          mainContext.setModalContext({
              open : true,
              message : "Sesi anda telah habis, silahkan login ulang"
          }) 
          history.push("/");
        }
    }
    const onChangeSubTopik1 = (e)=>{
        setSubtopik1(e.target.value)  
    } 
    useEffect(()=>{ 
        setisLoading(true)
        fetchSubTopik1().then((res)=>{ 
            setSubtopik1(res.sub_topik1) 
        })
    },[])
    return(
        <div> 
            <nav aria-label="breadcrumb">
            <ol className="breadcrumb" style={{backgroundColor:"#F1F2F5"}}>
                    <li className="breadcrumb-item"><Link to="/user/complain/add/pilihDivisi">Pilih Divisi</Link></li>
                    <li className="breadcrumb-item"><Link to={`/user/complain/add/pilihTopik/${divisiParam}`}>Pilih Topik</Link></li>
                    <li className="breadcrumb-item active">Pilih Subtopik1</li>
                    <li className="breadcrumb-item">...</li>
                </ol>
            </nav>
            <PageTitle>Tambah Komplain Baru</PageTitle>
            <label className="form-label">Silahkan pilih subtopik1 yang mau dikomplain</label> 
            <div className="row mt-4">  
                <div className="col"> 
                    <label htmlFor="divisi" className="form-label" >Divisi</label>
                    <input type="text" className="form-control mb-3" name="divisi" value={divisiParam+ " - "+divisi.nama} disabled/>  
                    <label htmlFor="topik" className="form-label" >Topik</label>
                    <input type="text" className="form-control mb-3" name="topik"  value={topikParam+ " - "+topik.topik} disabled/>  
                </div>
            </div>
            <div className="row">
                <div className="col"> 
                    <label htmlFor="subtopik1" className="form-label" >Subtopik 1</label>
                    
                    {isLoading &&<div className="mt-4"> 
                        <Loading color="primary"/>
                    </div> }
                    {!isLoading && 
                    <select className="form-control" name="subtopik1" onChange={onChangeSubTopik1}> 
                    {data.map((item,index)=>{
                        return <option value={item.sub_topik1} key={index} >{item.sub_topik1} - {item.deskripsi}</option>
                    })} 
                    </select> }

                    
                     
                </div>
                <div className="col"></div>
            </div>
            <div className="row mt-4">
                <div className="col">
                    <Button href={`/user/complain/add/pilihTopik/${divisiParam}`} backgroundColor="danger">Sebelumnya</Button> 
                    <Button onclick={moveToPilihSubTopik2} className="ml-2" backgroundColor="primary">Berikutnya</Button> 
                </div>
            </div> 
        </div>
    )
}
const UserAddComplainPilihSubtopik2 = ()=>{
    const history = useHistory();  
    const [isLoading,setisLoading] = useState(false);  
    let {divisiParam,topikParam,subtopik1Param} = useParams(); 

    const [divisi,setDivisi] = useState({ 
        kode: divisiParam,
        nama: 'ACCOUNTING' 
    })
    const [topik,setTopik] = useState({
        kode: topikParam,
        topik : 'ACCOUNTING'
    });
    const [subtopik1,setSubtopik1] = useState({ 
        sub_topik1: subtopik1Param,
        deskripsi: 'ABCD' 
    });
    const [data, setData] = useState([
        {
            sub_topik2: '0001',
            deskripsi: 'ABCD' 
        } 
    ]);  
    //datenow
    const dateNow = new Date().toISOString().slice(0, 10)  
    //get 14 days before
    const minDate = new Date(new Date().setDate(new Date().getDate() - 14)).toISOString().slice(0, 10)
      

    const [subtopik2, setSubtopik2] = useState("0001");
    const [datePick, setDatePick] = useState(dateNow);

    async function fetchSubTopik2(){ 
        const res =  await PrivateClient.get(`/User/Complain/Add/PilihSubTopik2/index_get/${divisiParam}/${topikParam}/${subtopik1Param}`);    

        if(res.status){
          setisLoading(false) 
          setData(
              res.data.map((item)=>{
                  return {
                      sub_topik2: item.SUB_TOPIK2, 
                      deskripsi: item.S2DESKRIPSI 
                  }
              }) 
          )
          setDivisi({
            kode: res.divisi.KODE_DIVISI,
            nama: res.divisi.NAMA_DIVISI,
          })
          setTopik({
            kode: res.topik.KODE_TOPIK,
            topik: res.topik.TOPIK,
          })
          setSubtopik1({
            sub_topik1: res.subtopik1.SUB_TOPIK1,
            deskripsi: res.subtopik1.DESKRIPSI,
          })
          if(res.data.length > 0 ){ 
            return { 
                sub_topik2: res.data[0].SUB_TOPIK2, 
                deskripsi: res.data[0].S2DESKRIPSI 
            }
          }else{
            return { 
                sub_topik2: "", 
                deskripsi: "" 
            }
          }
        }else{  
          UserModel.logout();  
          mainContext.setModalContext({
              open : true,
              message : "Sesi anda telah habis, silahkan login ulang"
          }) 
          history.push("/");
        }
    }
    const onChangeSubTopik2 = (e)=>{
        setSubtopik2(e.target.value)  
    } 
    const onChangeDatePick = (e)=>{
        setDatePick(e.target.value)
    }
    useEffect(()=>{ 
        setisLoading(true)
        fetchSubTopik2().then((res)=>{ 
            setSubtopik2(res.sub_topik2) 
        })
    },[])
    const moveToPilihLampiran = ()=>{ 
        history.push(`/user/complain/add/pilihLampiran/${divisiParam}/${topikParam}/${subtopik1Param}/${subtopik2}/${datePick}`);
    }
    return(
        <div> 
        <nav aria-label="breadcrumb">
        <ol className="breadcrumb" style={{backgroundColor:"#F1F2F5"}}>
                <li className="breadcrumb-item"><Link to="/user/complain/add/pilihDivisi">Pilih Divisi</Link></li>
                <li className="breadcrumb-item"><Link to={`/user/complain/add/pilihTopik/${divisiParam}`}>Pilih Topik</Link></li>
                <li className="breadcrumb-item"><Link to={`/user/complain/add/pilihSubtopik1/${divisiParam}/${topikParam}`}>Pilih Subtopik1</Link></li> 
                <li className="breadcrumb-item active">Pilih Subtopik2</li>
                <li className="breadcrumb-item">...</li>
            </ol>
        </nav>
            <PageTitle>Tambah Komplain Baru</PageTitle>
            <label className="form-label">Silahkan pilih subtopik2 yang mau dikomplain</label>
            <div className="row mt-4">  
                <div className="col"> 
                    <label htmlFor="divisi" className="form-label" >Divisi</label>
                    <input type="text" className="form-control mb-3" name="divisi" value={divisi.kode+" - "+divisi.nama} disabled/>  
                    <label htmlFor="topik" className="form-label" >Topik</label>
                    <input type="text" className="form-control mb-3" name="topik" value={topik.kode+" - "+topik.topik} disabled/>  
                </div>
            </div>
            <div className="row">
                <div className="col"> 
                    <label htmlFor="subtopik1" className="form-label" >Subtopik 1</label>
                    <input type="text" className="form-control mb-3" name="subtopik1" value={subtopik1.sub_topik1+" - "+subtopik1.deskripsi} disabled/>  
                    <label htmlFor="tanggal" className="form-label" >Tanggal</label>
                    <input type="date" name="tanggal" id="tanggal" className="form-control mb-3" min={minDate} onChange={onChangeDatePick}/>
              
                </div>
                <div className="col"> 
                    <label htmlFor="subtopik2" className="form-label" >Subtopik 2</label>
                    
                    {isLoading &&<div className="mt-4"> 
                        <Loading color="primary"/>
                    </div> }
                    {!isLoading && 
                        <select className="form-control" name="subtopik2" onChange={onChangeSubTopik2}>  
                                {data.map((item,index)=>{
                                    return <option value={item.sub_topik2} key={index} >{item.sub_topik2} - {item.deskripsi}</option>
                                })} 
                        </select>  
                    } 
                </div>
            </div>
            <div className="row mt-4">
                <div className="col">
                    <Button href={`/user/complain/add/pilihSubtopik1/${divisi}/${topik}`} backgroundColor="danger">Sebelumnya</Button> 
                    <Button onclick={moveToPilihLampiran} className="ml-2">Berikutnya</Button> 
                </div>
            </div>
        </div>
    )
}
const UserAddComplainPilihLampiran = ()=>{
    const history = useHistory();  
    const [isLoading,setisLoading] = useState(false);  
    let {divisiParam,topikParam,subtopik1Param,subtopik2Param,tanggalParam} = useParams();
    const [divisi,setDivisi] = useState({ 
        kode: divisiParam,
        nama: 'ACCOUNTING' 
    })
    const [topik,setTopik] = useState({
        kode: topikParam,
        topik : 'ACCOUNTING'
    });
    const [subtopik1,setSubtopik1] = useState({ 
        sub_topik1: subtopik1Param,
        deskripsi: 'ABCD' 
    });
    const [subtopik2, setSubtopik2] = useState(
        {
            sub_topik2: subtopik2Param,
            deskripsi: 'ABCD' 
        } 
    ); 
    
    const [fileList, setFileList] = useState([])
    const handleFileChange = (e)=>{
        setFileList(e.target.files) 
    }

    const [deskripsi, setDeskripsi] = useState("")
    const changeDeskripsi = (e)=>{
        setDeskripsi(e.target.value) 
    }

    async function sendComplain(){ 
        if(deskripsi==""){ 
            mainContext.setModalContext({
                open : true,
                message : "Semua input harus diisi"
            }) 
            return;
        }
        setisLoading(true)
        const formData = new FormData();
        formData.append("deskripsi",deskripsi)
        // let data = {
        //     "deskripsi" : deskripsi,
        //     "lampiran" : fileList[0].name
        // } 
        // console.log(fileList[0].name)
        if(fileList.length<1){
            // data = {
            //     "deskripsi" : deskripsi,
            //     "lampiran" : []
            // } 
            formData.append("lampiran[]",{})
        }else{ 
            formData.append("lampiran[]",fileList[0])
        }

        const result =  await PrivateClient.post_file(`/User/Complain/Add/SendComplain/index_post/${divisiParam}/${topikParam}/${subtopik1Param}/${subtopik2Param}/${tanggalParam}`,formData);   
        if(result.status){  
            setisLoading(false)
        }else{

            setisLoading(false)
        } 
        mainContext.setModalContext({
            open : true,
            message : result.message
        }) 
    }
    async function fetchData(){ 
        const res =  await PrivateClient.get(`/User/Complain/Add/PilihLampiran/index_get/${divisiParam}/${topikParam}/${subtopik1Param}/${subtopik2Param}`);    

        if(res.status){  
          setSubtopik2(
            {
                sub_topik2: res.subtopik2.SUB_TOPIK2, 
                deskripsi: res.subtopik2.DESKRIPSI 
            } 
          )
          setDivisi({
            kode: res.divisi.KODE_DIVISI,
            nama: res.divisi.NAMA_DIVISI,
          })
          setTopik({
            kode: res.topik.KODE_TOPIK,
            topik: res.topik.TOPIK,
          })
          setSubtopik1({
            sub_topik1: res.subtopik1.SUB_TOPIK1,
            deskripsi: res.subtopik1.DESKRIPSI,
          }) 
        }else{  
          UserModel.logout();  
          mainContext.setModalContext({
              open : true,
              message : "Sesi anda telah habis, silahkan login ulang"
          }) 
          history.push("/");
        }
    }
    
    useEffect(()=>{ 
        setisLoading(false)
        fetchData()
    },[])
    return(
        <div className="mb-2"> 
            <nav aria-label="breadcrumb">
            <ol className="breadcrumb" style={{backgroundColor:"#F1F2F5"}}>
                    <li className="breadcrumb-item"><Link to="/user/complain/add/pilihDivisi">Pilih Divisi</Link></li>
                    <li className="breadcrumb-item"><Link to={`/user/complain/add/pilihTopik/${divisiParam}`}>Pilih Topik</Link></li>
                    <li className="breadcrumb-item"><Link to={`/user/complain/add/pilihSubtopik1/${divisiParam}/${topikParam}`}>Pilih Subtopik1</Link></li>
                    <li className="breadcrumb-item"><Link to={`/user/complain/add/pilihSubtopik2/${divisiParam}/${topikParam}/${subtopik1Param}`}>Pilih Subtopik2</Link></li>
                    <li className="breadcrumb-item active">Pilih Lampiran</li>
                    <li className="breadcrumb-item">...</li>
                </ol>
            </nav>
            
            <PageTitle>Tambah Komplain Baru</PageTitle>
            
            <div className="row">
                <div className="col">
                    <label className="form-label">Tanggal</label>
                    <input type="date" className="form-control" name="tanggal" value={tanggalParam} disabled/>
                </div>
            </div>
            <div className="row mt-4">  
                <div className="col"> 
                    <label htmlFor="divisi" className="form-label" >Divisi</label>
                    <input type="text" className="form-control mb-3" name="divisi" value={divisi.kode+" - "+divisi.nama} disabled/>  
                    <label htmlFor="topik" className="form-label" >Topik</label>
                    <input type="text" className="form-control mb-3" name="topik" value={topik.kode+" - "+topik.topik} disabled/>  
                </div>
            </div>
            <div className="row">
                <div className="col"> 
                    <label htmlFor="subtopik1" className="form-label" >Subtopik 1</label>
                    <input type="text" className="form-control mb-3" name="subtopik1" value={subtopik1.sub_topik1+" - "+subtopik1.deskripsi} disabled/>   
              
                </div>
                <div className="col"> 
                    <label htmlFor="subtopik2" className="form-label" >Subtopik 2</label> 
                    <input type="text" className="form-control mb-3" name="subtopik2" value={subtopik2.sub_topik2+" - "+subtopik2.deskripsi} disabled/>   
                </div>
            </div>
            <div className="row mt-2">
                <div className="col">
                <label className="form-label">Unggah Lampiran (.jpg, .png, .pdf, .docx, .xlsx, .txt)</label>
                <input type="file" className="form-control" name="lampiran[]" style={{paddingTop:"30px", paddingLeft:"20px", height:"100px"}}  accept=".jpg,.png,.pdf,.docx,.xls,.xlsx,.txt" multiple onChange={handleFileChange}/></div>
                <div className="col"></div>
            </div>
            <div className="row mt-4">
                <div className="col"> 
                    <label className="form-label">Deskripsi Masalah</label>
                    <textarea name="deskripsi" className="form-control" cols="30" rows="3" onChange={changeDeskripsi} required></textarea>
                </div>
            </div>
            
            <div className="row mt-4">
                <div className="col">
                    <Button href={`/user/complain/add/pilihSubtopik2/${divisiParam}/${topikParam}/${subtopik1Param}`} backgroundColor="danger">Sebelumnya</Button> 
                    {isLoading && <Button className="ml-2"> <Loading color="white"/></Button> }
                    {!isLoading &&
                    <Button type="submit" className="ml-2" icon="fas fa-fw fa-paper-plane mr-2" onclick={sendComplain}>Kirim</Button>  }

                </div>
            </div>
        </div>
    )
}
const UserAddComplain = ()=>{
    // const {num} = useParams();

    return(
        <>
            <Switch>
                <Route exact path="/user/complain/add/pilihDivisi">
                        <UserAddComplainPilihDivisi />
                </Route>
                <Route exact path="/user/complain/add/pilihTopik/:divisiParam">
                        <UserAddComplainPilihTopik />
                </Route>
                <Route exact path="/user/complain/add/pilihSubtopik1/:divisiParam/:topikParam">
                        <UserAddComplainPilihSubtopik1 />
                </Route>
                <Route exact path="/user/complain/add/pilihSubtopik2/:divisiParam/:topikParam/:subtopik1Param">
                        <UserAddComplainPilihSubtopik2 />
                </Route>
                <Route exact path="/user/complain/add/pilihLampiran/:divisiParam/:topikParam/:subtopik1Param/:subtopik2Param/:tanggalParam">
                        <UserAddComplainPilihLampiran />
                </Route>
                <Route>   
                        <Redirect to="/user/complain/add/pilihDivisi"/> 
                </Route>
            </Switch>
        </>
    )
} 