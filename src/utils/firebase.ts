import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAPOh87FamPVbykRznnKcwfxZkwLtN73tY",
  authDomain: "project-d4077.firebaseapp.com",
  projectId: "project-d4077",
  storageBucket: "project-d4077.appspot.com",
  messagingSenderId: "354626247002",
  appId: "1:354626247002:web:1144fa09db455c068cbb63",
  measurementId: "G-3S38V0ZM60"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export default storage;
