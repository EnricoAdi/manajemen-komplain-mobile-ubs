const UserListComplained = ()=>{
    const [data, setData] = useState([
        {
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
            <PageTitle>Daftar Komplain Mendatang dari Divisi Lain</PageTitle>
            <Button href="/user/complained/penugasan" icon="fas fa-fw fa-wrench mr-2" backgroundColor="primary">Ke Halaman Penugasan</Button>
            <div> 
                {data.map((item,index)=>{ 
                        return   <ComplainCard complain={item} key={index}/>
                    })}
            </div>
        
        </div>
    )
}