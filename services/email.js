const Mailgen = require('mailgen')
require('dotenv').config()

class EmailService {
  constructor(env, sender) {
    this.sender = sender
    switch (env) {
      case 'development':
        this.link = 'http://localhost:3000'
        break
      case 'production':
        this.link = 'link fro production'
        break
      default:
        this.link = 'http://localhost:3000'
        break
    }
  }
  #createTemplateVerificationEmail(verifyToken, name) {
    const mailGenerator = new Mailgen({
      theme: 'cerberus',
      product: {
        name: 'Summer',
        link: this.link,
      },
    })
    const email = {
      body: {
        name,
        intro:
          "Welcome to Summer!",
        action: {
          instructions: 'To get started with Summer, please click here:',
          button: {
            color: '#22BC66', 
            text: 'Confirm your account',
            link: `${this.link}/api/users/verify/${verifyToken}`,
          },
        },
      },
    }
    return mailGenerator.generate(email)
  }
  async sendVerifyEmail(verifyToken, email, name) {
    const emailHtml = this.#createTemplateVerificationEmail(verifyToken, name)
    const msg = {
      to: email,
      subject: 'Verify your account',
      html: emailHtml,
    }
    console.log('Presend')
    const result = await this.sender.send(msg)
    console.log(result)
  }
}

module.exports = EmailService