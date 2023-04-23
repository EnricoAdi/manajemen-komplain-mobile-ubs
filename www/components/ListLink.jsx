const ListLink = (props)=>{
    const history = useHistory();  
    const path = history.location.pathname.toLowerCase(); 
    return(
        <li className={`nav-item ${path==props.equal ? 'active':''}`}>
            {props.children}
        </li>
    );
}