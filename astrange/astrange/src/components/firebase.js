import { getStorage } from "firebase/storage";

import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCzZDB10aD0MoYhmQktJIWe0YP3U6nJ5pc",
  authDomain: "pics-acd2b.firebaseapp.com",
  projectId: "pics-acd2b",
  storageBucket: "pics-acd2b.appspot.com",
  messagingSenderId: "1027882721778",
  appId: "1:1027882721778:web:e21c4d10235003c9884b6b",
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
