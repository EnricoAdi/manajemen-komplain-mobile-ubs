const API_URL_LOCAL_WEB = "http://localhost/manajemen-komplain-web-ubs/API/"; 
const API_URL_LOCAL_ANDROID = "http://10.0.2.2:80/manajemen-komplain-web-ubs/api/"; 
const API_URL_DEVELOPMENT = "http://192.168.1.8/manajemen-komplain-web-ubs/api/";

const MODE = 'LOCAL_WEB';
// const MODE = 'LOCAL_ANDROID';
// const MODE = 'DEVELOPMENT';

let API_URL = '' 
switch (MODE) {
    case 'LOCAL_WEB':
        API_URL =  API_URL_LOCAL_WEB;
        break; 
    case 'LOCAL_ANDROID':
        API_URL =  API_URL_LOCAL_ANDROID;
        break;
    default:
        API_URL =  API_URL_DEVELOPMENT;
        break;
} 

// export default API_URL;