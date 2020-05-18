var firebaseConfig = {
    apiKey: "AIzaSyDgRdfEjwt75tn7GAy2cW65yaDJ62ZVHB4",
    authDomain: "botteacher-eaa55.firebaseapp.com",
    databaseURL: "https://botteacher-eaa55.firebaseio.com",
    projectId: "botteacher-eaa55",
    storageBucket: "botteacher-eaa55.appspot.com",
    messagingSenderId: "898443432468",
    appId: "1:898443432468:web:45021b2afb86c07ab68d01",
    measurementId: "G-LTC2Q1MVBX"
  };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    //make auth and firestore ref
    const auth = firebase.auth();
    const db = firebase.firestore();
    const database= firebase.database();
    const storageService = firebase.storage();
    const storageRef = storageService.ref();
  