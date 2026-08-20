import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics, isSupported } from "firebase/analytics";

// Web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCPzs5kav0wocJbM4Q_HeI869H-hUtqwGE",
  authDomain: "waltdesignsstudio-84b20.firebaseapp.com",
  projectId: "waltdesignsstudio-84b20",
  storageBucket: "waltdesignsstudio-84b20.firebasestorage.app",
  messagingSenderId: "98336395942",
  appId: "1:98336395942:web:abd30494cc7b285f785a67",
  measurementId: "G-1GVQ7N7785"
};

// Initialize Firebase safely preventing duplicate app initializations
export const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Enable only Firebase Authentication
export const auth = getAuth(app);

// Optional Analytics support only in client environment
if (typeof window !== "undefined") {
  isSupported()
    .then((supported) => {
      if (supported) {
        getAnalytics(app);
      }
    })
    .catch(() => {
      // Ignore if analytics is blocked or unavailable
    });
}
