const admin = require("firebase-admin");

// Initialize Firebase Admin SDK with your service account key
const serviceAccount = require("./serviceKeys.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://my-app-6acc4-default-rtdb.firebaseio.com"
});

// Define function to check and update collection
async function checkAndUpdateCollection() {
  const db = admin.firestore();

  // Get the collection
  const querySnapshot = await db.collection("logs").get();

  // Loop through each document in the collection
  querySnapshot.forEach((doc) => {
    const data = doc.data();

    // Check if the "phone" and "address" fields already exist
    if (!data.hasOwnProperty("phone") || !data.hasOwnProperty("address")) {
      // If not, add the fields to the document
      db.collection("logs").doc(doc.id).update({
        phone: "",
        address: "",
      });
    }
  });
}

// Call function to check and update collection
admin.firestore().collection("logs").onSnapshot(() => {
    checkAndUpdateCollection();
  });
