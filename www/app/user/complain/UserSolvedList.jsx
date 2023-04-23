const UserSolvedList = () => {
    const [data, setData] = useState([
        {
            no_komplain: '12314188',
            tgl_komplain: '12/01/2023',
            topik: 'Penanganan kuranga tepat',
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
    const [dataForTable, setDataForTable] = useState({
        key: ['No Komplain', 'Tgl Komplain', 'Topik', 'Subtopik 2', 'Deskripsi Masalah', 'Divisi Pengirim','Status'],
        value: [
            ['1', 'C', 'B', 'C', 'A','A','S'],
            ['2', 'B', 'S', 'C', 'F','G','S'],
            ['3', 'A', 'B', 'D', 'E','A','H']
        ]
    })
    useEffect(()=>{
        setTimeout(() => { 
        }, 4000); 
    },[]) 
    return(
        <div>
            <PageTitle>Daftar Penyelesaian Komplain Diterima</PageTitle>
            {/* <Table title="Daftar Penyelesaian Komplain Diterima" data={dataForTable}/> */}
            <div>
                {data.map((item,index)=>{ 
                    return   <ComplainCard complain={item} key={index}/>
                })}
            </div>
       

        </div>
    )
}