"use server"

import { revalidatePath } from "next/cache";
import Product from "../models/product.model";
import { connectToDB } from "../mongoose";
import { scrapeAmazonProduct } from "../scrape";
import { getAveragePrice, getHighestPrice, getLowestPrice } from "../utils";
import { User } from "@/types";
import { generateEmailContent, sendEmail } from "../nodeMailer";

export async function scrapeAndStoreProduct(productUrl: string) {
  if(!productUrl) return;

  try {
    connectToDB();

    const scrapedProduct = await scrapeAmazonProduct(productUrl);

    if(!scrapedProduct) return;

    let product = scrapedProduct;

    const existingProduct = await Product.findOne({ url: scrapedProduct.url });

    if(existingProduct) {
      const updatedPriceHistory: any = [
        ...existingProduct.priceHistory,
        { price: scrapedProduct.currentPrice }
      ]

      product = {
        ...scrapedProduct,
        priceHistory: updatedPriceHistory,
        lowestPrice: getLowestPrice(updatedPriceHistory),
        highestPrice: getHighestPrice(updatedPriceHistory),
        average: getAveragePrice(updatedPriceHistory),
      }
    }

    const newProduct = await Product.findOneAndUpdate(
      { url: scrapedProduct.url },
      product,
      { upsert: true, new: true }
    );

    revalidatePath(`/products/${newProduct._id}`);
  } catch (error: any) {
    console.log(`Failed to create/update product: ${error.message}`)
  }
}

export const getProductById = async (productId: string) =>{
  try{
    connectToDB();
    const product = await Product.findOne({_id: productId});
    if(!product) return null;

    return product;
  }catch(error : any){
    console.log(error);
  }
}

export const getAllProducts = async ()=>{
  try{
    connectToDB();
    const product = await Product.find();
    return product;
  }catch(error : any){
    console.error(error);
  }
}

export const getSimilarProduct = async (productId : string)=>{
  try{
    connectToDB();
    const currentProduct = await Product.findById(productId);
    if(!currentProduct) return null;

    const similarProduct = await Product.find({_id: {$ne : productId}}).limit(3);
    
    return similarProduct;
  }catch(error : any){
    console.error(error);
  }
}

export const addUserEmailToProduct = async (productId: string, userEmail:string) => {
  try {
    const product = await Product.findById(productId)
    if(!product) return;

    const userExist = product.users.some((user: User) => user.email === userEmail) 
    if(!userExist){
      product.users.push({email: userEmail})
      await product.save();
      const emailContent = await generateEmailContent(product , "CHANGE_OF_STOCK");
      await sendEmail(emailContent, [userEmail])
    }

  }catch(error : any){
    console.log(error);
  }
}