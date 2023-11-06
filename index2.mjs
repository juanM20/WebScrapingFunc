import puppeteer from 'puppeteer';

export const handler = async (event) => {

    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
    });

    const page = await browser.newPage();

    // On this new page:
    // - open the "http://quotes.toscrape.com/" website
    // - wait until the dom content is loaded (HTML is ready)
    await page.goto("http://quotes.toscrape.com/", {
        waitUntil: "domcontentloaded",
    });

    // Get page data
    const quotes = await page.evaluate(() => {
        // Fetch the first element with class "quote"
        const quote = document.querySelector(".quote");

        // Fetch the sub-elements from the previously fetched quote element
        // Get the displayed text and return it (`.innerText`)
        const text = quote.querySelector(".text").innerText;
        const author = quote.querySelector(".author").innerText;

        return { text, author };
    });

    // Close the browser
    await browser.close();

    console.log(quotes);
    return quotes;
}


handler();




