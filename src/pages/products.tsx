import React from 'react'
import { PageProps, graphql } from 'gatsby'
import ProductCard from 'src/components/ProductCard'
import GatsbyImageOrDefaultImage from 'src/components/GatsbyImageOrDefaultImage'
import { DEFAULT_PRODUCT_ALT, DEFAULT_PRODUCT_NAME } from 'src/constants'

const Products = ({ data }: PageProps<Queries.Query>) => {
  const products = data.allProducts.nodes
  const productCards = products.map(({ id, name, imageFile }) => {
    const productName = name || DEFAULT_PRODUCT_NAME
    // const imageData = getImage(imageFile as unknown as ImageDataLike)
    const imageAlt = name || DEFAULT_PRODUCT_ALT
    const productImage = <GatsbyImageOrDefaultImage id={id} imageFile={imageFile} imageAlt={imageAlt} />
    const productData = {
      name: productName,
      image: productImage,
    }

    return <ProductCard key={id} data={productData} />
  })

  return <div className='grid grid-cols-4 gap-4'>{productCards}</div>
}

export default Products

export const query = graphql`
  {
    allProducts {
      nodes {
        id
        name
        imageFile {
          childImageSharp {
            gatsbyImageData(width: 200, placeholder: BLURRED)
          }
        }
      }
    }
  }
`
