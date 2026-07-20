const admin = require("firebase-admin");
const pool = require("../db");

if (!admin.apps.length) {
  const serviceAccount = require("../serviceAccountKey.json");
  admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
}

async function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No token provided" });
  }

  const token = authHeader.split("Bearer ")[1];

  try {
    const decoded = await admin.auth().verifyIdToken(token);

    let result = await pool.query(
      "SELECT * FROM users WHERE firebase_uid = $1",
      [decoded.uid]
    );

    if (result.rows.length === 0) {
      result = await pool.query(
        "INSERT INTO users (firebase_uid, email, display_name) VALUES ($1, $2, $3) RETURNING *",
        [decoded.uid, decoded.email, decoded.name || ""]
      );
    }

    req.user = result.rows[0];
    next();
  } catch (err) {
    console.error("Auth error:", err.message);
    res.status(401).json({ error: "Invalid token" });
  }
}

module.exports = authenticate;
