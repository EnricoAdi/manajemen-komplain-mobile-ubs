const UserSolvedList = () => { 
    const mainContext = useContext(MainContext);
    const [isLoading,setisLoading] = useState(false); 
    
    const [data, setData] = useState([
        {
            no_komplain: '12314188',
            tgl_komplain: '12/01/2023',
            topik: 'Penanganan kurang tepat',
            subtopik2: 'Kurang bersih',
            deskripsi_masalah: 'deskripsi masalah',
            divisi : 'asd',
            status: 'aktif'
        },
        {
            no_komplain: '22314188',
            tgl_komplain: '12/01/2023',
            topik: 'Penanganan kurang tepat',
            subtopik2: 'Kurang bersih',
            deskripsi_masalah: 'deskripsi masalah',
            divisi : 'asd',
            status: 'aktif'
        },
        {
            no_komplain: '12314788',
            tgl_komplain: '12/01/2023',
            topik: 'Penanganan kurang tepat',
            subtopik2: 'Kurang bersih',
            deskripsi_masalah: 'deskripsi masalah',
            divisi : 'asd',
            status: 'aktif'
        }
    ]);
    // const [dataForTable, setDataForTable] = useState({
    //     key: ['No Komplain', 'Tgl Komplain', 'Topik', 'Subtopik 2', 'Deskripsi Masalah', 'Divisi Pengirim','Status'],
    //     value: [
    //         ['1', 'C', 'B', 'C', 'A','A','S'],
    //         ['2', 'B', 'S', 'C', 'F','G','S'],
    //         ['3', 'A', 'B', 'D', 'E','A','H']
    //     ]
    // })
    fetchComplain = async ()=>{ 
        const res =  await PrivateClient.get('/User/Complain/Solved/Fetch/index_get');    
        if(res.status){
          setisLoading(false) 
          setData(
              res.data.map((item)=>{
                  return {
                      no_komplain: item.NO_KOMPLAIN,
                      tgl_komplain: "Tanggal Komplain : "+item.TGL_TERBIT,
                      topik: item.TOPIK,
                      subtopik2: item.SUB_TOPIK2,
                      deskripsi_masalah: item.DESKRIPSI_MASALAH,
                      divisi: "Dikomplain : "+item.NAMA,
                      status: item.STATUS
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
    moveTo = ()=>{
        alert('move to')
    }
    useEffect(()=>{ 
        setisLoading(true)
        fetchComplain()
    },[]) 
    return(
        <div>
            <PageTitle>Daftar Penyelesaian Komplain Diterima</PageTitle>
            {/* <Table title="Daftar Penyelesaian Komplain Diterima" data={dataForTable}/> */}
            <div> 
                {isLoading &&<div className="mt-4"> 
                    <Loading color="primary"/>
                </div> }
                {!isLoading && data.map((item,index)=>{ 
                    return <ComplainCard complain={item} key={index} onClick={moveTo}/>
                })}
                {!isLoading && data.length < 1  && <div className="mt-4">
                <Card1 judul="Belum Ada Penyelesaian Komplain Diberikan" isi="" icon="" warna="primary"/>
                </div>}
            </div>
       

        </div>
    )
}