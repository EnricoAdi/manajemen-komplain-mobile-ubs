const {useState, useContext, createContext, useEffect} = React;     
const {NavLink, Link, Route, Redirect, HashRouter,BrowserRouter, Switch, useHistory, useParams} = window.ReactRouterDOM; 
const withRouter = ReactRouterDOM.withRouter; 

const MainContext = React.createContext();
const RouteContext = React.createContext();

/**
 * Pada bagian ini, penggunaan import beberapa hook yang digunakan pada pembangunan sistem aplikasi mobile manajemen komplain PT UBS. Untuk bagian import ini akan ditempatkan di direktori helper, dengan nama import.js.
 * 
 * 
 * Untuk pengerjaan aplikasi mobile ini, dibutuhkan beberapa hooks milik ReactJS yaitu useState, useContext, dan useEffect. Lalu untuk melakukan routing akan menggunakan react router v5.  
 */