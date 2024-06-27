import { getStorage } from "@firebase/storage";
import { initializeApp } from "@firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyCU-yhxylTzFsCAdF17FMuK4OCu6_eCroA",
    authDomain: "vr-fashion-8ec02.firebaseapp.com",
    projectId: "vr-fashion-8ec02",
    storageBucket: "vr-fashion-8ec02.appspot.com",
    messagingSenderId: "253122054422",
    appId: "1:253122054422:web:97007fc900275bee39a837",
    measurementId: "G-Y0NNQMZ78B"
}

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);