const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.addAdminRole = functions.https.onCall((data, context) => {
  if (!context.auth) return {status: "Error", code: 401, message: "Not signed in"};

  return admin.auth().getUserByEmail(data.email).then((user) => {
    return admin.auth().setCustomUserClaims(user.uid, {admin: true});
  }).then(() => {
    return {message: `${data.email} has been promoted as admin.`};
  }).catch((err) => err);
});
