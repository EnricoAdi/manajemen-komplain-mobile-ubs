const FileLoader = (props)=>{
    const {back, fileUrl} = props
    const extension = fileUrl.split(".")[1]
    //ini halaman yang tidak perlu dibuat routingnya, dianggap komponen untuk melihat file saja
    //.jpg, .png, .pdf, .docx, .xlsx, .txt
    return(
        <div> 
            <PageTitle>Lihat Lampiran</PageTitle>
            <Button icon="fas fa-fw fa-step-backward mr-2" backgroundColor="danger" onclick={back}>Kembali</Button>  
            <iframe src={fileUrl} className="mt-4" height="400" width="95%"></iframe>
        </div>
    )
}