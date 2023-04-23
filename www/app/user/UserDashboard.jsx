const UserDashboard = ()=>{
    return(
        <div className="mb-4"> 
            <PageTitle>Dashboard User</PageTitle> 
            <Button icon="fas fa-fw fa-paper-plane mr-2" href="/user/complain/add/pilihDivisi">Ajukan Komplain </Button> 
            <div className="row mt-2">
                <div className="col mt-2">
                    <Card1 judul="Komplain Terkirim" isi="10" icon="fa-paper-plane" warna="primary"/> 
                </div>
                <div className="col mt-2">
                    <Card1 judul="Komplain Diterima" isi="10" icon="fa-check" warna="primary"/>  
                </div>
                <div className="col mt-2">
                    <Card1 judul="Komplain Sedang Ditangani" isi="10" icon="fa-clock" warna="primary"/>  
                </div>
            </div>
            
            <h4 className="h4 mt-4 text-gray-800 font-weight-bold">Komplain Dikirim Bulan Ini</h4>
                    <Card1 judul="Belum Ada Komplain" isi="" icon="" warna="primary"/>  

            <h4 className="h4 mt-4 text-gray-800 font-weight-bold">Komplain Sedang Diselesaikan</h4>
                    <Card1 judul="Belum Ada Komplain" isi="" icon="" warna="primary"/>  
        </div>
    )
}