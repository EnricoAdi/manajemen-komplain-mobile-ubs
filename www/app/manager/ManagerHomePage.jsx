const ManagerParamPage = () =>{
    let {id} = useParams();
    return(
        <h1>Admin with param {id} </h1> 
    );    
}
const ManagerHomePage = () => {
    let logedIn = UserModel.get();
    
    return(
        <>   
            
            <Switch>  
                <Route path="/manager/:id">
                    <ManagerParamPage/>
                </Route>
                <Route path="/manager">
                    <div>managerasd</div>
                </Route>
            </Switch>
              
        </>
    )
}