import React, { FC } from 'react'
import { GatsbyImage, ImageDataLike, getImage } from 'gatsby-plugin-image'
import { DEFAULT_PRODUCT_ALT } from 'src/constants'

const GatsbyImageOrDefaultImage: FC<Props> = ({ id, imageFile, imageAlt }) => {
  const imageData = getImage(imageFile as unknown as ImageDataLike)
  return imageData ? (
    <GatsbyImage
      key={id}
      image={imageData}
      alt={imageAlt}
      // width={200}
      // height={200}
    />
  ) : (
    <img src='#' alt={DEFAULT_PRODUCT_ALT} />
  )
}

export default GatsbyImageOrDefaultImage

type Props = {
  id: string
  imageFile: Queries.Maybe<Queries.File>
  imageAlt: string
}
