const cheerio = require('cheerio')
var https = require('https');


function parseHTML(content)
{

  const $ = cheerio.load(content)


    console.log("PLEASE WAIT.  CREWLYBOT CHECKING INVENTORY.")


  var elem_to_check = $('li[data-name="11 MEDIUM"]');

  var avail = $(elem_to_check).hasClass('is-unavailable') == false

  console.log("are size 11 NB791 available?")
    console.log(avail)



    var elem_to_check = $('li[data-name="5 MEDIUM"]');

    var avail = $(elem_to_check).hasClass('is-unavailable') == false

    console.log("are size 5 NB791 available?")
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

scrapeWebData()
setInterval(function(){scrapeWebData()}, 30 * 60 * 1000 ); //every half hour
