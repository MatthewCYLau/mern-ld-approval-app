const sgMail = require("@sendgrid/mail");
const config = require("config");

sgMail.setApiKey(
  process.env.SENDGRID_API_KEY || config.get("SENDGRID_API_KEY")
);

const sendExpenseInstructionsEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: "lau.cy.matthew@gmail.com",
    subject: "Course expense instructions",
    text: `Thank you for signing up to a new learning course, ${name}. Here are the course expense instructions: `
  });
};

module.exports = {
  sendExpenseInstructionsEmail
};
