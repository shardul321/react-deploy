import React, { useState,useEffect } from 'react'
import { storage ,analytics} from "../firebase/firebase";
import Header from './Header';
import firebase from "../firebase/firebase";
import "@firebase/analytics";

const Storage = () => {
    const [image, setImage] = useState(null);
    const [url, setUrl] = useState("");
    const [progress, setProgress] = useState(0)
    const handleChange = (e) => {
        if(e.target.files[0]){
            setImage(e.target.files[0]);
        }
    };
    const handleUpload = () => {
        const uploadData= storage.ref(`images/${image.name}`).put(image);
        uploadData.on(
            "state_changed",
            snapshot => {
                const progress = Math.round(
                    (snapshot.bytesTransferred /snapshot.totalBytes) *100
                );
                setProgress(progress);
            },
            error => {
                console.log(`error`, error);
            },
            () => {
                storage.ref("images")
                .child(image.name)
                .getDownloadURL()
                .then(url => {
                    // console.log(url);
                    setUrl(url);

                })
            }
        )
    }
    useEffect(() => {
        firebase.analytics().logEvent("eventName","Sotagepage_visited")
      }, [])
    return (
        <div>
            <Header />
            <br />
            <div>
                <progress value={progress} max="100" />
            </div>
            <br />
            <div>
            <h2>File Upload using firebase</h2>
            </div>
            <div>
                <input type="file" onChange={handleChange} />
                <button onClick={handleUpload} >Upload</button>
                <br/>
                {url}
                <br />
                <img src={url || "http://via.placeholder.com/400"} alt="firebase-image" width="500px" height="400px" />
            </div>
        </div>
    )
}

export default Storage
