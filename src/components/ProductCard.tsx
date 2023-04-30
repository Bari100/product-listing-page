import React, { FC } from 'react'
import { Link } from 'gatsby'
import { ProductWithImageFile } from 'types'

const ProductCard: FC<Props> = ({ data, to }) => {
  const { name, price, image } = data

  return (
    <Link
      to={to}
      className='flex flex-col justify-center items-center text-center rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out'>
      <div className='flex items-center min-h-[346px]'>{image}</div>
      <h2>{name}</h2>
      <p>{price}</p>
    </Link>
  )
}

export default ProductCard

type Props = {
  data: ProductData
  to: string
}

type ProductData = Partial<ProductWithImageFile> & {
  image: JSX.Element
}
