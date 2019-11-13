const puppeteer = require('puppeteer')

jest.setTimeout(30000)

describe(`Suffragium`,()=>{

  let browserA, pageA
  let browserB, pageB

  beforeAll(async ()=>{
    // create two browsers
    browserA = await puppeteer.launch({
	    headless: false,
      slowMo: 200,
      args: [`--window-size=700,800`,`--window-position=0,0`]
    })
    pageA = await browserA.newPage()

    // browserB = await puppeteer.launch({
	  //   headless: false,
    //   slowMo: 20,
    //   args: [`--window-size=1100,800`,`--window-position=350,0`],
    //   defaultViewport: null
    // })
    // pageB = await browserB.newPage()

  })

  afterAll(async ()=>{
    // await browserA.close()
    // await browserB.close()
  })

//////////// the tests /////////////////////////////////////

  test(`login page loads in browser A`, async ()=>{
    await pageA.goto(`http://localhost:3002/#!/login`)
  	await pageA.waitFor(`title`)
    const theTitle = await pageA.title()
  	expect(theTitle).toBe(`Suffragium`)
  })

  // The next tests assume that users "qq@qq.qq" and "ww@ww.ww"
  // are already in the database. Also, a question with "Star Wars"
  // in the title must have been created by user "qq@qq.qq".
  // A professional E2E-test should create these users, either 
  // through:
  // * the UI (in that case, it becomes another E2E-test, for 
  //          registering users), or
  // * creating the users in the DB itself through the MongoDB-
  //          driver or Mongoose. 

  test(`can login at A`, async ()=>{
    await pageA.type(`input#email`, `qq@qq.qq`)
    await pageA.type(`input#password`,`qqqqqq`)
    const loginButton = await pageA.$(`form[name="register"] button`)
    expect(loginButton).toBeDefined()
    await loginButton.click()
    const theDiv = await pageA.waitFor(`p.owned-polls`)
    expect(theDiv).toBeDefined();
  })

  // test(`login page loads in browser B`, async ()=>{
  //   await pageB.goto('http://localhost:3002/#!/login')
  // 	await pageB.waitFor(`title`)
  //   const theTitle = await pageB.title()
  // 	expect(theTitle).toBe(`Suffragium`)
  // })
  //
  // test(`can login at B`, async ()=>{
  //   await pageB.type(`input#email`,`ww@ww.ww`)
  //   await pageB.type(`input#password`,`wwwwww`)
  //   const loginButton = await pageB.$(`form[name="register"] button`)
  //   expect(loginButton).toBeDefined()
  //   await loginButton.click()
  //   const theDiv = await pageB.waitFor(`p.owned-polls`)
  //   expect(theDiv).toBeDefined();
  // })

  // let pollLink  // the link will be found in browserA, and used to navigate in
  //               // broswerB
  //
  // test(`pageA can navigate to own poll`, async ()=> {
  //   await pageA.$$eval(`p.question-own-poll`, arr => {
  //     starWarsLink = arr.filter(p => p.textContent.includes(`Star Wars`))[0]
  //     starWarsLink.click() // this click is triggered in the browser!
  //   })
  //   await pageA.waitFor(`button.voted`)
  //   pollLink = await pageA.evaluate( () => {
  //     return window.location.href
  //   })
  //   expect(pollLink).toBeDefined()
  // })
  //
  // test(`pageB navigates to poll url`, async () => {
  //   await pageB.goto(pollLink)  // use the URL found in the other browser (previous test)
  //   await pageB.waitFor(`button.voted`, {timeout: 2000})
  //   // No expect-assertion! The previous line will throw an exception
  //   // if the button does not appear in two seconds. That will make
  //   // this test fail.
  // })
 


  // async function getFirstOptionVotes(page) {
  //   // Get the value in the second table cell in first row of the results
  //   // table. Note the conversion to an integer.
  //   return parseInt(await page.$eval(
  //     `div.container-graph table tr:nth-child(1) > td:nth-child(2)`,
  //     (el) => el.textContent
  //   ))
  // }
  // 
  // test(`poll scores are equal in both browsers`, async () => {
  //   const firstOptionVotesA = await getFirstOptionVotes(pageA)
  //   const firstOptionVotesB = await getFirstOptionVotes(pageB)
  //   expect(firstOptionVotesA).toEqual(firstOptionVotesB)
  // })
  // 
  // test(`votes are updated in both browsers`, async ()=>{
  //   const firstOptionVotesA_before = await getFirstOptionVotes(pageA)
  //   // Clicking on the radio-button itself did not work. There is a label that
  //   // seems to overlap the radio-button. Luckily, if we simply click the label,
  //   // the radio-button will also be checked.
  //   await pageA.click(`div.container-question label[for="option0"]`)
  //   await pageA.click(`div.container-question button.voted`)
  //   const firstOptionVotesA_after = await getFirstOptionVotes(pageA)
  //   expect(firstOptionVotesA_after).toBe(firstOptionVotesA_before+1) // was the score increased?
  //
  //   pageB.waitFor(200)  // Allow 200 ms for update to arrive at other browser.
  //   const firstOptionVotesB_after = await getFirstOptionVotes(pageB)
  //   expect(firstOptionVotesB_after).toBe(firstOptionVotesA_before+1) // was the score also updated in other browser?
  // })
})
