import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req) {
  const { email, subject, message } = await req.json();

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.EMAIL_USER,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN,
      },
    });

    const mailOptions = {
      from: `"${email}" <${process.env.EMAIL_USER}>`,
      to: process.env.RECEIVER_EMAIL,
      replyTo: email,
      subject: subject,
      html: `
        <div style="font-family: Arial, sans-serif;">
           <h2>${subject}</h2>
          <p><strong>From:</strong> ${email}</p>
          <p>${message}</p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, info });
  } catch (error) {
    console.error("Email send error:", error);
    return NextResponse.json({ success: false, error: error.message });
  }
}
