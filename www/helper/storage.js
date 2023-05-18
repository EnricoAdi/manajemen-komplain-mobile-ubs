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

/**
 * Pada bagian ini, akan diinisiasi function konstanta yang digunakan untuk mengatur penggunaan local storage di dalam aplikasi. Local storage sendiri digunakan untuk menyimpan data di aplikasi client, dan datanya akan disimpan dalam key-value. Untuk inisiasi penggunaan function untuk memanggil local storage berada di direktori helper, dengan nama storage.js.
 * 
 * 
 * Pada function ini, variabel storage adalah variabel yang digunakan untuk menyimpan 3 method, yaitu set yang digunakan untuk menyimpan sebuah value dalam local storage, dengan value yang sudah dikonversikan ke dalam bentuk string dari sebuah JSON. metode get digunakan untuk mendapatkan value dari local storage berdasarkan key yang diberikan oleh user, dan terlebih dahulu dilakukan parse, yaitu mengubah ke bentuk JSON sebelum digunakan di function.  remove digunakan untuk menghapus sebuah value dari local storage berdasarkan key yang diberikan.
 */