const { onRequest } = require("firebase-functions/v2/https");
const { defineSecret } = require("firebase-functions/params");
const admin = require("firebase-admin");
const crypto = require("crypto");

admin.initializeApp();

const lsSecret = defineSecret("LEMONSQUEEZY_WEBHOOK_SECRET");

exports.lemonsqueezyWebhook = onRequest(
  { secrets: [lsSecret], cors: false },
  async (req, res) => {
    // 1. Only accept POST
    if (req.method !== "POST") {
      return res.status(405).send("Method not allowed");
    }

    // 2. Verify HMAC signature
    const signature = req.get("X-Signature") || req.get("x-signature") || "";
    const hmac = crypto.createHmac("sha256", lsSecret.value());
    const digest = Buffer.from(
      hmac.update(req.rawBody).digest("hex"),
      "utf8"
    );
    const sigBuffer = Buffer.from(signature, "utf8");

    if (
      digest.length !== sigBuffer.length ||
      !crypto.timingSafeEqual(digest, sigBuffer)
    ) {
      console.error("Invalid webhook signature");
      return res.status(401).send("Invalid signature");
    }

    // 3. Parse event
    const event = req.body.meta?.event_name;
    const email = req.body.data?.attributes?.user_email;
    const customUid = req.body.meta?.custom_data?.uid;
    const status = req.body.data?.attributes?.status;

    console.log(`Webhook event: ${event}, email: ${email}, uid: ${customUid}, status: ${status}`);

    if (!email && !customUid) {
      return res.status(400).send("Missing user identifier");
    }

    // 4. Determine new tier
    let newTier = null;
    if (
      event === "order_created" ||
      event === "subscription_created" ||
      event === "subscription_resumed" ||
      (event === "subscription_updated" && status === "active") ||
      event === "subscription_payment_recovered"
    ) {
      newTier = "pro";
    } else if (
      event === "subscription_cancelled" ||
      event === "subscription_expired"
    ) {
      newTier = "free";
    }

    if (!newTier) {
      return res.status(200).send("OK - no tier change needed");
    }

    // 5. Resolve Firebase UID
    let uid = customUid;
    if (!uid) {
      try {
        const userRecord = await admin.auth().getUserByEmail(email);
        uid = userRecord.uid;
      } catch (err) {
        console.error("User not found by email:", email, err.message);
        return res.status(404).send("User not found");
      }
    }

    // 6. Update Firestore
    try {
      await admin.firestore().collection("users").doc(uid).set(
        { tier: newTier },
        { merge: true }
      );
      console.log(`Updated user ${uid} tier to ${newTier} (event: ${event})`);
      return res.status(200).send("OK");
    } catch (err) {
      console.error("Firestore update error:", err.message);
      return res.status(500).send("Internal error");
    }
  }
);
