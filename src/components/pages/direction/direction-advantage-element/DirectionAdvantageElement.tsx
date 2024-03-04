export interface IDirectionAdvantageElement {
  title: string
  content: string
}

function DirectionAdvantageElement({
  title,
  content
}: IDirectionAdvantageElement) {
  return (
    <div className={'p-5 bg-[#D4E3EB] '}>
      <h3 className={'mb-5 text-xl font-medium leading-[32px]'}>{title}</h3>
      <p className={'text-base'}>{content}</p>
    </div>
  )
}

export default DirectionAdvantageElement
