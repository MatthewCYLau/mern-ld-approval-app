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
    text: `Thank you for signing up to a new learning course, ${name}. Here are the course expense instructions: On Swift Expense Report Details screen, in the Cost Assignment field, select Cost Centre from drop down and change to 300100963. On Expense Details screen, in the Manage Cost Assignment field, click on Add Cost Centre and select WBS Element from the drop down list. Enter the GAA code for Systems Engineering which is GAA00342-01-11-01-1000.`
  });
};

module.exports = {
  sendExpenseInstructionsEmail
};
