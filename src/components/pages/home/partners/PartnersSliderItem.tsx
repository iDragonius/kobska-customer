import Image from 'next/image'

export interface IPartnersSliderItem {
  data: {
    url: string
    alternativeText: string
    width: number
    height: number
  }
}

function PartnersSliderItem({ data }: IPartnersSliderItem) {
  return (
    <>
      <Image
        src={process.env.SERVER_URL + data.url}
        alt={data.alternativeText}
        // className={'min-w-[377px]'}
        width={data.width}
        height={data.height}
      />
    </>
  )
}

export default PartnersSliderItem
