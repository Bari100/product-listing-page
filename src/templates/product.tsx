import React, { FC } from 'react'
import { HeadFC } from 'gatsby'
import { generateAltFromName } from 'utils/generateAltFromName'
import { ProductWithImageFile } from 'types'
import GatsbyImageOrDefaultImage from 'components/GatsbyImageOrDefaultImage'

const Product: FC<Props> = ({ pageContext }) => {
  const { name, description, imageFile } = pageContext
  const imageAlt = generateAltFromName(name)

  return (
    <section>
      <h1>{name}</h1>
      <p>{description}</p>
      <GatsbyImageOrDefaultImage imageFile={imageFile} imageAlt={imageAlt} />
    </section>
  )
}

export default Product

type Props = {
  pageContext: ProductWithImageFile
}

export const Head: HeadFC = () => <title>Product Page</title>
