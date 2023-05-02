const ComplainCard = (props)=>{
    const {complain, onClick} = props;
    let bgColor = "primary";
    if(props.backgroundColor){
        bgColor = props.backgroundColor;
    };
    return(
        <Card header={"Nomor Komplain : "+complain.no_komplain} onClick={onClick} backgroundColor={bgColor}>
             <div className="mt-2">{complain.topik} - {complain.subtopik2} </div> 
                <div className="mt-2">  <i className="fas fa-calendar"></i> <span className="ml-2">{complain.tgl_komplain}</span> </div>
                <div className="mt-2">  <i className="fas fa-user"></i> <span className="ml-2">Divisi {complain.divisi}</span> </div>
                <div className="mt-2">  <i className="fas fa-check"></i> <span className="ml-2">Status : {complain.status}</span> </div>
                     
        </Card>
    )
}