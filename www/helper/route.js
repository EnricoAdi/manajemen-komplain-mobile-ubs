// const ROUTE_KEY = 'komplain-ubs-mobile-route';
// // const [route,changeRoute] = useState("login/");
// let route = "login/";
// const changeRoute = (path)=>{
//     window.location.href = path;
// };
// function destructRoute(path){ 
//     return path.split('/').filter(p => p);
// };
// function changeRoute(path,setRoute){ 
//     window.history.pushState(null, null,`http://localhost/reactCordova/www/#/${path}`);
//     window.dispatchEvent(new PopStateEvent('popstate'));

//     setRoute(`${path}`);
// }

// const route = {

//     init(){
//         this.set("login");
//     },
//     clear(){
//         storage.remove(ROUTE_KEY);
//     },
//     set(path){   
//         path = "mobile/"+path;
//         storage.set(ROUTE_KEY, path);
//     },
//     get(){
//         const address = storage.get(ROUTE_KEY);
//         if(!address || address==""){ 
//             this.init();
//         }
//         return this.destruct(storage.get(ROUTE_KEY));
//     }
    
// }