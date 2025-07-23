import React from "react"
import { graphql } from 'gatsby'
import styled from 'styled-components'
import { GatsbyImage, getSrc } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"

const IndexPage = ({ data: { featuredImage, queryContent, mobileImage } }) => {
  // Fallback to desktop image if mobile image is missing
  const mobileImageData = mobileImage?.featuredImage?.node?.localFile?.childImageSharp?.gatsbyImageData
    || featuredImage.childImageSharp.gatsbyImageData;

  const mobileImageAlt = mobileImage?.featuredImage?.node?.title || "StudiosC - Architecture Studio based in Brooklyn, NY";

  // Extract og:image URL for SEO from gatsbyImageData
  const metaImage = getSrc(queryContent.seo.opengraphImage.localFile.childImageSharp.gatsbyImageData)

  return (
    <Layout isHomePage>
      <Seo 
        title={queryContent.seo.title} 
        description={queryContent.seo.metaDesc}
        metaImage={metaImage}
      />
      <DesktopImage>
        <GatsbyImage 
          image={featuredImage.childImageSharp.gatsbyImageData} 
          alt="StudiosC - Architecture Studio based in Brooklyn, NY"
        />
      </DesktopImage>
      <MobileImage>
        <GatsbyImage 
          image={mobileImageData}
          alt={mobileImageAlt}
          style={{ height: "100vh", width: "100%" }}
          imgStyle={{ objectFit: "cover", width: "100%", height: "100%" }}
          sizes="100vw"
        />
      </MobileImage>
    </Layout>
  )
}


const DesktopImage = styled.div`
    height: 100vh;
    width: 100%;

    .gatsby-image-wrapper {
        height: 100vh;
        width: 100%;
    }

    img {
        height: 100vh;
        width: 100%;
        object-fit: cover;
        object-position: center;
    }

    @media(max-width: 767px) {
        display: none;
    }
`

const MobileImage = styled.div`
    display: none;
    height: 100vh;

    .gatsby-image-wrapper {
        height: 100vh;
        width: 100%;
    }

    img {
        height: 100vh;
        object-fit: cover;
        object-position: center;
    }

    @media(max-width: 767px) {
        display: block;
    }
`

export default IndexPage

export const pageQuery = graphql`
    query {
        featuredImage: file(relativePath: { eq: "homepage-2024.jpg" }) {
            childImageSharp {
              gatsbyImageData (
                width: 2000
                quality: 100
                placeholder: BLURRED
                formats: [AUTO, WEBP, AVIF]
              )
            }
        }
        queryContent: wpPage(databaseId: {eq: 224}) {
            seo {
                title
                metaDesc
                opengraphImage {
                  localFile {
                    childImageSharp {
                      gatsbyImageData(
                        width: 1200
                        placeholder: BLURRED
                        formats: [AUTO, WEBP, AVIF]
                      )
                    }
                  }
                }
            }
        }
        mobileImage: wpHomeSection(databaseId: {eq: 1318}) {
            featuredImage {
                node {
                    title
                    localFile {
                        childImageSharp {
                            gatsbyImageData(
                              width: 1600
                              quality: 100
                              placeholder: BLURRED
                              layout: FULL_WIDTH
                              breakpoints: [375, 667, 800, 1200, 1600]
                              formats: [AUTO, WEBP, AVIF]
                            )
                        }
                    }
                }
            }
        }
    }
`