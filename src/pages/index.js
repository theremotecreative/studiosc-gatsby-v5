import React from "react"
import { graphql } from 'gatsby'
import styled from 'styled-components'
import { GatsbyImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"

const IndexPage = ({ data: { queryContent, mobileImage } }) => {

    return(
        <Layout isHomePage>
            <Seo 
            title={queryContent.seo.title} 
            description={queryContent.seo.metaDesc}
            metaImage={queryContent.seo.opengraphImage.localFile.childImageSharp.fluid}
            />
            <DesktopImage>
                <GatsbyImage image={queryContent.featuredImage.node.localFile.childImageSharp.gatsbyImageData} alt={queryContent.featuredImage.node.title} />
            </DesktopImage>
            <MobileImage>
                <GatsbyImage image={mobileImage.featuredImage.node.localFile.childImageSharp.gatsbyImageData} alt={mobileImage.featuredImage.node.title} />
            </MobileImage>
        </Layout>
    )

}

const DesktopImage = styled.div`
    height: calc(100vh - 96px);

    .gatsby-image-wrapper {
        height: calc(100vh - 96px);
    }

    img {
        height: calc(100vh - 96px);
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
        queryContent: wpPage(databaseId: {eq: 224}) {
            seo {
                title
                metaDesc
                opengraphImage {
                  localFile {
                    childImageSharp {
                      fluid(maxWidth: 1920) {
                        ...GatsbyImageSharpFluid_withWebp
                      }
                    }
                  }
                }
            }
            featuredImage {
                node {
                  title
                  localFile {
                    childImageSharp {
                      gatsbyImageData(
                        quality: 100
                        placeholder: BLURRED
                        layout: FULL_WIDTH
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
                            gatsbyImageData (
                                width: 800
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