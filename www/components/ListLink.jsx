const ListLink = (props)=>{
    const history = useHistory();  
    const path = history.location.pathname.toLowerCase(); 
    return(
        <li className={`nav-item ${path==props.equal ? 'active font-weight-normal':''}`}>
            {props.children}
        </li>
    );
}