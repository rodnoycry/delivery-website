import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAprhJBeNPhuHFUJETb1H-1S5AJgZ6Ri5k",
    authDomain: "san-sei-reserve-00.firebaseapp.com",
    projectId: "san-sei-reserve-00",
    storageBucket: "san-sei-reserve-00.appspot.com",
    messagingSenderId: "202186965686",
    appId: "1:202186965686:web:883c4183246959f02f1c17",
    measurementId: "G-EZL61QWLS2"
}
// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const auth = getAuth()
auth.languageCode = 'RU'
