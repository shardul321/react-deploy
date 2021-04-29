import React, { useEffect } from "react";
import Header from "./Header";
import {analytics} from "../firebase/firebase";

const Home = () => {
  

  useEffect(() => {
    analytics.logEvent({eventName: "Homepage_visited"})
  }, [])
  return (
    <div>
      <Header />
      <h1>Home page</h1>
      <h5>List of Topics</h5>
      <h6>1.Firestore</h6>
      <h6>2.Realtime Database</h6>
      <h6>3.Cloud Messaging</h6>
      <h6>4.Store</h6>
      <h6>5.Analytics</h6>

    </div>
  );
};

export default Home;
