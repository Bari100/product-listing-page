export type ImageLink = { image: string }

export type ImageFile = { imageFile: File }

export type Product = {
  id: number
  name: string
  description: string
  price: number
}

export type ProductWithImageLink = Product & ImageLink

export type ProductWithImageFile = Product & ImageFile
