import { GatsbyNode } from 'gatsby'
import fetch from 'node-fetch'
import { createRemoteFileNode } from 'gatsby-source-filesystem'
import path from 'path'

export type Product = {
  // should be from Query!!!!
  id: string
  name: string
  description: string
  image: string
}

export type ProductFromQuery = Partial<Queries.Query['products']>

const DEFAULT_PRODUCT_NAME = 'product name'
const DEFAULT_PRODUCT_DESCRIPTION = 'product description'

export const sourceNodes: GatsbyNode['sourceNodes'] = async ({ actions: { createNode }, createContentDigest }) => {
  const response = await fetch('https://powerful-jodhpurs-bat.cyclic.app/data')

  const products = await response.json()

  products.forEach((product: Product) => {
    createNode({
      ...product,
      id: product.id,
      internal: {
        type: 'Products',
        contentDigest: createContentDigest(product),
      },
    })
  })
}

const productPage = path.resolve(`./src/templates/product.tsx`)

export const createPages: GatsbyNode['createPages'] = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const result: { errors?: any; data?: Queries.Query | undefined } = await graphql(`
    {
      allProducts {
        nodes {
          id
          name
          description
          imageFile {
            childImageSharp {
              gatsbyImageData(width: 700, placeholder: BLURRED)
            }
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild(`There was an error loading your blog posts`, result.errors)
    return
  }

  if (typeof result.data === 'undefined') {
    reporter.panicOnBuild(`result.data is undefined`, result.errors)
    return
  }

  const products = result.data.allProducts.nodes

  if (products.length > 0) {
    products.forEach((product: ProductFromQuery) => {
      createPage({
        path: `product/${product!.id}`,
        component: productPage,
        context: {
          id: product!.id,
          name: product!.name || DEFAULT_PRODUCT_NAME,
          description: product!.description || DEFAULT_PRODUCT_DESCRIPTION,
          imageFile: product!.imageFile,
        },
      })
    })
  }
}

export const createSchemaCustomization: GatsbyNode['createSchemaCustomization'] = ({ actions }) => {
  const { createTypes } = actions

  createTypes(`
    type Products implements Node @derivedTypes @dontInfer {
      id: String
      name: String
      description: String
      imageFile: File @link(from: "fields.localFile")
    }
  `)
}

export const onCreateNode: GatsbyNode['onCreateNode'] = async ({
  node,
  actions: { createNode, createNodeField },
  createNodeId,
  getCache,
}) => {
  if (node.internal.type === 'Products' && node.image !== null) {
    const fileNode = await createRemoteFileNode({
      url: (node.image as string) || 'https://picsum.photos/id/238/536/354',
      parentNodeId: node.id,
      createNode,
      createNodeId,
      getCache,
    })

    if (fileNode) {
      createNodeField({ node, name: 'localFile', value: fileNode.id })
    }
  }
}
