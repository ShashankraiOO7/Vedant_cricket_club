import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";
import { getAnalytics, isSupported } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";

const firebaseConfig = {
  apiKey: "AIzaSyApFc3ZtDC4aKNhlpEJvs2WKAQeYOERgHQ",
  authDomain: "vedantcricketclub-6e919.firebaseapp.com",
  databaseURL: "https://vedantcricketclub-6e919-default-rtdb.firebaseio.com",
  projectId: "vedantcricketclub-6e919",
  storageBucket: "vedantcricketclub-6e919.firebasestorage.app",
  messagingSenderId: "839161252678",
  appId: "1:839161252678:web:6c689def510f4b67acb347",
  measurementId: "G-9RZ5XYH64N"
};

const hasFirebaseConfig = Object.values(firebaseConfig).every(
  (value) => typeof value === "string" && value && !value.startsWith("REPLACE_WITH_")
);

let app = null;
let auth = null;
let db = null;
let analytics = null;

if (hasFirebaseConfig) {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getDatabase(app);
  isSupported()
    .then((supported) => {
      if (supported) {
        analytics = getAnalytics(app);
      }
    })
    .catch(() => {});
}

export { firebaseConfig, hasFirebaseConfig, app, auth, db, analytics };
