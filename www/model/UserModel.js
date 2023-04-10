const UserModel = { 
      get(){
        const token = storage.get('login_token');
        if(!token){
            return null;
        }
        return {
            token : storage.get('login_token'),
            divisi : storage.get('divisi'),
            nama : storage.get('nama'),
            hak_akses : storage.get('hak_akses'),
            nomor_induk : storage.get('nomor_induk')
        }
    },
    set(result){ 
        storage.set('login_token', result.token);   
        storage.set('nama', result.nama);   
        storage.set('divisi', result.divisi);   
        storage.set('hak_akses', result.hak_akses);  
        storage.set('nomor_induk', result.nomor_induk);  
    },
    logout(){
        storage.remove('login_token');
        storage.remove('nama');
        storage.remove('divisi');
        storage.remove('hak_akses');
        storage.remove('nomor_induk'); 
    }
}