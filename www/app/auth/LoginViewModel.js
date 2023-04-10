const LoginViewModel =  { 
 
   async login (data){   
      const result =  await PublicClient.post('Auth/index_post',data);   
      if(result.status){ 
          UserModel.set(result);
          return {
            status : true,
            hak_akses : result.hak_akses,
            nama : result.nama,
            divisi : result.divisi,
            nomor_induk : result.nomor_induk,
          } 
      }  
          return {
            status : false,
            message : result.message
          };
      
  }
} 