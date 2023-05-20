const ManagerListComplain = ()=>{
    const mainContext = useContext(MainContext); 
    const routeContext = useContext(RouteContext);
    const [isLoading,setisLoading] = useState(false); 
    
    const history = useHistory();  

    const path = history.location.pathname;
    
    useEffect(()=>{  
        setisLoading(true) 
        routeContext.setRouteContext(path)   
    },[]) 
    return(
        <>
            <PageTitle>Manager List Complain</PageTitle>
        </>
    )
}