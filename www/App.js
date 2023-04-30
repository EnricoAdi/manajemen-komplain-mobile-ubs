const ManagerPage = () => <h1>Manager</h1>  

const App = ()=> {        
    
    const [modalContext, setModalContext] = useState({
        open : false,
        message : ""
    })  
    const [user,setUser] = useState({
        
    })
    useEffect(()=>{
        const user = UserModel.get();
        if(user!=null){
            setUser(user) 
        } 
    },[])
    return (
        <div className="modal-open"> 
            <React.Suspense fallback={<h1>Loading...</h1>}> 
                <MainContext.Provider value={{modalContext,setModalContext}}> 
                    <UserContext.Provider value={{user,setUser}}> 
                            <HashRouter>    
                                <Switch>   
                                    <Route path="/user">
                                        <UserHomePage/>
                                    </Route> 
                                    <Route path="/admin">
                                        <AdminHomePage/>
                                    </Route>
                                    <Route path="/gm">
                                        <LoginPage/>
                                    </Route>
                                    <Route path="/manager">
                                        <ManagerPage/>
                                    </Route>
                                    <Route exact path="/">
                                        <LoginPage/>
                                    </Route>   
                                    <Route>
                                        <Error404Page/>
                                    </Route>
                                </Switch>  
                            </HashRouter>   

                            {modalContext.open &&<Modal message={modalContext.message} />  }
                            
                    </UserContext.Provider>
                </MainContext.Provider>
            </React.Suspense>  
        </div>
    )
}
ReactDOM.render(<App/>,document.getElementById("root"));