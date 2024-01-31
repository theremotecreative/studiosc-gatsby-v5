import React from "react"
import { graphql } from 'gatsby'
import styled from 'styled-components'
import { GatsbyImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"

const IndexPage = ({ data: { featuredImage, queryContent, mobileImage } }) => {

    return(
        <Layout isHomePage>
            <Seo 
            title={queryContent.seo.title} 
            description={queryContent.seo.metaDesc}
            metaImage={queryContent.seo.opengraphImage.localFile.childImageSharp.fluid}
            />
            <DesktopImage>
                <GatsbyImage image={featuredImage.childImageSharp.gatsbyImageData} alt={'StudiosC - Architecture Studio based in Brooklyn, NY'} />
            </DesktopImage>
            <MobileImage>
                <GatsbyImage image={mobileImage.featuredImage.node.localFile.childImageSharp.gatsbyImageData} alt={mobileImage.featuredImage.node.title} />
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
        featuredImage: file(relativePath: { eq: "home-sep2023.jpg" }) {
            childImageSharp {
              gatsbyImageData (
                width: 4000
                quality: 100
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
                      fluid(maxWidth: 1920) {
                        ...GatsbyImageSharpFluid_withWebp
                      }
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