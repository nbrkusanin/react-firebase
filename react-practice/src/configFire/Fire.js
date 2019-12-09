import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDftf8yEYtg4ryfslT78988lUPLFYgRhe4",
    authDomain: "nikolareact.firebaseapp.com",
    databaseURL: "https://nikolareact.firebaseio.com",
    projectId: "nikolareact",
    storageBucket: "nikolareact.appspot.com",
    messagingSenderId: "57883853536",
    appId: "1:57883853536:web:aed436a4b867b49f784685",
    measurementId: "G-49JSY89E1M"
  };

  const fire = firebase.initializeApp(firebaseConfig);
  const storage = firebase.storage();

  export {
    fire,
    storage
  }

