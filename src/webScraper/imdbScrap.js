
const puppeteer = require('puppeteer');


(async () => {
    let movieUrl = 'https://www.imdb.com/title/tt0075148/?ref_=nv_sr_srsg_3';

    let browser = await puppeteer.launch();
    let page = await browser.newPage();

    await page.goto(movieUrl, {waitUntil: 'networkidle2'});

    let data = await page.evaluate(() => {

        let title = document.querySelector('div[class="title_wrapper"] > h1').innerText;
        let rating = document.querySelector('span[itemprop="ratingValue"]').innerText;
        let ratingCount = document.querySelector('span[itemprop="ratingCount"]').innerText;

        return {
            title,
            rating,
            ratingCount
        }

    });

    console.log(data);

    debugger;

    await browser.close();

})();

