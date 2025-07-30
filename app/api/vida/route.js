import { NextResponse } from "next/server";
import { vidaGet } from "../../../lib/vida.js";

// This API route acts as a small proxy layer between the demo application and
// Vida's public API. It is called by the front-end to fetch a one-time auth token that
// allows opening the Vida modal.

export async function GET(req) {
  const vidaToken = process.env.VIDA_API_TOKEN; // This token is loaded from `.env.local` and is required
  const email = process.env.VIDA_CUSTOMER_EMAIL; // The email is used to identify a user of an org in Vida.
  if (!vidaToken || !email) {
    return NextResponse.json(
      { error: "Missing required query parameters" },
      { status: 400 }
    );
  }

  try {
    let oneTimeAuthToken = null;
    try {
      const { res: tokenRes, data: tokenData } = await vidaGet(
        "auth/account/oneTimeAuthToken",
        {
          token: vidaToken,
          email
        }
      );
      console.log("One-time auth token response:", tokenRes.status);
      if (tokenRes.ok) {
        oneTimeAuthToken = tokenData?.authToken || null;
      }
    } catch (err) {
      // ignore token errors
    }

    // The front-end receives the Vida temporary auth token.
    return NextResponse.json({ oneTimeAuthToken });
  } catch (err) {
    console.error("VIDA request failed", err);
    return NextResponse.json({ error: "Request failed" }, { status: 500 });
  }
}
