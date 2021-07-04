const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.addAdminRole = functions.https.onCall((data, context) => {
  if (!context.auth)
    return { status: "Error", code: 401, message: "Not signed in" };

  return admin
    .auth()
    .getUserByEmail(data.email)
    .then((user) => {
      return admin.auth().setCustomUserClaims(user.uid, { admin: true });
    })
    .then(() => {
      return { message: `${data.email} has been promoted as ${data.role}.` };
    })
    .catch((err) => err);
});

exports.getUserInfo = functions.https.onCall(async (data, context) => {
  try {
    const user = await admin.auth().getUserByEmail(data.email);
    return user;
  } catch (err) {
    return err.message;
  }
});

exports.addPackerRole = functions.https.onCall((data, context) => {
  if (!context.auth)
    return { status: "Error", code: 401, message: "Not signed in" };

  return admin
    .auth()
    .getUserByEmail(data.email)
    .then((user) => {
      return admin.auth().setCustomUserClaims(user.uid, { packer: true });
    })
    .then(() => {
      return { message: `${data.email} has been promoted as ${data.role}.` };
    })
    .catch((err) => err);
});

exports.addDeliveryRole = functions.https.onCall((data, context) => {
  if (!context.auth)
    return { status: "Error", code: 401, message: "Not signed in" };

  return admin
    .auth()
    .getUserByEmail(data.email)
    .then((user) => {
      return admin.auth().setCustomUserClaims(user.uid, { delivery: true });
    })
    .then(() => {
      return { message: `${data.email} has been promoted as ${data.role}.` };
    })
    .catch((err) => err);
});

exports.createStripeCheckout = functions.https.onCall(async (data, context) => {
  const stripe = require("stripe")(functions.config().stripe.secret);
  const results = [];
  let items = [];
  // let coupon;

  if (data.checkoutItem) {
    const documentRef = admin.firestore().doc(`inventory/${data.categoryName}`);
    const product = await documentRef
      .collection("products")
      .doc(data.checkoutItem.name)
      .get();
    items[0] = data.checkoutItem;

    const price =
      product.data().price -
      (product.data().price * product.data().discount) / 100;

    items[0].price = price;
    items[0].discount = product.data().discount;

    results.push({
      quantity: items[0].qty,
      price_data: {
        currency: "usd",
        unit_amount: parseFloat((100 * price).toFixed(2)),
        product_data: {
          images: [items[0].color],
          name: items[0].name,
        },
      },
    });

    // if (product.data().discount > 0) {
    //   coupon = await stripe.coupons.create({
    //     percent_off: parseInt(product.data().discount),
    //     duration: 'once',
    //   });
    // }
  } else {
    const documents = await admin
      .firestore()
      .collection("carts")
      .doc(data.id)
      .collection("items")
      .get();

    // let discount = 0;
    // console.log("Items: ", items);

    documents.forEach(async (doc) => {
      item = doc.data();
      // console.log("Item: ", item)
      // console.log("Item.data: ", item.data())
      // discount += parseInt(item.data().discount);
      item.price = item.price - (item.price * item.discount) / 100;
      items.push(item);

      results.push({
        quantity: item.qty,
        price_data: {
          currency: "usd",
          unit_amount: parseFloat((100 * item.price).toFixed(2)),
          product_data: {
            images: [item.color],
            name: item.name,
          },
        },
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
    success_url:
      "https://easy4shopping.net/order/success?session_id={CHECKOUT_SESSION_ID}",
    cancel_url: "https://easy4shopping.net/order/cancel",
    payment_method_types: ["card"],
    shipping_rates: ["shr_1J15yPBVuXsuKaUYaBcvgYRe"],
    shipping_address_collection: {
      allowed_countries: ["KH"],
    },
    billing_address_collection: "auto",
    mode: "payment",
    line_items: results,
    // discounts: [{
    //   coupon: coupon && coupon.id
    // }],
  });

  await admin
    .firestore()
    .collection("orders")
    .doc(session.id)
    .set({
      email: data.email,
      phone: data.phone,
      createdAt: data.createdAt,
      items: items,
    });

  return {
    id: session.id,
  };
});

exports.stripeWebhook = functions.https.onRequest(async (req, res) => {
  const stripe = require("stripe")(functions.config().stripe.token);
  let event;

  try {
    const webhookSecret = functions.config().stripe.payments_webhook_secret;
    event = stripe.webhooks.constructEvent(
      req.rawBody,
      req.headers["stripe-signature"],
      webhookSecret
    );
  } catch (err) {
    console.error("Webhook signature verification failed!");
    return res.sendStatus(400);
  }

  console.log("Event: ", event);
  const dataObject = event.data.object;
  console.log("Data Object: ", dataObject);

  if (dataObject.payment_status === "paid") {
    const card = await stripe.customers.createSource(dataObject.customer, {
      source: "tok_visa",
    });
    console.log("Card: ", card);

    await admin
      .firestore()
      .collection("orders")
      .doc(dataObject.id)
      .update({
        paymentMethod: { brand: card.brand, last4: card.last4 },
        paymentStatus: dataObject.payment_status,
        shippingInfo: dataObject.shipping,
        amountTotal: dataObject.amount_total,
      });
  } else {
    await admin
      .firestore()
      .collection("orders")
      .doc(dataObject.id)
      .delete();
  }
});
