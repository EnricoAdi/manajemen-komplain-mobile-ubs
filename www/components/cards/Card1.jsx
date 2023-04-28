const Card1 = (props)=>{
    const {judul,isi,icon,warna, onClick} = props;
    return(
        <div className={'card shadow h-100 py-2 border-left-'+warna} onClick={onClick}>
            <div className='card-body'>
            <div className='row no-gutters align-items-center'>
                <div className='col mr-2'>
                <div className={'text-xs font-weight-bold text-uppercase mb-1 text-'+{warna}}>
                    {judul}</div>
                <div className='h5 mb-0 font-weight-bold text-gray-800'>{isi}</div>
                </div>
                <div className='col-auto'>
                <i className={`fas ${icon} fa-2x text-gray-300 mt-4`}></i>
                </div>
            </div>
            </div>
        </div>
    );
}