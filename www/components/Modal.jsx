const Modal = (props)=>{ 
    const mainContext = useContext(MainContext);
    const {message} = props;
    const [modalStyle,setModalStyle] = useState({ 
        // paddingRight: "17px",
        // marginTop: "32vh",
        // marginLeft: "1vw"
    })
    const closeModal = ()=>{ 
        $('#popUpModal').modal('hide'); 
        mainContext.setModalContext({
            open : false,
            message : ""
        }) 
    } 
    useEffect(()=>{ 
        $('#popUpModal').modal('show'); 
    },[]) 
    return ( 
        <div className="modal fade" id="popUpModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="false" style={modalStyle} >
        <div className="modal-dialog" role="document">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Pesan</h5>
                    <button className="close" type="button" data-dismiss="modal" aria-label="Close" onClick={closeModal}>
                        <span aria-hidden="true" >×</span>
                    </button>
                </div>
                <div className="modal-body">{message}</div>
                <div className="modal-footer">  
                    <button className="btn text-white" style={{backgroundColor:'#004882'}} type="button" data-dismiss="modal" aria-label="Close" onClick={closeModal}>Ya</button>
                </div>
            </div>
        </div>
    </div>
    );
}