
## Setting up

Start an empty browser (no tabs yet):
```js
let theBrowser = await puppeteer.launch({ options })
/* options:     headless: true,   // Set to false to make
                                  //    broswer window visible.
                sloMo:    0,      // milliseconds; Set to e.g. 250 to
                                  //    insert small pauses between
                                  //    steps, and see what is happening
                timeout:  300000, // milliseconds
*/
```    
Create an empty tab in the browser:
```js    
let thePage = await theBrowser.newPage()
```    
#### Shutting down
```js
await thePage.close()
await theBrowser.close()
```

## Navigation
#### load URLs:
```js    
await thePage.goto( url )
await thePage.goto( url, { options} )
      // options: timeout:   30000  // ms
      //          waitUntil: "load" // choose from "load", "domcontentloaded", "networkidle0"

let response = await thePage.goto( url )
      // result is a Response-object (see docs) giving
      // access to HTTP status, headers, body etc. but also to the request
```
#### Other navigation:    
```js    
await page.goBack()     // can take same options as goto(), can return a Response-object
await page.goForward()  // can take same options as goto(), can return a Response-object

await page.setContent( html_string )
```  
#### After navigating, wait for content to be loaded:  
```js
await thePage.waitFor( cssSelector )  // wait for element to appear in page.
await thePage.waitFor( cssSelector, {options} )  
      // options:
      //    visible: true/false  // element must be visible
      //    hidden:  true/false
      //    timeout: number      // ms
await thePage.waitFor( number )         // wait milliseconds.
```    

## Interacting with the webpage
```js    
await thePage.setViewport({ width: numPixels, height: numPixels})
       // set window size
```
#### Executing code in the browser process:    
```js    
await thePage.evaluate( func, ...args )              
       // execute func in browser itself.

let result = await thePage.evaluate( func, ...args )
       // func return value must be convertable to JSON
```
#### Simulating user behaviour:   
```js    
await thePage.click( cssSelector )
await thePage.click( cssSelector, { clickCount: 2 } )  // do a double-click
await theElement.click();  
   // elements can be found using '$' and '$$' methods (see below)

await thePage.type( text )
   // keyboard interaction.
await thePage.type( text, { delay: 10} )  // delay between key presses in ms.
await theElement.type( text )

await thePage.focus( cssSelector )
await theElement.focus(); // elements can be found using '$' and '$$' methods (see below)

await page.keyboard.type('Hello World!');
await page.keyboard.press('ArrowLeft');  // 'Backspace', 'Tab', 'Enter', 'KeyA'-'KeyZ', 'F1', 'Shift'

await page.keyboard.down('Shift');   // combination to press 'A'
await page.keyboard.press('KeyA');
await page.keyboard.up('Shift');

await page.mouse.click(x, y);
await page.mouse.move(x, y); // opt. third param: { steps: 6 } makes 6 mouse-moves for intermediate steps.
await page.mouse.down(); // optional param: { button: 'left' } or 'middle' or 'right.
await page.mouse.up();   // optional param: { button: 'left' } or 'middle' or 'right.

await thePage.select( cssSelector, value ) // select option for <select> element
await theInputElement.uploadFile(...filePaths)
```    

## Getting info from browser

####  finding specific elements on the page:
```js
let theElement = await thePage.$( css_selector )  
      // like querySelector. The result is not a normal DOM node,
      // but a reference to a DOM node in the browser.
let theElement = await thePage.$$( css_selector )
      // like querySelectorAll. Returns multiple results.

let anotherElement = theElement.$( css_selector )  // search below this element
let anotherElement = theElement.$$( css_selector ) // search for multiple, below this element

let theTitle = await thePage.title()
```
#### Reading the complete page:
```js
let html = await thePage.content() // see setContent() above
```
## Getting detailed info

This function makes it easier to get properties from DOM nodes in page. See examples below.
Copy this function to your own script.
```js
// params:   prop:    name of property to retrieve
//           source:  a string containing a CSS selector pointing to the element.
//           page:    the Puppeteer page (e.g. from browser.newPage()) that contains the selector.
async function getPropValueFromSelector( prop, source, page ) {
  const theElement = await page.$(source)
  const theProp = await theElement.getProperty(prop)
  return theProp.jsonValue()
}

// examples of use:
let content = await getPropValueFromSelector('innerHTML', 'article > title', thePage);
let email = await getPropValueFromSelector('value', 'form#register input[name="email"]', thePage);
```

## Page events
```js
thePage.on('console', (msg)=> { ... })   // content is in msg.args
thePage.on('load', () => { ... })
thePage.on('dialog', (theDialog)=> { ... })  
      // callback will be calle when there's an alert(), confirm()
      // or prompt() in the page.
      // In the callback, use theDialog.accept() or
      // theDialog.dismiss() to close.
```
## Saving screenshots
```js
await thePage.screenshot({path: filename});  
      // filename includes extension.
			// other options:
			//     type:  'png'          // or 'jpg'
			//     clip: {x:100,y:100,width:100,height:100}
			//     omitBackground: false // true for transparency
			//     fullPage: false       // true for entire scrollable area
await theElement.screenshot( options )  // same options as above
await thePage.pdf({path: filename, format: 'A4'}); // filename includes extension
```
