import React, { FC } from 'react'
import { Link } from 'gatsby'
import { ProductWithImageFile } from 'types'

const ProductCard: FC<Props> = ({ data, to }) => {
  const { name, price, image } = data

  return (
    <Link
      to={to}
      className='flex flex-col justify-around items-center text-center relative min-h-[400px] rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out p-3'
    >
      <div className='flex items-center min-h-[259px]'>{image}</div>
      <h2 className='text-sm font-bold'>{name}</h2>
      <span className='absolute top-0 right-0 px-3 py-1 text-xs text-white bg-yellow-600 rounded-tr-lg rounded-bl-2xl'>
        ${price}
      </span>
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
