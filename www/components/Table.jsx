const Table = (props)=>{
    const {title, data} = props; 
    //contoh data 
    // {
    //     key: ['No', 'Nama', 'Komplain', 'Tanggal', 'Status'], untuk kolom header
    //     value: [
    //         ['1', 'A', 'B', 'C', 'D'],
    //         ['1', 'A', 'B', 'C', 'F'],
    //         ['1', 'A', 'B', 'C', 'E'],
    //     ]
    // }
    // console.log(data.value.length)
    useEffect(()=>{
            // $('#dataTable').DataTable(); 
        // setTimeout(() => {
        //     // console.log($('#dataTable'))
        // }, 1000);
    },[])
    return(
        <div className="card shadow mb-4 mt-4">
            <div className="card-header py-3">
                <h6 className="m-0 font-weight-bold text-primary">{title}</h6>
            </div>
            
            <div className="card-body">
                <div className="table-responsive">

                    <div id="dataTable_wrapper" className="dataTables_wrapper dt-bootstrap4 no-footer">
                        <div className="row">
                            {/* <div className="col-sm-12 col-md-6">
                                <div className="dataTables_length" id="dataTable_length">
                                <label>Show <select name="dataTable_length" aria-controls="dataTable" className="custom-select custom-select-sm form-control form-control-sm">
                                <option value="10">10</option>
                                <option value="25">25</option>
                                <option value="50">50</option>
                                <option value="100">100</option></select> entries</label>
                                </div>
                            </div> */}
                            <div className="col-sm-12 col-md-6"></div>
                            <div className="col-sm-12 col-md-6">
                            <div id="dataTable_filter" className="dataTables_filter"><label>Search:<input type="search" className="form-control form-control-sm" placeholder="" aria-controls="dataTable"/></label></div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-12">
                                <table className="table table-bordered dataTable no-footer" id="dataTable" width="100%" cellSpacing="0" role="grid" aria-describedby="dataTable_info">
                                    <thead>
                                        <tr role="row">
                                            {data.key.map((item, index)=>{
                                                return <th className="sorting sorting_asc" 
                                                key={index} tabIndex="0" aria-controls="dataTable" rowSpan="1" colSpan="1" aria-sort="ascending" aria-label="Divisi: activate to sort column descending">{item}</th>
                                            })} 
                                        </tr>
                                    </thead>
                                    <tbody> 
                                    {/* <tr className="odd">
                                        <td valign="top" colSpan={data.key.length} className="dataTables_empty">No data available in table
                                    </td>
                                    </tr> */}
                                        {data.value.map((item, index)=>{ 
                                            return <tr key={index}>
                                                    {item.map((val, index1)=>{  
                                                    return <td key={index1}>{val}</td>
                                                    })}
                                                </tr> 
                                            })}
                                        <tr> 
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div> 
                    </div>
                    
                    


                </div>
            </div>
        </div>
    )
}