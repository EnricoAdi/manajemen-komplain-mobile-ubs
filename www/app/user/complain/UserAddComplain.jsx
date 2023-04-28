const UserAddComplainPilihDivisi= ()=>{ 
    const history = useHistory();  
    const moveToPilihTopik = ()=>{ 
        history.push("/user/complain/add/pilihTopik/asd");
    }
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
                    <select className="form-control" name="divisi" id="divisi">
                        <option value=''></option> 
                          
                    </select> 
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
    let {divisi} = useParams();
    let topik = "asd"
    const moveToPilihSubTopik1 = ()=>{ 
        history.push(`/user/complain/add/pilihSubtopik1/${divisi}/${topik}`);
    }
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
                    <input type="text" className="form-control mb-3" name="divisi" value={divisi} disabled/>  
                    <label htmlFor="topik" className="form-label" >Topik</label>
                    <select className="form-control" name="topik" >
                        <option value=''></option> 
                          
                    </select> 
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
    let {divisi,topik} = useParams();
    let subtopik1 = "asd"
    const moveToPilihSubTopik2 = ()=>{ 
        history.push(`/user/complain/add/pilihSubtopik2/${divisi}/${topik}/${subtopik1}`);
    }
    return(
        <div> 
            <nav aria-label="breadcrumb">
            <ol className="breadcrumb" style={{backgroundColor:"#F1F2F5"}}>
                    <li className="breadcrumb-item"><Link to="/user/complain/add/pilihDivisi">Pilih Divisi</Link></li>
                    <li className="breadcrumb-item"><Link to={`/user/complain/add/pilihTopik/${divisi}`}>Pilih Topik</Link></li>
                    <li className="breadcrumb-item active">Pilih Subtopik1</li>
                    <li className="breadcrumb-item">...</li>
                </ol>
            </nav>
            <PageTitle>Tambah Komplain Baru</PageTitle>
            <label className="form-label">Silahkan pilih subtopik1 yang mau dikomplain</label>
            <div className="row mt-4">  
                <div className="col"> 
                    <label htmlFor="divisi" className="form-label" >Divisi</label>
                    <input type="text" className="form-control mb-3" name="divisi" value={divisi} disabled/>  
                    <label htmlFor="topik" className="form-label" >Topik</label>
                    <input type="text" className="form-control mb-3" name="topik" value={topik} disabled/>  
                </div>
            </div>
            <div className="row">
                <div className="col"> 
                    <label htmlFor="subtopik1" className="form-label" >Subtopik 1</label>
                    <select className="form-control" name="subtopik1"> 
                             <option value='$subtopik1->SUB_TOPIK1'> subtopik1</option>  
                    </select> 
                     
                </div>
                <div className="col"></div>
            </div>
            <div className="row mt-4">
                <div className="col">
                    <Button href={`/user/complain/add/pilihTopik/${divisi}`} backgroundColor="danger">Sebelumnya</Button> 
                    <Button onclick={moveToPilihSubTopik2} className="ml-2" backgroundColor="primary">Berikutnya</Button> 
                </div>
            </div> 
        </div>
    )
}
const UserAddComplainPilihSubtopik2 = ()=>{
    const history = useHistory();  
    //datenow
    const dateNow = new Date().toISOString().slice(0, 10)  
    //get 14 days before
    const minDate = new Date(new Date().setDate(new Date().getDate() - 14)).toISOString().slice(0, 10)
     
    let {divisi,topik,subtopik1} = useParams();
    let subtopik2 = "asd"
    let datePick = dateNow;
    const moveToPilihLampiran = ()=>{ 
        history.push(`/user/complain/add/pilihLampiran/${divisi}/${topik}/${subtopik1}/${subtopik2}/${datePick}`);
    }
    return(
        <div> 
        <nav aria-label="breadcrumb">
        <ol className="breadcrumb" style={{backgroundColor:"#F1F2F5"}}>
                <li className="breadcrumb-item"><Link to="/user/complain/add/pilihDivisi">Pilih Divisi</Link></li>
                <li className="breadcrumb-item"><Link to={`/user/complain/add/pilihTopik/${divisi}`}>Pilih Topik</Link></li>
                <li className="breadcrumb-item"><Link to={`/user/complain/add/pilihSubtopik1/${divisi}/${topik}`}>Pilih Subtopik1</Link></li> 
                <li className="breadcrumb-item active">Pilih Subtopik2</li>
                <li className="breadcrumb-item">...</li>
            </ol>
        </nav>
            <PageTitle>Tambah Komplain Baru</PageTitle>
            <label className="form-label">Silahkan pilih subtopik2 yang mau dikomplain</label>
            <div className="row mt-4">  
                <div className="col"> 
                    <label htmlFor="divisi" className="form-label" >Divisi</label>
                    <input type="text" className="form-control mb-3" name="divisi" value={divisi} disabled/>  
                    <label htmlFor="topik" className="form-label" >Topik</label>
                    <input type="text" className="form-control mb-3" name="topik" value={topik} disabled/>  
                </div>
            </div>
            <div className="row">
                <div className="col"> 
                    <label htmlFor="subtopik1" className="form-label" >Subtopik 1</label>
                    <input type="text" className="form-control mb-3" name="subtopik1" value={subtopik1} disabled/>  
                    <label htmlFor="tanggal" className="form-label" >Tanggal</label>
                    <input type="date" name="tanggal" id="tanggal" className="form-control mb-3" min={minDate}/>
              
                </div>
                <div className="col"> 
                    <label htmlFor="subtopik2" className="form-label" >Subtopik 2</label>
                    <select className="form-control" name="subtopik2"> 
                             <option value='$subtopik1->SUB_TOPIK1'> subtopik2</option>  
                    </select> 
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
    let {divisi,topik,subtopik1,subtopik2,tanggal} = useParams();
    return(
        <div className="mb-2"> 
            <nav aria-label="breadcrumb">
            <ol className="breadcrumb" style={{backgroundColor:"#F1F2F5"}}>
                    <li className="breadcrumb-item"><Link to="/user/complain/add/pilihDivisi">Pilih Divisi</Link></li>
                    <li className="breadcrumb-item"><Link to={`/user/complain/add/pilihTopik/${divisi}`}>Pilih Topik</Link></li>
                    <li className="breadcrumb-item"><Link to={`/user/complain/add/pilihSubtopik1/${divisi}/${topik}`}>Pilih Subtopik1</Link></li>
                    <li className="breadcrumb-item"><Link to={`/user/complain/add/pilihSubtopik2/${divisi}/${topik}/${subtopik1}`}>Pilih Subtopik2</Link></li>
                    <li className="breadcrumb-item active">Pilih Lampiran</li>
                    <li className="breadcrumb-item">...</li>
                </ol>
            </nav>
            
            <PageTitle>Tambah Komplain Baru</PageTitle>
            
            <div className="row">
                <div className="col">
                    <label className="form-label">Tanggal</label>
                    <input type="date" className="form-control" name="tanggal" value={tanggal} disabled/>
                </div>
            </div>
            <div className="row mt-4">  
                <div className="col"> 
                    <label htmlFor="divisi" className="form-label" >Divisi</label>
                    <input type="text" className="form-control mb-3" name="divisi" value={divisi} disabled/>  
                    <label htmlFor="topik" className="form-label" >Topik</label>
                    <input type="text" className="form-control mb-3" name="topik" value={topik} disabled/>  
                </div>
            </div>
            <div className="row">
                <div className="col"> 
                    <label htmlFor="subtopik1" className="form-label" >Subtopik 1</label>
                    <input type="text" className="form-control mb-3" name="subtopik1" value={subtopik1} disabled/>   
              
                </div>
                <div className="col"> 
                    <label htmlFor="subtopik2" className="form-label" >Subtopik 2</label>
                    <select className="form-control" name="subtopik2"> 
                             <option value='$subtopik1->SUB_TOPIK1'> subtopik2</option>  
                    </select> 
                </div>
            </div>
            <div className="row mt-2">
                <div className="col">
                <label className="form-label">Unggah Lampiran (.jpg, .png, .pdf, .docx, .xlsx, .txt)</label>
                <input type="file" className="form-control" name="lampiran[]" style={{paddingTop:"30px", paddingLeft:"20px", height:"100px"}}  accept=".jpg,.png,.pdf,.docx,.xls,.xlsx,.txt" multiple/></div>
                <div className="col"></div>
            </div>
            <div className="row mt-4">
                <div className="col"> 
                    <label className="form-label">Deskripsi Masalah</label>
                    <textarea name="deskripsi" className="form-control" cols="30" rows="3" required></textarea>
                </div>
            </div>
            
            <div className="row mt-4">
                <div className="col">
                    <Button href={`/user/complain/add/pilihSubtopik2/${divisi}/${topik}/${subtopik1}`} backgroundColor="danger">Sebelumnya</Button> 
                    <Button type="submit" className="ml-2">Berikutnya</Button> 
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
                <Route exact path="/user/complain/add/pilihTopik/:divisi">
                        <UserAddComplainPilihTopik />
                </Route>
                <Route exact path="/user/complain/add/pilihSubtopik1/:divisi/:topik">
                        <UserAddComplainPilihSubtopik1 />
                </Route>
                <Route exact path="/user/complain/add/pilihSubtopik2/:divisi/:topik/:subtopik1">
                        <UserAddComplainPilihSubtopik2 />
                </Route>
                <Route exact path="/user/complain/add/pilihLampiran/:divisi/:topik/:subtopik1/:subtopik2/:tanggal">
                        <UserAddComplainPilihLampiran />
                </Route>
                <Route> 
                    <PageTitle>Halaman ini tidak ada</PageTitle>
                </Route>
            </Switch>
        </>
    )
} 