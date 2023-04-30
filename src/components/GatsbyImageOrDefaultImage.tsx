import React, { FC } from 'react'
import { GatsbyImage, IGatsbyImageData, ImageDataLike, getImage } from 'gatsby-plugin-image'

const GatsbyImageOrDefaultImage: FC<Props> = ({ imageFile, imageAlt }) => {
  const imageData = getImage(imageFile as unknown as ImageDataLike) as IGatsbyImageData
  return <GatsbyImage image={imageData} alt={imageAlt} />
}

export default GatsbyImageOrDefaultImage

type Props = {
  imageFile: File
  imageAlt: string
}
