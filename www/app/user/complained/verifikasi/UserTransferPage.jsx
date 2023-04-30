const UserTransferPage = ()=>{
    const mainContext = useContext(MainContext);
    const history = useHistory();
    const [isLoading,setisLoading] = useState(false); 
    const {no_komplain} = useParams(); 
    return (
        <>
            <PageTitle>Transfer Komplain</PageTitle>
            <Button icon="fas fa-fw fa-step-backward mr-2" backgroundColor="danger" href={"/user/complained/verifikasi/"+no_komplain}>Kembali</Button>
        </>
    )
}