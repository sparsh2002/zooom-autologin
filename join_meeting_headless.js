const puppeteer = require("puppeteer"); // ^21.6.0
const {uploadImage} = require('./gcs_upload')

let browser;
async function joinZoomMeeting(meetId , meetPassCode , joineeName , sessionId) {
    browser = await puppeteer.launch({ headless: true });
    const [page] = await browser.pages();
    await page.screenshot({ path: "screenshots/1.png" });
    await uploadImage('screenshots/1.png' , `${sessionId}/1.png`)
    await page.goto("https://app.zoom.us/wc/join");
    await page.screenshot({ path: "screenshots/2.png" });
    await uploadImage('screenshots/2.png' , `${sessionId}/2.png`)
    const meetingInput = await page.waitForSelector('input[type="text"]');
    await page.screenshot({ path: "screenshots/3.png" });
    await uploadImage('screenshots/3.png' , `${sessionId}/3.png`)
    await meetingInput.type(meetId);
    const joinBtn = await page.waitForSelector(".btn-join");
    await page.screenshot({ path: "screenshots/4.png" });
    await uploadImage('screenshots/4.png' , `${sessionId}/4.png`)
    await joinBtn.click();
    await page.screenshot({ path: "screenshots/5.png" });
    await uploadImage('screenshots/5.png' , `${sessionId}/5.png`)
    await page.waitForFunction(`
          document.querySelector("#webclient")
            .contentDocument.querySelector("#input-for-pwd")
        `);
    await page.screenshot({ path: "screenshots/6.png" });
    await uploadImage('screenshots/6.png' , `${sessionId}/6.png`)
    const f = await page.waitForSelector("#webclient");
    await page.screenshot({ path: "screenshots/7.png" });
    await uploadImage('screenshots/7.png' , `${sessionId}/7.png`)
    const frame = await f.contentFrame();
    await page.screenshot({ path: "screenshots/8.png" });
    await uploadImage('screenshots/8.png' , `${sessionId}/8.png`)
    await frame.type("#input-for-pwd", meetPassCode);
    await page.screenshot({ path: "screenshots/9.png" });
    await uploadImage('screenshots/9.png' , `${sessionId}/9.png`)
    await frame.type("#input-for-name", joineeName);
    await page.screenshot({ path: "screenshots/10.png" });
    await uploadImage('screenshots/10.png' , `${sessionId}/10.png`)
    await frame.$$eval("button", els =>
        els.find(el => el.textContent.trim() === "Join").click()
    );
    await page.screenshot({ path: "screenshots/11.png" });
    await uploadImage('screenshots/11.png' , `${sessionId}/11.png`)
    await frame.waitForSelector(".join-dialog");
    await page.screenshot({ path: "screenshots/12.png" });
    await uploadImage('screenshots/12.png' , `${sessionId}/12.png`)


}

module.exports = joinZoomMeeting