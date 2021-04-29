import firebase from "../firebase/firebase";

const googleProvider = new firebase.auth.GoogleAuthProvider()
export const emailData="";
export const signInWithGoogle = () => {
    firebase.auth.signInWithPopup(googleProvider).then((res) => {
        emailData = res.user.email;
        console.log(res.user.email);
    }).catch((error) => {
        console.log(error.message)
     })
}
 const facebookProvider = new firebase.auth.FacebookAuthProvider();
 export const signInWithFacebook = () => {
    firebase.auth.signInWithPopup(facebookProvider).then((res) => {
        console.log(res.user.email);
        emailData = res.user.email;
    }).catch((error) => {
        console.log(error.message)
     })
}  
const githubProvider = new firebase.auth.GithubAuthProvider();
 export const signInWithGithub = () => {
    firebase.auth.signInWithPopup(githubProvider).then((res) => {
        console.log(res.user.email);
        emailData = res.user.email; 
    }).catch((error) => {
        console.log(error.message)
     })
}  