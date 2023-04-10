const Button = (btnProps)=>{
    let {type,id,icon,backgroundColor,href, btnStyle} = btnProps;

    type==="" ? type="button" : type=type; 
    let className = "btn btn"+backgroundColor; 
    icon!="" ? icon = <i className={icon}></i> : "";
    
    switch(backgroundColor){
        case "primary":
            backgroundColor = color.PRIMARY;
            break;
        case "secondary":
            backgroundColor = "#6c757d";
            break;
        case "success":
            backgroundColor = "#19AD6A";
            break;
        case "danger":
            backgroundColor = color.ERROR;
            break;
        case "error":
            backgroundColor = color.ERROR;
            break;
        case "warning":
            backgroundColor = "#E9B114";
            break;
        case "info":
            backgroundColor = "#17a2b8";
            break;
        case "light":
            backgroundColor = "#f8f9fa";
            break;
        case "dark":
            backgroundColor = "#343a40";
            break;
        default:
            backgroundColor = color.PRIMARY;
    } 
    btnStyle = {
        ...btnStyle,
        color:"white",
        paddingLeft: "30px",
        paddingRight: "30px",
        paddingTop:"10px",
        paddingBottom:"10px",
        backgroundColor: backgroundColor 
    };   
    return(
        <>  
            {href!=null && 
                <Link to={href}> 
                        <button  type={type} id={id} className={className} style={btnStyle}>  
                            {icon}
                            {btnProps.children}
                        </button>
                </Link> 
            }
            {href==null&& 
            <button type={type} id={id} className={className} style={btnStyle}>  
                {icon}
                {btnProps.children}
            </button>
            }
        </>
    );
}

// export default Button;