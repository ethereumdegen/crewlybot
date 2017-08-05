# crewlybot
A web scraper that emails you when clothing is in stock.

Right now it is hardcoded to check 'https://www.jcrew.com/p/E8592' but you can edit that url right in the code.  

# Prereqs 

  You will need to create the file config/application.yml 
  
  You will need to fill it with:
  

          {
          "email_key_secret": "SG.b1Mv06RFQKi9Hs_____SENDGRIDAPIKEY_____U",
          "alert_destination_email_address": "recipientemail@gmail.com"
          }
          
          
   Note: The email_key_secret is an API key secret that you will need to create using a new free account on Sendgrid.  This is because NodeJS can't easily send emails on its own, it needs a third-party service like Sendgrid.  
          
          
 #  The secret sauce 
  
  The parseHTML function uses Jquery to find specific elements on the page, evalate them, and then send an email based on a condition.  This is the real heart of this bot.  The rest of the bot's code really just facilitates this function.  

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

           ...

          }

# Use

    npm install

    node index.js 
    
    
    
# Outcome

Every 30 mins, if the clothing is in stock, you will get an email at the Alert Destination Email Address 
