const STORAGE_KEY = 'komplain-ubs-mobile-';

const storage = { 
    set(key, value){
        const storageKey = STORAGE_KEY + key;
        localStorage.setItem(storageKey, JSON.stringify(value));
    },

    get(key){
        const storageKey = STORAGE_KEY + key;
        let res = localStorage.getItem(storageKey); 
        return JSON.parse(res);
    },
    remove(key){ 
        const storageKey = STORAGE_KEY + key;
        localStorage.removeItem(storageKey); 
    }
}
// export default storage;