import { GatsbyNode } from 'gatsby'
import { createRemoteFileNode } from 'gatsby-source-filesystem'
import fetch from 'node-fetch'
import path from 'path'
import { ProductWithImageFile, ProductWithImageLink } from 'src/types'

const productPage = path.resolve(`./src/templates/product.tsx`)

const NO_DESCRIPTION_AVAILABLE = 'no description available'

export const sourceNodes: GatsbyNode['sourceNodes'] = async ({ actions: { createNode }, createContentDigest }) => {
  const response = await fetch('https://powerful-jodhpurs-bat.cyclic.app/data')

  const products = await response.json()

  products.forEach((product: ProductWithImageLink) => {
    if (!product || !product.id || !product.name || product.name.length === 0 || !product.price) return

    createNode({
      ...product,
      id: product.id.toString(),
      internal: {
        type: 'Products',
        contentDigest: createContentDigest(product),
      },
    })
  })
}

export const onCreateNode: GatsbyNode['onCreateNode'] = async ({
  node,
  actions: { createNode, createNodeField },
  createNodeId,
  getCache,
}) => {
  if (node.internal.type !== 'Products' || node.image === null) return

  const fileNode = await createRemoteFileNode({
    url: (node.image as string) || 'src/images/icon.png',
    parentNodeId: node.id,
    createNode,
    createNodeId,
    getCache,
  })

  if (fileNode) {
    createNodeField({ node, name: 'imageFile', value: fileNode.id })
  }
}

export const createSchemaCustomization: GatsbyNode['createSchemaCustomization'] = ({ actions }) => {
  const { createTypes } = actions

  createTypes(`
    type Products implements Node @derivedTypes @dontInfer {
      id: Int
      name: String
      description: String
      price: Float 
      imageFile: File @link(from: "fields.imageFile")
    }
  `)
}

export const createPages: GatsbyNode['createPages'] = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const result: { errors?: any; data?: Queries.Query } = await graphql(`
    {
      allProducts {
        nodes {
          id
          name
          description
          price
          imageFile {
            childImageSharp {
              gatsbyImageData(width: 500, placeholder: BLURRED)
            }
          }
        }
      }
    }
  `)

  if (result.errors || result.data === null || typeof result.data === 'undefined') {
    reporter.panicOnBuild(`There was an error loading the blog posts`, result.errors)
    return
  }

  const products = result.data.allProducts.nodes as unknown as ProductWithImageFile[]

  if (products.length > 0) {
    products.forEach((product: ProductWithImageFile) => {
      const productDescription =
        product.description && product.description.length > 0 ? product.description : NO_DESCRIPTION_AVAILABLE

      createPage({
        path: `product/${product!.id}`,
        component: productPage,
        context: {
          id: product.id,
          name: product.name,
          description: productDescription,
          price: product.price,
          imageFile: product.imageFile,
        },
      })
    })
  }
}
