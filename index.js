const express = require("express");
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const formatDate = require('date-format');
const cors =  require("cors");
const multer = require('multer');
const { Readable } = require('stream');
const puppeteer = require('puppeteer');  
const fs = require('fs');
const path = require('path');


const app = express();
const port =  5000;
const upload = multer();  
 
const corsOptions = {
  origin: ["https://store.exportech.com.pt", "https://2smarttestekiosso.exportech.com.pt"],
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"]
};

app.use(cors());
app.use(bodyParser.json());

app.post('/sendemailaddressmessagetocompany', async (req, res) => {
  try { 
    const {nif, name, company, sector, email, phone, employeesnumber, message} = req.body;
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
    const mailOptions = {
      from: email, 
      to: "paulo.ferreira@exportech.com.pt",
      subject: `Solicitação de orçamento 2smart ( ${name} - da empresa ${company} )`,
      text: '',
       html: `
     <!doctype html>
      <html lang="pt">
      <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <title>2smart</title> 
          <link rel="preconnect" href="https://fonts.googleapis.com">
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
          <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet">
          <style>
           * ,html{
                  padding:0px; 
                  box-sizing: border-box;
                  margin:0px;   
                  outline: none;
              } 
              body {
                  font-family: "Montserrat", sans-serif !important;
                  font-weight:500;
              } 
              body .text-primary  {
                  color:#0d6efd;
              } 
              h1 {
                  font-size: 25px;
                  margin: 15px 0px;
                  margin-bottom: 5px;
                  font-weight: 650;
              } 
              .box {
                  max-width: 800px;
                  padding: 40px;
                  border: 1px solid rgb(234, 234, 234);
                  margin: 30px;
              } 
              .box p{
                  font-size: 14px;
                  line-height: 30px;
              } 
              .box span{
                color:#161A1D;
                font-weight: normal;
              } 
              .box table,
              .box table tbody tr{
                  width:100%; 
              } 
              .box table tbody tr td{
                  padding:10px 0px;
                  min-width:50%;
                  border-bottom:1px solid #E7ECEF; 
              } 
          </style>
      </head> 
      <body>
          <div class="box">  
              <img src="cid:myImg" style="width:150px;height:80px;margin-bottom:5px;object-fit:contain;"/> 
              <h1>Solicitação de orçamento</h1> 
              <div class="mt-2"> <small class="text-primary">${formatDate.asString('dd-MM-yyyy - hh:mm:ss', new Date())}</small> </div><br> 
              <p> ${message} </p>
              <br>   
              <h3 class="text-primary">Dados do cliente *</h3> <br>
              <table class="table table-bordered table-hover">
                  <tbody>
                      <tr>
                          <td><strong>Nome do representante</strong></td>
                          <td><span>${name}</span> </td>
                      </tr>
                      <tr> 
                          <td><strong> Empresa</strong></td>
                          <td><span>${company}</span> </td>
                      </tr>
                      <tr>
                          <td><strong>Email </strong></td>
                          <td><span>${email}</span> </td>
                      </tr>
                      <tr>
                          <td><strong>Telemovel </strong></td>
                          <td><span>${phone}</span> </td>
                      </tr>
                      <tr>
                          <td><strong>Número de colaboradores</strong></td>
                          <td><span>${employeesnumber}</span> </td>
                      </tr>
                      <tr>
                          <td><strong>Nif </strong></td>
                          <td><span>${nif}</span> </td>
                      </tr>
                      <tr>
                          <td><strong>Sector </strong></td>
                          <td><span>${sector}</span> </td>
                      </tr>
                  </tbody>
              </table> 
          </div>
        </body> 
       </html> `, 
       attachments:[{
        filename:'Educative.png',
        path:__dirname + '/logo.png',
        cid:'myImg'
      }]
    }; 

    const mailOptions1 = {
      from:"2smarthrm@gmail.com",    
      to:email,  
      subject:`Solicitação de orçamento para o software 2smart - Agradecimento`,
      text:'',
       html:`
         <!doctype html>
          <html lang="en">
          <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1">
              <title>2smart</title>
              <link rel="preconnect" href="https://fonts.googleapis.com">
              <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
              <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap"
              rel="stylesheet">
              <style> 
              *, html  {
                      padding:0px; 
                      box-sizing:border-box;
                      margin:0px;   
                      outline:none;
                  }
              
                  body {
                      font-family:"Montserrat", sans-serif !important;
                      font-weight:500;
                  }
                  
                  body .buttons{
                      display:flex;
                      align-items:center;
                  }

                  body button{
                      background:#0d6efd;
                      margin:5px 10px; 
                      width:200px;
                      border: none;
                      padding:15px 10px;
                      border-radius:6px;
                      font-size:15px;
                      color:#ffff;
                      cursor: pointer;
                  }

                  body button:hover{
                      background:#131212; 
                  }
            
                  .logo {
                      max-width:200px;
                      margin-bottom:20px;
                      object-fit:contain;
                  }

                  h1{
                      font-size:25px;
                      margin: 20px 0px;
                      margin-bottom:5px;
                      font-weight:bolder;
                  }


                  .box {
                      max-width: 800px;
                      padding: 40px;
                      border: 1px solid rgb(234, 234, 234);
                      margin: 30px;
                      display: flex;
                      flex-direction: column;
                      align-items: center;
                      justify-content: center;
                      text-align: center;
                  }

                  .box p{
                      font-size: 14px;
                      line-height: 30px;
                  }

                  .box span{
                    color:#161A1D;
                    font-weight: normal;
                  }

                  .box table,
                  .box table tbody tr{
                      width:100%; 
                  }

                  .box table tbody tr td{
                      padding:10px 0px;
                      min-width:50%;
                      border-bottom:1px solid #E7ECEF; 
                  }
              </style>
          </head> 
          <body>
              <div class="box"> 
                   <img src="cid:myImg" style="width:150px;height:80px;margin-bottom:5px;object-fit:contain;"/> 
                  <h1>Olá, Muito obrigado por entrar em contacto connosco !</h1>  
                  <p> A nossa Equipa Comercial entrará em contacto consigo brevemente <br>
                  para mais informações visite os nossos websites.</p>
                  <br>
                  <div class="buttons">
                      <a href="#" target="_blank" rel="noopener noreferrer">
                          <button class="btn">2Smart Website</button>  
                      </a>
                    <a href="https://exportech.com.pt" target="_blank" rel="noopener noreferrer">
                        <button class="btn">Exportech Website</button>
                    </a>
                  </div> 
              </div>
            </body>
          </html> 
       `, 
       attachments:[{
        filename:'Educative.png',
        path:__dirname + '/logo.png',
        cid:'myImg'
      }]
    }; 

  transporter.sendMail(mailOptions, function (err, info) {
      if (err) {
        console.log("-------------- error --------------");
        console.clear(err) 
        return res.status(300).json(err);
      } else { 
        transporter.sendMail(mailOptions1, function (err1, info1) {
          if (err1) {
            console.log("-------------- error  --------------");
            console.clear(err1)
            return res.status(300).json(err1);
          } else {
            console.log("-------------- Data --------------");
            console.log(info1);
            return res.status(200).json("Mensagem enviada com sucesso !");
          }
        }); 
      }
    });
   } catch (error) {
    console.log("-------------- error --------------")
    console.clear(error)
    res.status(500).json("Lamentamos mas não foi possivel enviar a mensagem !");
   } 
})


