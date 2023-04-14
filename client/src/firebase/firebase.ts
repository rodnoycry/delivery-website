import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { dbSelect } from '@/config/settings'

// Credentials for test firebase DB
const firebaseConfigReserve = {
    apiKey: 'AIzaSyAprhJBeNPhuHFUJETb1H-1S5AJgZ6Ri5k',
    authDomain: 'san-sei-reserve-00.firebaseapp.com',
    projectId: 'san-sei-reserve-00',
    storageBucket: 'san-sei-reserve-00.appspot.com',
    messagingSenderId: '202186965686',
    appId: '1:202186965686:web:883c4183246959f02f1c17',
    measurementId: 'G-EZL61QWLS2',
}

// Production firebase DB config
const firebaseConfig = {
    apiKey: 'AIzaSyCLaFLTH8CXbz6ZMPF39rx7NH_dViDo_EE',
    authDomain: 'san-sei.firebaseapp.com',
    projectId: 'san-sei',
    storageBucket: 'san-sei.appspot.com',
    messagingSenderId: '545611652850',
    appId: '1:545611652850:web:4e4852a9f3e8a2e8fd7a6b',
    measurementId: 'G-2DYJF0YY9F',
}

// Object to easily select needed firebase
const firebaseConfigsDict = {
    main: firebaseConfig,
    reserve: firebaseConfigReserve,
}

// Initialize Firebase
export const app = initializeApp(firebaseConfigsDict[dbSelect])
export const auth = getAuth()
auth.languageCode = 'RU'
