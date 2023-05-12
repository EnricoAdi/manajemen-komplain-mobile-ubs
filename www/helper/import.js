const {useState, useContext, createContext, useEffect} = React;     
const {NavLink, Link, Route, Redirect, HashRouter,BrowserRouter, Switch, useHistory, useParams} = window.ReactRouterDOM; 
const withRouter = ReactRouterDOM.withRouter; 

const MainContext = React.createContext();
const RouteContext = React.createContext();