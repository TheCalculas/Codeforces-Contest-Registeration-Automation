const puppeteer = require("puppeteer");

const env = require("dotenv");
env.config();
const pass = process.env.PASSWORD;
const mail = process.env.MAIL;

const browserOpen = puppeteer.launch({
  headless: false,
  args: ["--start-maximized"],
  defaultViewport: null, // taaki ye full screen mei ho jaaye
});
let page;
browserOpen
  .then(function (browserObj) {
    // saare tabs open honge
    const browserOpenPromise = browserObj.newPage();
    return browserOpenPromise;
  })
  .then(function (browserPages) {
    page = browserPages; // phela tab milega page mei
    let googleOpenPromise = page.goto("https://www.google.com/");
    return googleOpenPromise;
  })
  .then(() => {
    // waiting for the element to apper that is we going to select
    const elementwaitPromise = page.waitForSelector(
      'input[type="text"]',
      (visible = "true")
    );
    return elementwaitPromise;
  })
  .then(() => {
    const codeforecesIsEntered = page.type('input[type="text"]', "codeforces", {
      delay: 20,
    });
    return codeforecesIsEntered;
  })
  .then(() => {
    const enterPressedPromise = page.keyboard.press("Enter");
    return enterPressedPromise;
  })
  .then(() => {
    // waiting for the first link to be select
    const elementWaitPromise = page.waitForSelector(
      ".tF2Cxc .yuRUbf .LC20lb.DKV0Md",
      (visible = "true")
    );
    return elementWaitPromise;
  })
  .then(() => {
    const clickLinkPromise = page.click(".tF2Cxc .yuRUbf .LC20lb.DKV0Md");
    return clickLinkPromise;
  })
  .then(() => {
    const url = page.url();
    const gotoPromise = page.goto(url + "enter?back=%2F");
    return gotoPromise;
  })
  .then(() => {
    const lookEmailPromise = page.waitForSelector(
      "#handleOrEmail",
      (visible = "true")
    );
    return lookEmailPromise;
  })
  .then(() => {
    const enterEmailPromise = page.type("#handleOrEmail", mail, { delay: 20 });
    return enterEmailPromise;
  })
  .then(() => {
    const passwordWaitPromise = page.waitForSelector(
      "#password",
      (visible = "true")
    );
    return passwordWaitPromise;
  })
  .then(() => {
    const passwordEnterPromise = page.type("#password", pass, {
      delay: 20,
    });
    return passwordEnterPromise;
  })
  .then(() => {
    const submitWaitPromise = page.waitForSelector(
      'input[type="submit"]',
      (visible = "true")
    );
    return submitWaitPromise;
  })
  .then(() => {
    const submitClickPromise = page.click('input[type="submit"]');
    return submitClickPromise;
  })
  .then(() => {
    return page.waitForTimeout(5000);
  })
  .then(() => {
    const elementwaitPromise = page.waitForSelector(
      'li a[href="/contests"]',
      (visible = "true")
    );
    return elementwaitPromise;
  })
  .then(() => {
    const mousewillClick = page.click('li a[href="/contests"]');
    return mousewillClick;
  })
  .then(() => {
    const registerWaitPromise = page.waitForSelector("td a.red-link");
    return registerWaitPromise;
  })
  .then(() => {
    const clickPromise = page.click("td a.red-link");
    return clickPromise;
  })
  .then(() => {
    const registerWaitPromise = page.waitForSelector("input.submit");
    return registerWaitPromise;
  })
  .then(() => {
    const clickPromise = page.click("input.submit");
    return clickPromise;
  })
  .then(() => {
    const linkWaitPromise = page.waitForSelector(".dark.left a");
    return linkWaitPromise;
  })
  .then(() => {
    const clickEnterPromise = page.click(".dark.left a");
    return clickEnterPromise;
  })
  .catch(function (err) {
    console.log(err);
  });
