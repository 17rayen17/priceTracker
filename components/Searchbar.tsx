"use client"

import { scrapeAndStoreProduct } from "@/lib/actions";
import { FormEvent, useState } from "react"

const isValidAmazonProductLink = (url : string) =>{
  try{
    const pardesUtl = new URL (url);
    const hostname = pardesUtl.hostname
    if(hostname.includes('amazon.com') || hostname.includes('amazon.') || hostname.endsWith('amazon')){
      return true;
    }
  }catch(err){
    return false;
  }
  return false;
}

const Searchbar = () => {
  const [searchPrompt, setSearchPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handelSubmit = async (event : FormEvent<HTMLFormElement>) =>{
    event.preventDefault();

    const isValidLink = isValidAmazonProductLink(searchPrompt);

    if(!isValidLink){alert("Please enter an Amazon Link")}

    try{
      setIsLoading(true);
      const product = await scrapeAndStoreProduct(searchPrompt);
    }catch(err){
      setIsLoading(false);
    }finally{
      setIsLoading(false);
    }
  }
  return (
    <form className='flex flex-wrap gap-4 mt-12' onSubmit={handelSubmit}>
      <input type="text" placeholder="Enter Product Link" 
      className="searchbar-input" 
      value={searchPrompt}
      onChange={(e)=>setSearchPrompt(e.target.value)}/>
      <button type="submit" className="searchbar-btn" disabled={searchPrompt == ''}>
        {isLoading ? "Searching..." : "Search"}
      </button>
    </form>
  )
}

export default Searchbar