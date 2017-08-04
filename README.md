# crewlybot
A web scraper that emails you when clothing is in stock.

Right now it is hardcoded to check 'https://www.jcrew.com/p/E8592' but you can edit that LOC.  

# Prereqs 

  You will need to create the file config/application.yml 
  
  You will need to fill it with:
  

          {
          "email_key_secret": "SG.b1Mv06RFQKi9Hs_____SENDGRIDAPIKEY_____U",
          "alert_destination_email_address": "recipientemail@gmail.com"
          }



# Use

    npm install

    node index.js 
    
    
    
# Outcome

Every 30 mins, if the clothing is in stock, you will get an email at the Alert Destination Email Address 
