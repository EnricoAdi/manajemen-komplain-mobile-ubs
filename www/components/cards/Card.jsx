const Card = (props)=>{
    const {header, onClick} = props;
    return (
        <div className="card mb-4 mt-4 boxCard" onClick={onClick}> 
            <div className="card-header py-3 bg-primary text-white">
                {header}
            </div>
            <div className="card-body rounded"> 
                {props.children}
            </div>
        </div>
    )
}