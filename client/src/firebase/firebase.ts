import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyCLaFLTH8CXbz6ZMPF39rx7NH_dViDo_EE',
    authDomain: 'san-sei.firebaseapp.com',
    projectId: 'san-sei',
    storageBucket: 'san-sei.appspot.com',
    messagingSenderId: '545611652850',
    appId: '1:545611652850:web:4e4852a9f3e8a2e8fd7a6b',
    measurementId: 'G-2DYJF0YY9F',
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const auth = getAuth()
auth.languageCode = 'RU'
