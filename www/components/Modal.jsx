const Modal = (props)=>{
    const {message, isConfirm, confirmAction} = props;
    const [modalStyle,setModalStyle] = useState({
        display: "block", 
        paddingRight: "17px",
        marginTop: "35vh",
        marginLeft: "1vw"
    })
    const closeModal = ()=>{
        setModalStyle({
            ...modalStyle,
            display: "none"
        })
    }
    const openModal = ()=>{
        setModalStyle({
            ...modalStyle,
            display: "block"
        })
    }
    return ( 
        <div className="modal fade show" id="confirmModal" tabIndex="3" role="dialog" style={modalStyle} >
        <div className="modal-dialog" role="document">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Konfirmasi</h5>
                    <button className="close" type="button" data-dismiss="modal" aria-label="Close" onClick={closeModal}>
                        <span aria-hidden="true" >×</span>
                    </button>
                </div>
                <div className="modal-body">{message}</div>
                <div className="modal-footer">
                    
                    {isConfirm && <button className="btn btn-primary" type="button" data-dismiss="modal" onClick={closeModal}>Tidak</button>}
                    <button className="btn btn-primary" onClick={confirmAction}>Ya</button> 
                </div>
            </div>
        </div>
    </div>
    );
}