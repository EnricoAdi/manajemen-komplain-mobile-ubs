const AdminDashboard = ()=>{

    const mainContext = useContext(MainContext); 
    const routeContext = useContext(RouteContext);
    const [isLoading,setisLoading] = useState(false); 
    
    const history = useHistory();  

    const path = history.location.pathname;
    const [data, setData] = useState(
        {  
            bulanIni: "May",
            tahunIni: "2021"
        } 
    ); 
    const [jumlahKomplainMasukByYear, setJumlahKomplainMasukByYear] = useState([
        {

            TOTAL: '10',
            BULAN : 'January'
        },{

            TOTAL: '50',
            BULAN : 'February'
        }
    ])
    const [jumlahKomplainDivisiByMonth, setJumlahKomplainDivisiByMonth] = useState([
        {
            TOTAL: 10,
            NAMA : 'IT'
        },{
            TOTAL: 10,
            NAMA : 'ACCOUNTING'
        }
    ])
    fetchComplain = async ()=>{ 
        const res =  await PrivateClient.get('/Admin/Dashboard/index_get');    
        if(res.status<300){
          setData(res.data)    
          setJumlahKomplainMasukByYear(res.data.jumlahKomplainMasukByYear)
          setJumlahKomplainDivisiByMonth(res.data.jumlahKomplainDivisiByMonth)
          
          setisLoading(false) 
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
                 <BarChart title={"Komplain Masuk Tahun "+data.tahunIni} labels={jumlahKomplainMasukByYear.map((item)=>item.BULAN)} 
                data={jumlahKomplainMasukByYear.map((item)=>item.TOTAL)} 
                caption={"Grafik Jumlah Komplain Masuk Tahun  "+data.tahunIni} maks={100} id="chartKomplainMasuk" keteranganData="Jumlah Komplain"/> 
                 
                <DoughnutChart title="Divisi Terkomplain" labels={jumlahKomplainDivisiByMonth.map((item)=>item.NAMA)}  data={jumlahKomplainDivisiByMonth.map((item)=>item.TOTAL)}  caption={"Grafik Divisi Terkomplain Bulan "+data.bulanIni} id="chartDivisiTerkomplain"/> 
                
            </>}
        </>
    )
}