app.post('/sendfile',  async(req, res) => { 
 try { 
  const Data = { };
 // const Products = Data.products;

  let ProductsContent = ``;
  /*
  for (var i = 0; i < Products.length; i++) {
        ProductsContent += `
        <section> 
            <div class="pr"><span><strong>(${i+1}) - Referência do Equipamento:</strong>${Products[i].referenciadoequipamento}</span><br></div> 
            <div class="pr"><span><strong>Motivo da devolução: </strong>${Products[i].motivodadevolucao} </span><br></div> 
            <div class="pr"><span><strong>Número de série:  </strong>${Products[i].ndeserie} </span><br></div> 
            <div class="pr"><span><strong>No Fatura Compra:  </strong>${Products[i].nfaturacompra} </span><br></div> 
            <div class="pr"><span><strong>Palavra-Passe do Equipamento:  </strong>${Products[i].palavrapassedoequipamento}  </span><br></div> 
            <div class="pr"><span><strong>Descrição da Avaria:  </strong>${Products[i].descricaodaavaria} </span><br></div> 
            <div class="pr"><span><strong>Acessórios que acompanham o equipamento:  </strong>${Products[i].acessoriosqueacompanhamoequipamento}  </span><br></div> <br>
         </section>`; 
  }*/

 
   console.log("####################################");
   console.log("Data", req.body);

    // HTML content to be converted to PDF
    const htmlContent = `
    <html>
      <head>
        <style>
          body {
            font-family: 'Montserrat', sans-serif;
            margin: 20px;
          }
          h1 {
            font-size: 18px;
            color: #0074fe;
          }
          .pr{
              margin:5px 0px;
          }
          
          .txt{
              margin-left:5px;
          }

          .section-title {
            font-size: 16px;
            font-weight: bold;
            margin-top: 20px;
          }
          p, span {
            font-size: 12px;
            margin: 5px 0;
          }
          .small-text {
            font-size: 11px;
            color: rgb(79, 79, 79);
            line-height: 20px;
          }
          .form-section {
            margin-bottom: 20px;
          }
          .logo img {
            max-width: 250px;
            min-height: 40px;
          }
        </style>
      </head>
      <body>
        <div id="formulario">
          <div class="logo">
            <img src="https://clone.store.exportech.com.pt/wp-content/uploads/2024/11/Exportech_Logo.webp" alt="Logo">
          </div>
          <h1>Formulário de devolução de equipamentos</h1>
          <div class="form-section"> 

            <div class="pr"><span><strong>Empresa: </strong><span id="data-company" class="txt">${Data.company}</span></span><br></div>
            <div class="pr"><span><strong>Email: </strong><span id="data-email" class="txt">${Data.email}</span></span><br></div>
            <div class="pr"><span><strong>Telefone: </strong><span id="data-phone" class="txt">${Data.phone}</span></span><br></div> 
            <div class="pr"><span><strong>NIF: </strong><span id="data-nif" class="txt">${Data.nif}</span></span></div> 

          </div>
          <div class="form-section">
            <p class="section-title">Produtos listados</p><br>
            ${ProductsContent}
          </div>
          <div class="form-section">
            <p class="section-title">Condições de Aceitação</p>
             <p class="small-text">
                  1 - Os RMAs deverão ser sempre acompanhados do presente Formulário;<br>
                  2 - Deverão ser indicados expressamente todos os Acessórios que acompanham o RMA sob pena de não serem aceites posteriormente solicitações de acessórios não indicados.<br>
                  3 - RMAs que não revelem qualquer avaria serão expedidos sendo os custos de transporte suportados pelo Cliente e será debitada uma Taxa de 15,00€ pela Assistência prestada;<br>
                  4 - Quando em Período de Garantia, o Cliente suporta os custos de Transporte para a Exportech sendo que a Exportech suporta os custos de reenvio para o cliente;<br>
                  5 - As solicitações de Crédito deverão ser efectuadas até um Período máximo de 14 Dias Úteis após a emissão da Factura, sendo que a partir dessa Data está sujeita a Avaliação e Aceitação da Exportech Portugal;<br>
                  6 - Apenas serão aceites para Crédito Produtos cuja verificação pelos nossos Serviços Técnicos verifique que são válidas as 4 Premissas supra (Funcionamento Normal | Pacote Completo | Caixa em Bom Estado | Equipamento Vendável);<br>
                  7 - Equipamentos que não sejam levantados ou cujo Pagamento da respectiva Reparação não seja liquidado em 60 Dias reverterão para a Exportech Portugal;<br>
                  Todos os equipamentos fora do período de garantia estão sujeitos a um valor de 25,00€ pela respectiva análise. Este valor será diluído no custo da Reparação caso o Orçamento seja aceite;<br>
                  Todas as Reparações beneficiam de uma Garantia de 3 Meses;<br>
                  Todos os equipamentos para nota de crédito têm que mencionar a password do equipamento no campo acima. Em caso de esquecimento ou perda da(s) password(s) a Exportech irá cobrar pelo serviço unitário o valor de 25€ + iva.<br>
                  Emissão de Notas de Crédito quando da devolução de equipamentos por parte dos cliente: Até 15 dias* - Não existe desvalorização, 16 a 31 dias* - 15% de desvalorização, 32 a 60 dias* - 40% de desvalorização. Após 61 dias a Exportech não aceita a devolução.<br>
                  8 - Todos os equipamentos fora do período de garantia estão sujeitos a um valor de 25,00 € pela respectiva análise. Este valor será diluído no custo da Reparãção caso o Orçamento seja aceite; <br>
                  9 -  Todas as Reparações beneficiam de uma Garantia de 3 Meses; <br>
                  10 -  Todos os equipamentos para nota de crédito têm que mencionar a password do equipamento no campo acima. <br>
                  Em caso de esquecimento ou perda da(s) password(s) a Exportech irá cobrar pelo serviço unitário o valor de 25€+iva.  <br>
                  11 - Emissão de Notas de Crédito aquando da devolução de equipamentos por parte dos cliente: Até 15 dias* – Não existe desvalorização<br>
                  16 – 31 dias* – 15% desvalorização <br>
                  32 – 60 dias* – 40% desvalorização <br>
                  *(assumindo que o equipamento está perfeitamente vendável, embalagem origem, isento de riscos e/ou uso, acessórios, etc); Após 61 dias – A Exportech não aceita a devolução. <br>
                  12 - Produtos de Projecto ou Encomenda propositada para projecto (Produtos de Não Stock) – A Exportech não aceita a devolução;<br>
            </p>
          </div>
        </div>
      </body>
    </html>`;

  let transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "2smarthrm@gmail.com",
      pass: "bguvbniphmcnxdrl",   
    },
});
 
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(htmlContent);
  const pdfBuffer = await page.pdf({
    format: 'A4',
    printBackground: true,
    preferCSSPageSize: true,
  });
  await browser.close();

  // Save the PDF locally
  const pdfPath = path.join(__dirname, 'formulario.pdf');
  fs.writeFileSync(pdfPath, pdfBuffer);


let mailOptions = {
    from:"geral@exportech.com.pt",
    to:['kiossocamuegi@gmail.com', Data.email],
    subject: 'Exportech - Formulário de devolução de equipamentos ('+ Data.company +')',
    text: 'formulario anexado a  mensagem.',
    attachments: [
        {
            filename: 'formulario_rma.pdf',
            content: pdfBuffer
        }
    ]
};


  // Send the email with the attachment
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return res.status(500).send('Error sending email: ' + error);
    }
    res.status(200).send('Email sent: ' + info.response);
});

 } catch (error) {
    console.log(error);
 } 
});


app.get('/', async (req, res) => {
  res.status(200).json("Hello world !"); 
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
