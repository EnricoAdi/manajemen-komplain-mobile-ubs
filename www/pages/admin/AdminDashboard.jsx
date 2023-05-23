const AdminDashboard = ()=>{

    const mainContext = useContext(MainContext); 
    const routeContext = useContext(RouteContext);
    const [isLoading,setisLoading] = useState(false); 
    
    const history = useHistory();  

    const path = history.location.pathname;
    const [data, setData] = useState(
        { 
            jumlahKomplainDivisiByMonth: [], 
            bulanIni: "May",
            tahunIni: "2023"
        } 
    ); 
    fetchComplain = async ()=>{ 
        const res =  await PrivateClient.get('/Admin/Dashboard/index_get');    
        if(res.status<300){
          setisLoading(false) 
        //   setData(res.data)  
          console.log(res.data)
        //   if (res.data.komplainDiterima && res.data.komplainDiterima != "Belum ada") {
        //      setKomplainDiterima2(res.data.komplainDiterima[0].JUMLAH)
        //     }
        //     else {
        //         setKomplainDiterima2("<H1>Belum ada komplain diterima</H1>")
        //     }

          
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
        setisLoading(true)
        fetchComplain()
        
        routeContext.setRouteContext(path)   
    },[]) 
    return(
        <>
            <PageTitle>Dashboard Admin</PageTitle>
            {!isLoading && <> 
                <BarChart title="Komplain Masuk Tahun " labels={['a','b','c']} data={['1','2','3']} caption={"Grafik Jumlah Komplain Masuk Tahun  "+data.tahunIni} maks={100} id="chartKomplainMasuk" keteranganData="Jumlah Komplain"/> 

                <DoughnutChart title="Divisi Terkomplain" labels={['a','b','c']} data={['1','2','3']} caption={"Grafik Divisi Terkomplain Bulan "+data.bulanIni} id="chartDivisiTerkomplain"/> 
                
            </>}
        </>
    )
}