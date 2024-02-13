import axios from "axios";
import * as cheerio from "cheerio";
import { extractPrice } from "../utils";

export async function scrapeAmazonProduct(url: string) {
  if (!url) return;

  // curl --proxy brd.superproxy.io:22225 --proxy-user brd-customer-hl_42a49499-zone-
  // unblocker:y192ray49vki -k https://lumtest.com/myip.json

  const username = String(process.env.BRIGHT_DATA_USERNAME);
  const password = String(process.env.BRIGHT_DATA_PASSWORD);
  const port = 22225;
  const session_id = (1000000 * Math.random()) | 0;
  const option = {
    auth: {
      username: `${username}-session-${session_id}`,
      password,
    },
    host: "brd.superproxy.io",
    port,
    rejectUnauthorized: false,
  };

  try {
    //fetch product page
    const response = await axios.get(url, option);
    const $ = cheerio.load(response.data);
    const title = $("#productTitle").text().trim();
    const currentPrice = extractPrice(
      $(".priceToPay span.a-price-whole"),
      $(".a.size.base.a-color-price"),
      $(".a-button-selected .a-color-base"),
      $(".a-price.a-text-price.a-size-medium")
    );
    const originalPrice = extractPrice(
      $("#priceblock_ourprice"),
      $("#listPrice"),
      $(".a-price.a-text-price span.a-offscreen")
    );
    const outOfStock =
      $("#availability span").text().trim().toLowerCase() === "in stock";
    const images =
      $("#landingImage").attr("data-a-dynamic-image") ||
      $("#imgBlkFront").attr("data-a-dynamic-image") || '{}';

      const imagesUrl = Object.keys(JSON.parse(images));
      const currency = $('span.a-price-symbol').text().trim().slice(0,1) || '$';
      const discountRate = $('span.savingsPercentage').text().trim().replace(/[-%]/g,'');

      const data = {
        url,
        currency:currency,
        image: imagesUrl[0],
        title,
        currentPrice: Number(currentPrice),
        originalPrice: Number(originalPrice),
        priceHistory: <any>[],
        discountRate: Number(discountRate),
        category:'category',
        reviewsCount:100,
        stars:4.5,
        isOutOfStock: outOfStock,
        lowestPrice: Number(currentPrice) || Number(originalPrice),
        highestPrice: Number(originalPrice) || Number(currentPrice),
        average:Number(currentPrice) || Number(originalPrice),
      }

    return data;
  } catch (err: any) {
    throw new Error(`Failed create/update product : ${err.message}`);
  }
}
