const UserListComplain = ()=>{  
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
            <PageTitle>Daftar Komplain Diajukan</PageTitle>
            <Button icon="fas fa-fw fa-paper-plane mr-2" href="/user/complain/add/page/1">Ajukan Komplain Baru</Button>
            <div> 
                {data.map((item,index)=>{ 
                        return   <ComplainCard complain={item} key={index}/>
                    })}
            </div>
        </div>
    ) 
}
