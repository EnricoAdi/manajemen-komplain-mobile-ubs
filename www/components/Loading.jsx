const Loading = (props)=>{
    const {color} = props;
    const loadingStyle = {
        width: "23px"
    }
    return( 
        <>
            {color=="white" &&  <img src="img/loading-white.svg" alt="loading" className="" style={loadingStyle}/>}
            {color!="white" &&  <img src="img/loading.svg" alt="loading" className="" style={loadingStyle}/>}
        </>
    )
}