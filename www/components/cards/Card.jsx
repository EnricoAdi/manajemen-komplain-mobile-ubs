const Card = (props)=>{
    const {header} = props;
    return (
        <div className="card shadow mb-4 mt-4"> 
            <div className="card-header py-3 bg-primary text-white">
                {header}
            </div>
            <div className="card-body rounded"> 
                {props.children}
            </div>
        </div>
    )
}