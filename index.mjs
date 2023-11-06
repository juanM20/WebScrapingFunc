import * as cheerio from 'cheerio';
import request from "request-promise";

export const handler = async (event) => {
    const $ = await request({
        uri: 'http://quotes.toscrape.com/',
        transform: body => cheerio.load(body)
    });


    const quotes_json = [];
    const quotes = $('.quote span.text').map((index, quote) => {
        const q = $(quote).html();
        quotes_json.push({ index, q });
    });

    console.log(quotes_json);

    return quotes_json;
}

handler();