import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebaseConfig/firebaseConfig';

export const initializeLoginFrameWork = () => {

    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig)
    } else {
        firebase.app(); // if already initialized, use that one
    }
}
export const handleGoogleSignIn = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();

    return firebase.auth().signInWithPopup(googleProvider)
        .then(res => {
            const { displayName, email, photoURL } = res.user
            const signInUser = {
                isSignIn: true,
                name: displayName,
                email: email,
                photo: photoURL,
                success: true
            }
            return signInUser

            // console.log(displayName, email, photoURL);
        })
        .catch(err => {
            console.log(err);
            console.log(err.message);
        })
}

export const handleFbSignIn = () => {
    const fbProvider = new firebase.auth.FacebookAuthProvider();
    return firebase
        .auth()
        .signInWithPopup(fbProvider)
        .then((result) => {
            const user = result.user;
            user.success = true;
            return user;
            // console.log('fb user after sign in', user);
        })
        .catch((error) => {
            // Handle Errors here.

            console.log(error.message)

            // ...
        });
}

export const handleSignOut = () => {
    return firebase.auth().signOut()
        .then(res => {
            const signOutUser = {
                isSignIn: false,
                name: '',
                email: '',
                photo: '',
                error: '',
                success: false
            }
            return signOutUser
        })
        .catch(err => console.log(err))
}

export const createUserWithEmailAndPassword = (email, password, name) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(res => {
            const newUserInfo = { ...res.user }
            newUserInfo.error = "";
            newUserInfo.success = true;
            updateUserInfo(name)
            return newUserInfo;
        })
        .catch((error) => {
            const newUserInfo = {}
            newUserInfo.error = error.message;
            newUserInfo.success = false;
            return newUserInfo;
        });
}
export const signInWithEmailAndPassword = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
        .then(res => {
            const newUserInfo = {...res.user}
            newUserInfo.error = "";
            newUserInfo.success = true;
            return newUserInfo;
            // console.log(res);
        })
        .catch((error) => {
            const newUserInfo = {}
            newUserInfo.error = error.message;
            newUserInfo.success = false;
            return newUserInfo;
        });
}

const updateUserInfo = name => {
    const user = firebase.auth().currentUser;

    user.updateProfile({
        displayName: name
    }).then(function () {
        console.log('User name updated successfully')
    }).catch(function (error) {
        console.log(error)
    });
}