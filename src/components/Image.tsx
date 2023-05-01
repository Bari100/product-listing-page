import React, { FC } from 'react'
import { GatsbyImage, IGatsbyImageData, ImageDataLike, getImage } from 'gatsby-plugin-image'

const Image: FC<Props> = ({ data, className }) => {
  const { imageFile, imageAlt } = data
  const imageData = getImage(imageFile as unknown as ImageDataLike) as IGatsbyImageData
  return <GatsbyImage image={imageData} alt={imageAlt} objectFit='contain' className={className} />
}

export default Image

type Props = {
  data: Data
  className?: string
}

type Data = {
  imageFile: File
  imageAlt: string
}
