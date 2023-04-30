import React, { FC } from 'react'

const ProductCard: FC<Props> = ({ data }) => {
  const { name, image } = data
  return (
    <div>
      <h2>{name}</h2>
      {image}
    </div>
  )
}

export default ProductCard

type Props = {
  data: ProductData
}

type ProductData = {
  name: string
  image: JSX.Element
}
