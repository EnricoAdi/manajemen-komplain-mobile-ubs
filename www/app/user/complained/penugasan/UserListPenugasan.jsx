const UserListPenugasan = ()=>{
    const [data, setData] = useState([
        {
            no_komplain: '12314188',
            tgl_komplain: '12/01/2023', //tanggal kejadian
            topik: 'Penanganan kuranga tepat',
            subtopik2: 'Kurang bersih',
            deskripsi_masalah: 'deskripsi masalah',
            divisi : 'asd',
            status: 'aktif'
        },{
            no_komplain: '12314188',
            tgl_komplain: '12/01/2023', //tanggal kejadian
            topik: 'Penanganan kuranga tepat',
            subtopik2: 'Kurang bersih',
            deskripsi_masalah: 'deskripsi masalah',
            divisi : 'asd',
            status: 'aktif'
        },
    ]);
    return(
        <div> 
            <PageTitle>Isi Penugasan</PageTitle>
            <Button icon="fas fa-fw fa-check mr-2" href="/user/complain/add/page/1">Halaman Verifikasi</Button>
            <div> 
                {data.map((item,index)=>{ 
                        return   <ComplainCard complain={item} key={index}/>
                    })}
            </div>
        </div>
    )
}