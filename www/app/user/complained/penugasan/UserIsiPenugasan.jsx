const UserIsiPenugasan = ()=>{
    const mainContext = useContext(MainContext);
    const history = useHistory();
    const [isLoading,setisLoading] = useState(false); 
    const [isLoadingSubmit,setisLoadingSubmit] = useState(false); 
    const {no_komplain} = useParams();
    const [komplain,setKomplain] = useState({
        NO_KOMPLAIN : no_komplain,
        PENUGASAN : "null",
    })
    const [users,setUsers] = useState([
        {
            kode : "123",
            nama : "asd"
        }
    ])
    return(
        <> 
            <PageTitle>Isi Penugasan</PageTitle>
            <Button icon="fas fa-fw fa-step-backward mr-2" backgroundColor="danger" href="/user/complained/penugasan">Kembali</Button> 
            <div className="row">
                <div className="col">
                    <label htmlFor="" className="form-label mt-4">Nomor Komplain : {no_komplain}</label>
                    
                </div>
            </div>
            
    <div className="row mt-4">
        <div className="col">
            <label htmlFor="topik" className="form-label">Topik</label>
            <input type="text" className="form-control" name="topik" value="komplain->TOPIK  - komplain->TDESKRIPSI" disabled/>

            <label htmlFor="subtopik1" className="form-label mt-4">Subtopik 1</label>
            <input type="text" className="form-control" name="subtopik1" value="komplain->SUB_TOPIK1 - komplain->S1DESKRIPSI" disabled/>

            <label htmlFor="subtopik2" className="form-label mt-4">Subtopik 2</label>
            <input type="text" className="form-control" name="subtopik2" value="<?= $komplain->SUB_TOPIK2; ?> - <?= $komplain->S2DESKRIPSI; ?>" disabled/>

            <label htmlFor="user" className="form-label mt-4">User untuk ditugaskan</label>
            {komplain.PENUGASAN && <select name='user' className='form-control' defaultValue={komplain.PENUGASAN} disabled>
                {users.map((user,index)=>{
                    return <option key={index} value={user.kode}>{user.kode} - {user.nama}</option>
                })}
            </select>}
            {!komplain.PENUGASAN && <select name='user' className='form-control' disabled>
                {users.map((user,index)=>{
                    return <option key={index} value={user.kode}>{user.kode} - {user.nama}</option>
                })}
            </select>} 
        </div>
        <div className="col">
            <label htmlFor="" className="form-label">Tanggal Komplain</label>
            <input type="text" className="form-control" name="tanggal" value="<?= $komplain->TGL_KEJADIAN; ?>" disabled/>

            <label htmlFor="" className="form-label mt-4">Asal Divisi</label>
            <input type="text" className="form-control" name="asalDivisi" value="<?= $komplain->PENERBIT->NAMA; ?>" disabled/>
        </div>
    </div>

    <div className="row mt-4">
        <div className="col">  
            {!komplain.PENUGASAN && <Button icon="fas fa-fw fa-save mr-2" backgroundColor="primary">Simpan Penugasan</Button>}
            {komplain.PENUGASAN && <Button icon="fas fa-fw fa-trash mr-2" backgroundColor="danger">Hapus Penugasan</Button>}
            
          
        </div>
    </div>
        </>
    )
}