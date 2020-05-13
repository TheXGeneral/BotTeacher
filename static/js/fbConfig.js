var firebaseConfig = {
    apiKey: "AIzaSyAgvfKP_aGgK38ORvT-L2Vpg4s3vTCPKoA",
    authDomain: "polihack-10.firebaseapp.com",
    databaseURL: "https://polihack-10.firebaseio.com",
    projectId: "polihack-10",
    storageBucket: "polihack-10.appspot.com",
    messagingSenderId: "1090396961891",
    appId: "1:1090396961891:web:396f20718ca316b4a54c56"
  };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    var User;
function fixUser(val){
    User=val;
}
    //make auth and firestore ref
    const auth = firebase.auth();
    const db = firebase.firestore();
    const database= firebase.database();
  