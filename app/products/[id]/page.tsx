import Modal from "@/components/Modal";
import PriceInfoCard from "@/components/PriceInfoCard";
import ProductCard from "@/components/ProductCard";
import { getProductById, getSimilarProduct } from "@/lib/actions";
import { formatNumber } from "@/lib/utils";
import { Product } from "@/types";
import { redirect } from "next/dist/server/api-utils";
import Image from "next/image";
import Link from "next/link";

type Props = {
  params: { id: string };
};

const page = async ({ params: { id } }: Props) => {
  const product: Product = await getProductById(id);
  const similarProducts = await getSimilarProduct(id);
  // if(!product) redirect('/');
  return (
    <div className="product-container">
      <div className="flex flex-col gap-28 xl:flex-row">
        <div className="p-16 border border-[#CDDBFF] rounded-[17px] h-fit">
          <Image
            src={product.image}
            alt={product.title || "product image"}
            width={400}
            height={200}
            className="mx-auto object-contain"
          />
        </div>
        <div className="flex-1 flex flex-col">
          <div className="flex justify-between items-start flex-wrap gap-5 pb-6">
            <div className="flex flex-col gap-3">
              <p className="text-[28px] text-secondary font-semibold">
                {product.title}
              </p>
              <Link
                href={product.url}
                target="_blank"
                className="text-black opacity-50 text-base">
                Visit website
              </Link>
            </div>
            <div className="flex items-center gap-3">
              <div className="product-hearts">
                <Image
                  src={"/assets/icons/red-heart.svg"}
                  alt={"red-heart"}
                  width={20}
                  height={20}
                />
                <p className="text-[#D46F77] text-base font-semibold ">
                  {product.reviewsCount}
                </p>
              </div>
              <div className="bg-white-200 p-2 rounded-10">
                <Image
                  src={"/assets/icons/bookmark.svg"}
                  alt={"bookmark"}
                  width={20}
                  height={20}
                />
              </div>
              <div className="bg-white-200 p-2 rounded-10">
                <Image
                  src={"/assets/icons/share.svg"}
                  alt={"share"}
                  width={20}
                  height={20}
                />
              </div>
            </div>
          </div>
          <div className="product-info">
            <div className="flex flex-col gap-2">
              <p className="text-secondary text-[34px] font-bold">
                {product.currency}
                {formatNumber(product.currentPrice)}
              </p>
              <p className="text-black text-[21px] opacity-50 line-through ">
                {product.currency}
                {formatNumber(product.originalPrice)}
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex gap-3">
                <div className="product-stars">
                  <Image
                    src={"/assets/icons/star.svg"}
                    alt={"star"}
                    width={16}
                    height={16}
                  />
                  <p className="text-primary-orange font-semibold text-sm">
                    {product.stars || "25"}
                  </p>
                </div>
                <div className="product-reviews">
                  <Image
                    src={"/assets/icons/comment.svg"}
                    alt={"comment"}
                    width={16}
                    height={16}
                  />
                  <p className="text-secondary font-semibold text-sm">
                    {product.reviewsCount} Reviews
                  </p>
                </div>
              </div>
              <p className="text-black opacity-50 text-sm">
                <span className="font-semibold text-primary-green">93%</span>of
                buyers have recommended this.
              </p>
            </div>
          </div>
          {/* price cards */}
          <div className="my-7 flex flex-col gap-5">
            <div className="flex flex-wrap gap-5">
              <PriceInfoCard
                title="current price"
                iconSrc="/assets/icons/price-tag.svg"
                value={`${product.currency} ${formatNumber(
                  product.currentPrice
                )}`}
                borderColor="#b6dbff"
              />
              <PriceInfoCard
                title="Average Price"
                iconSrc="/assets/icons/chart.svg"
                value={`${product.currency} ${formatNumber(
                  product.currentPrice
                )}`}
                borderColor="#b59bfa"
              />
              <PriceInfoCard
                title="Highest Price"
                iconSrc="/assets/icons/arrow-up.svg"
                value={`${product.currency} ${formatNumber(
                  product.highestPrice
                )}`}
                borderColor="#f8a4a4"
              />
              <PriceInfoCard
                title="lowest Price"
                iconSrc="/assets/icons/arrow-down.svg"
                value={`${product.currency} ${formatNumber(
                  product.lowestPrice
                )}`}
                borderColor="#beffc5"
              />
            </div>
          </div>
          {/* MODAL */}
          <Modal productId={id} />
        </div>
      </div>
      {similarProducts && similarProducts?.length > 0 && (
        <div className="flex flex-col gap-2 w-full py-17">
          <p className="section-text capitalize select-none">
            similar Products
          </p>
          <div className="flex gap-10 flex-wrap mt-7 w-full">
            {similarProducts?.map((product: any) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default page;
