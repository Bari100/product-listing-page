import React, { FC } from 'react'
import GatsbyImageOrDefaultImage from 'src/components/GatsbyImageOrDefaultImage'
import { DEFAULT_PRODUCT_ALT } from 'src/constants'

const Product: FC<Props> = ({ pageContext }) => {
  const { id, name, description, imageFile } = pageContext
  const imageAlt = name || DEFAULT_PRODUCT_ALT
  return (
    <section>
      <h1>{name}</h1>
      <p>{description}</p>
      <GatsbyImageOrDefaultImage id={id} imageFile={imageFile} imageAlt={imageAlt} />
    </section>
  )
}

export default Product

type Props = {
  pageContext: PageContext
}

type PageContext = {
  id: string
  name: string
  description: string
  imageFile: Queries.Maybe<Queries.File>
}
