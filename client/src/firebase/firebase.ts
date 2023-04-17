import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { dbSelect } from '@/config/settings'

// Credentials for test firebase DB
const firebaseConfigReserve = "INSERT YOUR TEST FIREBASE API HERE"

// Production firebase DB config
const firebaseConfig = "INSERT YOUR PRODUCTION FIREBASE API HERE"

// Object to easily select needed firebase
const firebaseConfigsDict = {
    main: firebaseConfig,
    reserve: firebaseConfigReserve,
}

// Initialize Firebase
export const app = initializeApp(firebaseConfigsDict[dbSelect])
export const auth = getAuth()
auth.languageCode = 'RU'
