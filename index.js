  const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(cors({
  origin: ["https://2smart.pt", "https://store.exportech.com.pt"]
})); // Allow requests from both domains

// Email transporter (Keep credentials as requested)
const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "2smarthrm@gmail.com",
    pass: "bguvbniphmcnxdrl",
  },
});

// Route: RMA Form Submission
app.post("/sendfile", async (req, res) => {
  try {
    const { nif, name, company, sector, email, phone, employeesnumber, message } = req.body;

    if (!nif || !name || !company || !sector || !email || !phone || !employeesnumber || !message) {
      return res.status(400).json({ success: false, error: "All fields are required!" });
    }

    const htmlContent = `
    <html>
      <head>
        <style>
          body { font-family: 'Montserrat', sans-serif; margin: 20px; }
          h1 { font-size: 18px; color: #0074fe; }
          .pr { margin:5px 0px; }
          .txt { margin-left:5px; }
          .form-section { margin-bottom: 20px; }
          .logo img { max-width: 250px; min-height: 40px; }
        </style>
      </head>
      <body>
        <div id="formulario">
          <div class="logo">
            <img src="https://clone.store.exportech.com.pt/wp-content/uploads/2024/11/Exportech_Logo.webp" alt="Logo">
          </div>
          <h1>Formulário de devolução de equipamentos</h1>
          <div class="form-section"> 
            <div class="pr"><strong>Empresa:</strong> <span class="txt">${company}</span></div>
            <div class="pr"><strong>Email:</strong> <span class="txt">${email}</span></div>
            <div class="pr"><strong>Telefone:</strong> <span class="txt">${phone}</span></div> 
            <div class="pr"><strong>NIF:</strong> <span class="txt">${nif}</span></div> 
          </div>
        </div>
      </body>
    </html>`;

    const mailOptions = {
      from: email,
      to: "kiosso.silva@exportech.com.pt",
      subject: `RMA Form Submission (${name} - ${company})`,
      html: htmlContent,
    };

    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: "RMA email sent successfully!" });

  } catch (error) {
    console.error("Error sending RMA email:", error);
    res.status(500).json({ success: false, error: "Failed to send email." });
  }
});

// Route: Quotation Request (Renamed)
app.post("/sendemailaddressmessagetocompany", async (req, res) => {
  try {
    const { nif, name, company, sector, email, phone, employeesnumber, message } = req.body;

    if (!nif || !name || !company || !sector || !email || !phone || !employeesnumber || !message) {
      return res.status(400).json({ success: false, error: "All fields are required!" });
    }

    const mailOptions = {
      from: email,
      to: "kiosso.silva@exportech.com.pt",
      subject: `Solicitação de orçamento 2smart (${name} - da empresa ${company})`,
      html: `
      <html>
      <head>
          <style>
              body { font-family: 'Montserrat', sans-serif; }
              h1 { font-size: 25px; font-weight: 650; margin-bottom: 5px; }
              .box { max-width: 800px; padding: 40px; border: 1px solid #eaeaea; margin: 30px; }
              .box p { font-size: 14px; line-height: 30px; }
              .box table { width: 100%; }
              .box table td { padding: 10px 0; border-bottom: 1px solid #E7ECEF; }
          </style>
      </head>
      <body>
          <div class="box">  
              <h1>Solicitação de orçamento</h1> 
              <p> ${message} </p>
              <h3>Dados do cliente</h3>
              <table>
                  <tr><td><strong>Nome:</strong></td><td>${name}</td></tr>
                  <tr><td><strong>Empresa:</strong></td><td>${company}</td></tr>
                  <tr><td><strong>Email:</strong></td><td>${email}</td></tr>
                  <tr><td><strong>Telefone:</strong></td><td>${phone}</td></tr>
                  <tr><td><strong>Número de colaboradores:</strong></td><td>${employeesnumber}</td></tr>
                  <tr><td><strong>NIF:</strong></td><td>${nif}</td></tr>
                  <tr><td><strong>Setor:</strong></td><td>${sector}</td></tr>
              </table> 
          </div>
      </body>
      </html>`
    };

    // Confirmation email to the user
    const mailOptions1 = {
      from: "2smarthrm@gmail.com",
      to: email,
      subject: `Solicitação de orçamento para o software 2smart - Agradecimento`,
      html: `
      <html>
      <head>
          <style>
              body { font-family: 'Montserrat', sans-serif; text-align: center; }
              h1 { font-size: 25px; font-weight: bolder; margin-bottom: 5px; }
              .box { max-width: 800px; padding: 40px; border: 1px solid #eaeaea; margin: 30px auto; }
              .buttons { display: flex; justify-content: center; }
              .buttons a button { background: #0d6efd; border: none; padding: 15px 10px; border-radius: 6px; font-size: 15px; color: #fff; cursor: pointer; margin: 5px 10px; }
              .buttons a button:hover { background: #131212; }
          </style>
      </head>
      <body>
          <div class="box"> 
              <h1>Olá, Muito obrigado por entrar em contacto connosco!</h1>  
              <p>A nossa Equipa Comercial entrará em contacto consigo brevemente.</p>
              <div class="buttons">
                  <a href="https://2smart.pt"><button>2Smart Website</button></a>
                  <a href="https://exportech.com.pt"><button>Exportech Website</button></a>
              </div>
          </div>
      </body>
      </html>`
    };

    await transporter.sendMail(mailOptions);
    await transporter.sendMail(mailOptions1);

    res.json({ success: true, message: "Emails sent successfully!" });

  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ success: false, error: "Failed to send emails." });
  }
});

// Start Server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
