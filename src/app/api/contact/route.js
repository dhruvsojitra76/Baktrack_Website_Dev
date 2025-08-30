// app/api/contact/route.ts
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, message } = body;

    if (!firstName || !lastName || !email || !message) {
      return new Response(
        JSON.stringify({ success: false, message: "All fields are required" }),
        { status: 400 }
      );
    }

    // ✅ Use Gmail service
    const transporter = nodemailer.createTransport({
      service: "zoho",
      auth: {
        user: process.env.SMTP_USER, // your Gmail
        pass: process.env.SMTP_PASS, // your Google App Password
      },
    });

    await transporter.sendMail({
      from: `"Website Contact" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER,
      subject: "📮 New Contact Form Submission",
      text: `
        Name: ${firstName} ${lastName}
        Email: ${email}
        Message: ${message}
      `,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><b>Name:</b> ${firstName} ${lastName}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Message:</b></p>
        <p>${message}</p>
      `,
    });

    return new Response(
      JSON.stringify({ success: true, message: "✅ Email sent successfully!" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Error sending email:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Failed to send email", error: error.message }),
      { status: 500 }
    );
  }
}
