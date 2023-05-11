 
const UserAddComplain = ()=>{
    // const {num} = useParams(); 
    return(
        <>
            <Switch>
                <Route exact path="/user/complain/add/pilihDivisi">
                        <UserAddComplainPilihDivisi />
                </Route>
                <Route exact path="/user/complain/add/pilihTopik/:divisiParam">
                        <UserAddComplainPilihTopik />
                </Route>
                <Route exact path="/user/complain/add/pilihSubtopik1/:divisiParam/:topikParam">
                        <UserAddComplainPilihSubtopik1 />
                </Route>
                <Route exact path="/user/complain/add/pilihSubtopik2/:divisiParam/:topikParam/:subtopik1Param">
                        <UserAddComplainPilihSubtopik2 />
                </Route>
                <Route exact path="/user/complain/add/pilihLampiran/:divisiParam/:topikParam/:subtopik1Param/:subtopik2Param/:tanggalParam">
                        <UserAddComplainPilihLampiran />
                </Route>
                <Route>   
                        <Redirect to="/user/complain/add/pilihDivisi"/> 
                </Route>
            </Switch>
        </>
    )
} 