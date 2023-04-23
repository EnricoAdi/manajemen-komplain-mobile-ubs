const ComplainCard = (props)=>{
    const {complain} = props;
    return(
        <Card header={"Nomor Komplain : "+complain.no_komplain}>
             <div className="mt-2">{complain.topik} - {complain.subtopik2} </div> 
                <div className="mt-2">  <i className="fas fa-calendar"></i> <span className="ml-2">{complain.tgl_komplain}</span> </div>
                <div className="mt-2">  <i className="fas fa-user"></i> <span className="ml-2">Divisi {complain.divisi}</span> </div>
                <div className="mt-2">  <i className="fas fa-check"></i> <span className="ml-2">{complain.status}</span> </div>
                     
        </Card>
    )
}