import nodemailer from "nodemailer";

export const sendLoginEmail = async ({
  email,
  url,
  token,
}: {
  email: string;
  url: string;
  token: string;
}) => {
  const testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });

  const info = await transporter.sendMail({
    from: '"Lukas" <lukas.pokryvka@gmail.com>',
    to: email,
    subject: "Login to your account",
    html: `Login by clicking here <a href="${url}/login#token=${token}">Login</a>`,
  });

  console.log(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
};
