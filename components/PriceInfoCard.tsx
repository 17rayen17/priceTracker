import Image from "next/image"

interface Props {
  title:string,
  iconSrc:string,
  value:string,
  borderColor:string
}


const PriceInfoCard = ({title, iconSrc, value, borderColor}: Props) => {
  return (
    <div className={`price-info_card border-2 border-transparent border-l-[${borderColor}] cursor-pointer hover:shadow-md ease-in-out duration-200`}>
      <p className="text-black opacity-50 text-base">{title}</p>
      <div className="flex gap-1">
        <Image src={iconSrc} alt={title} width={24} height={24} />
        <p className="font-bold text-2xl text-secondary">{value}</p>
      </div>
    </div>
  )
}

export default PriceInfoCard