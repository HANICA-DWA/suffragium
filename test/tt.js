const puppeteer = require('puppeteer');

async function main() {
  const browser = await puppeteer.launch( );
  const page = await browser.newPage();

  page.on('load', () => console.log('loaded!'));

  await page.goto('https://mdn.github.io/learning-area/html/forms/your-first-HTML-form/first-form-styled.html');
  await page.waitForSelector('form[action^="/my-handling-form-page"]');
  await page.type('input[name="user_mail"]', 'mati@mati.com');
  await page.type('input[name="user_name"]', 'mati');

  await page.click('button[type="submit"]');
  console.log('clicked');

  await page.waitForNavigation();

  console.log('done');
}

main();
