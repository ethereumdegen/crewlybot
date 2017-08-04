const cheerio = require('cheerio');

var https = require('https');


var figaroJSONPath = "config/application.yml"
var figaro = require('figaro').parse(figaroJSONPath, envCallback);


function envCallback()
{
  console.log('env callback')
}

function parseHTML(content)
{



  const $ = cheerio.load(content)


    console.log("PLEASE WAIT.  CREWLYBOT CHECKING INVENTORY.")


  var elem_to_check = $('li[data-name="11 MEDIUM"]');

  var avail = $(elem_to_check).hasClass('is-unavailable') == false

  console.log("are size 11 NB791 available?")
    console.log(avail)


    if(avail)
    {
      sendEmail("The size 11s are available!")
    }


    var elem_to_check = $('li[data-name="10 MEDIUM"]');

    var avail = $(elem_to_check).hasClass('is-unavailable') == false




        if(avail)
        {
          sendEmail("The size 10s are available!")
        }



    console.log("are size 10 NB791 available?")
      console.log(avail)


   console.log('parsed html ')
}



function scrapeWebData()
{



  var phantom = require('phantom');

  phantom.create().then(function(ph) {
    ph.createPage().then(function(page) {
      page.open('https://www.jcrew.com/p/E8592').then(function(status) {
        console.log(status);
        page.property('content').then(function(content) {
      //    console.log(content);

          parseHTML(content)

        //page.close();
          var promise = page.close();

          promise.then(function(){

              ph.exit();
          });

        });
      });
    });
  });

}



function sendEmail(message)
{


    var nodemailer = require('nodemailer');

    var sgTransport = require('nodemailer-sendgrid-transport');

      var options = {
        auth: {

          api_key:  process.env.email_key_secret
        }
      }


        var client = nodemailer.createTransport(sgTransport(options));



      var email = {
        from: 'crewlybot@crewlybot.com',
        to: process.env.alert_destination_email_address,
        subject: 'Crewlybot has a message for you!',
        text: message,
        html: message
      };

      client.sendMail(email, function(err, info){
          if (err ){
            console.log(err);
          }
          else {
            console.log('Message sent: ' + info.response);
          }
      });





}


scrapeWebData()
setInterval(function(){scrapeWebData()}, 30 * 60 * 1000 ); //every half hour



/*

cample config/application.yml

{
"email_address": "xxx@gmail.com",
"email_password": "test",
"alert_destination_email_address": "yyy@gmail.com"
}



*/
