const AdminParamPage = () =>{
    let {id} = useParams();
    return(
        <h1>Admin with param {id} </h1> 
    );    
}
const AdminHomePage = () => {
    let logedIn = UserModel.get();
    
    return(
        <>   
            
            <Switch>  
                <Route path="/admin/:id">
                    <AdminParamPage/>
                </Route>
                <Route path="/admin">
                    <div>adminasd</div>
                </Route>
            </Switch>
              
        </>
    )
}