const puppeteer = require('puppeteer');
const { expect } = require('chai');

async function getPropValueFromCSS( prop, source, page ) {
  const theElement = await page.$(source)
  if( ! theElement ) throw new Error("Element '"+source+"' not found.")
  const theProp = await theElement.getProperty(prop)
  return theProp.jsonValue()
}

describe("Loading first page", function() {

  it("should load Hacker Noon", async function(){
    this.timeout(100000);
    const browser1 = await puppeteer.launch({
      headless: false,  // An invisible (headless) browser is faster, but
                        // we want to see what's going on.
      slowMo: 250,      // Slow down scripts to be able to see what's happening.
      timeout: 10000,   // Give the system some time to start the browser.
      args: ['--window-size=1200,800', '--window-position=25,30']
    });
    //
    // const browser2 = await puppeteer.launch({
    //   headless: false,  // An invisible (headless) browser is faster, but
    //                     // we want to see what's going on.
    //   slowMo: 250,      // Slow down scripts to be able to see what's happening.
    //   timeout: 10000,   // Give the system some time to start the browser.
    //   args: ['--window-size=600,800', '--window-position=650,30']
    // });


    const page1 = await browser1.newPage();
    await page1.goto("http://localhost:3003")
    await page1.setViewport({
      width: 1200, height: 800
    });
    // const page2 = await browser2.newPage();
    // await page2.goto("https://www.example.com/")

    // expect(await page1.title()).to.equal('Suffragium');
    await page1.waitFor('nava')

    let content = await getPropValueFromCSS('innerHTML', 'a#AA', page1);
    expect(content).to.equal("Register");

    console.log( ">>1" );

    await page1.click('a#BB')
    console.log( ">>2");
    await page1.waitFor('h1.title-color')
    console.log( ">>3" );

    content = await getPropValueFromCSS('innerHTML', 'h1.title-color', page1);
    console.log( ">>4");

    expect(content).to.equal("Register");


    await page1.close();
    await browser1.close();
  })

})
