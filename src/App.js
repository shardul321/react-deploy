import './App.css';
import LoginPage from './components/LoginPage';
import { Route, Switch } from 'react-router-dom';
import Home from "./components/Home";
import Contact from './components/Contact';
import FireStoreData from "./components/FireStoreData";
import Storage from "./components/Storage";
import { useEffect } from 'react';
import firebase from"./firebase/firebase";
function App() {

  useEffect(() => {
    const msg = firebase.messaging();
    msg.requestPermission()
    .then(() => {
      return msg.getToken();
    })
    .then((token) => {
      console.log("Token : ", token);
    })
    .catch((err) => {
      console.log(err);
    });
  }, [])
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={LoginPage} />
        <Route path="/home" component={Home} />
        <Route path="/realtimedb" component={Contact} />
        <Route path="/firestore" component={FireStoreData} />
        <Route path="/storage" component={Storage} />

      </Switch>
    </div>
  );
}

export default App;