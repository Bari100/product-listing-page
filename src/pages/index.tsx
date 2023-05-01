import React from 'react'
import { HeadFC, PageProps, graphql } from 'gatsby'
import { generateAltFromName } from 'utils/generateAltFromName'
import { ProductWithImageFile } from 'types'
import Image from 'components/Image'
import ProductCard from 'components/ProductCard'

const IndexPage = ({ data }: PageProps<Queries.Query>) => {
  const products = data.allProducts.nodes as unknown as ProductWithImageFile[]
  const productCards = products.map(({ id, name, price, imageFile }) => {
    const imageData = {
      imageFile,
      imageAlt: generateAltFromName(name),
    }
    const productImage = <Image data={imageData} className='max-h-[200px]' />
    const productData = {
      name,
      price,
      image: productImage,
    }
    const productLink = `/product/${id}`
    const productAriaLabel = `View product details for ${name}`

    return <ProductCard key={id} data={productData} to={productLink} aria-label={productAriaLabel} />
  })

  return (
    <section className='flex justify-center py-10 sm:px-10'>
      {/* use these styles from section two times*/}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-screen-xl px-4'>
        {productCards}
      </div>
    </section>
  )
}

export default IndexPage

export const query = graphql`
  {
    allProducts {
      nodes {
        id
        name
        description
        price
        imageFile {
          childImageSharp {
            gatsbyImageData(width: 150, placeholder: BLURRED)
          }
        }
      }
    }
  }
`

export const Head: HeadFC = () => <title>Products Page</title>
