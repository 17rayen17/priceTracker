import { Product } from "@/types"
import Link from "next/link"
import Image from "next/image"

interface Props {
  product : Product,
}

const ProductCard = ({product}:Props) => {
  return (
    <Link href={`/products/${product._id}`} className="product-card hover:shadow-lg rounded-xl transition ease-in duration-200">
      <div className="product-card_img-container">
        <Image 
          src={product.image}
          alt={product.title || "product image"}
          width={200}
          height={200}
          className="product-card_img"
        />
      </div>
      <div className="flex flex-col gap-3">
        <h3 className="product-title">{product.title}</h3>
        <div className="flex justify-between">
          <p className="text-black capitalize opacity-50 text-lg">{product.category} </p>
          <p className="text-black font-semibold text-lg">
            <span>{product.currency}</span>
            <span>{product.currentPrice}</span>
          </p>
        </div>
      </div>
    </Link>
  )
}

export default ProductCard