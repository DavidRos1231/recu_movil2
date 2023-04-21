// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import "firebase/auth"; // Importa el módulo de autenticación de Firebase
import "firebase/database"; // Importa el módulo de base de datos en tiempo real de Firebase
import "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCy3Qlu1_XMIE_An3nawwkPc6s0BamJBmc",
  authDomain: "recupera2-d80cf.firebaseapp.com",
  projectId: "recupera2-d80cf",
  storageBucket: "recupera2-d80cf.appspot.com",
  messagingSenderId: "155842882419",
  appId: "1:155842882419:web:7935128ad37fd45d387306",
  baseUrl: "https://recupera2-d80cf-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);