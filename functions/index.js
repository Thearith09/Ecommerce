const functions = require("firebase-functions");
const admin = require("firebase-admin");
const stripe = require('stripe')(functions.config().stripe.secret);
admin.initializeApp();

exports.addAdminRole = functions.https.onCall((data, context) => {
  if (!context.auth) return {status: "Error", code: 401, message: "Not signed in"};

  return admin.auth().getUserByEmail(data.email).then((user) => {
    return admin.auth().setCustomUserClaims(user.uid, {admin: true});
  }).then(() => {
    return {message: `${data.email} has been promoted as admin.`};
  }).catch((err) => err);
});

exports.createStripeCheckout = functions.https.onCall(async (data, context) => {
    const results = [];
    // let coupon;

    if (data.checkoutItem) {
      const documentRef = admin.firestore().doc(`inventory/${data.categoryName}`);
      const product = await documentRef.collection('products').doc(data.checkoutItem[0].name).get();

      data.checkoutItem.forEach(async (item) => {
        const price = product.data().price - (product.data().price * product.data().discount) / 100;
        results.push({
          quantity: item.qty,
          price_data: {
            currency: 'usd',
            unit_amount: parseFloat((100 * price).toFixed(2)),
            product_data: {
              images: [ item.color ],
              name: item.name
            }
          }
        });
      });

      // if (product.data().discount > 0) {
      //   coupon = await stripe.coupons.create({
      //     percent_off: parseInt(product.data().discount),
      //     duration: 'once',
      //   });
      // }

    } else {
      const items = await admin.firestore().collection('carts').doc(data.name).collection("items").get();
      // let discount = 0;
      // console.log("Items: ", items);

      items.forEach(async (item) => {
        // console.log("Item: ", item)
        // console.log("Item.data: ", item.data())
        // discount += parseInt(item.data().discount);
        const price = item.data().price - (item.data().price * item.data().discount) / 100;
        results.push({
          quantity: item.data().qty,
          price_data: {
            currency: 'usd',
            unit_amount: parseFloat((100 * price).toFixed(2)),
            product_data: {
              images: [ item.data().color ],
              name: item.data().name
            }
          }
        });
      });

      // if (discount > 0) {
      //   coupon = await stripe.coupons.create({
      //     percent_off: discount,
      //     duration: 'once',
      //   });
      // }
    }

    const session = await stripe.checkout.sessions.create({
      success_url: 'http://localhost:8080',
      cancel_url: 'http://localhost:8080',
      payment_method_types: ['card'],
      shipping_rates: ['shr_1J15yPBVuXsuKaUYaBcvgYRe'],
      shipping_address_collection: {
        allowed_countries: ['KH'],
      },
      mode: 'payment',
      line_items: results,
      // discounts: [{
      //   coupon: coupon && coupon.id
      // }],
    });

    return {
      id: session.id
    }
});
