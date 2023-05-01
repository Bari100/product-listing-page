import React, { FC } from 'react'
import { HeadFC, Link } from 'gatsby'
import { generateAltFromName } from 'utils/generateAltFromName'
import { ProductWithImageFile } from 'types'
import Image from 'components/Image'

const Product: FC<Props> = ({ pageContext }) => {
  const { name, description, price, imageFile } = pageContext
  const imageData = {
    imageFile,
    imageAlt: generateAltFromName(name),
  }

  return (
    <>
      <section className='lg:flex lg:justify-center lg:gap-10 h-screen p-10'>
        <div className='flex justify-center items-center basis-1/2 text-center max-lg:mb-10'>
          <Image data={imageData} className='max-h-[450px]' />
        </div>
        <div className='flex flex-col justify-center gap-8 basis-[40%] max-lg:mb-10'>
          <h1 className='text-4xl font-bold'>{name}</h1>
          <p>{description}</p>
          <span className='text-2xl font-bold text-right text-yellow-600'>${price}</span>
        </div>
        <Link to='/' className='block font-semibold lg:absolute lg:bottom-5 max-lg:pb-10 text-yellow-600'>
          Return to previous page
        </Link>
      </section>
    </>
  )
}

export default Product

type Props = {
  pageContext: ProductWithImageFile
}

export const Head: HeadFC = () => <title>Product Page</title>
