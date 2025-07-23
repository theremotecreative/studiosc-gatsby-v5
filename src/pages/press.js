import React from "react"
import { graphql } from 'gatsby'
import { getSrc } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"

import PressGrid from "../components/press-grid"

const PressPage = ({ data: { queryContent } }) => {
  const metaImage = queryContent.seo.opengraphImage?.localFile?.childImageSharp?.gatsbyImageData
    ? getSrc(queryContent.seo.opengraphImage.localFile.childImageSharp.gatsbyImageData)
    : null

  return (
    <Layout>
      <Seo 
        title={queryContent.seo.title} 
        description={queryContent.seo.metaDesc}
        metaImage={metaImage}
      />
      <PressGrid />
    </Layout>
  )
}

export default PressPage

export const pageQuery = graphql`
  query {
    queryContent: wpPage(databaseId: {eq: 230}) {
      seo {
        title
        metaDesc
        opengraphImage {
          localFile {
            childImageSharp {
              gatsbyImageData(
                width: 1200
                quality: 90
                placeholder: BLURRED
                formats: [AUTO, WEBP, AVIF]
              )
            }
          }
        }
      }
    }
  }
`
