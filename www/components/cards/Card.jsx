const Card = (props)=>{
    const {header, onClick} = props;
    let bgColor = "primary";
    if(props.backgroundColor){
        bgColor = props.backgroundColor;
    };
    return (
        <div className="card mb-4 mt-4 boxCard" onClick={onClick}> 
            <div className={"card-header py-3 text-white bg-"+bgColor}>
                {header}
            </div>
            <div className="card-body rounded"> 
                {props.children}
            </div>
        </div>
    )
}