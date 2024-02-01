import React from "react"
import { graphql } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import styled from 'styled-components'
import scrollTo from 'gatsby-plugin-smoothscroll';

import Layout from "../components/layout"
import Seo from "../components/seo"
import StudioSlider from "../components/studio-slider"
import StudioMap from "../components/google-map"

const StudioPage = ({ data: { pageContent, sliderContent, markerImage, teamContent } }) => {

    const teamMap = teamContent.edges
    const markerImageSrc = getImage(markerImage);

    return(
        <Layout>
            <Seo 
            title={pageContent.seo.title} 
            description={pageContent.seo.metaDesc}
            metaImage={pageContent.seo.opengraphImage.localFile.childImageSharp.fluid}
            />
            <AnchorLinks>
                <button onClick={() => scrollTo('#profile_section')}>Profile</button>
                <button onClick={() => scrollTo('#contact_section')}>Contact</button>
                <button onClick={() => scrollTo('#team_section')}>People</button>
            </AnchorLinks>
            <ProfileSection id="profile_section">
                <StudioSlider sliderContent={sliderContent.edges} />
                <div className="content" dangerouslySetInnerHTML={{ __html: pageContent.content }} />
            </ProfileSection>
            <div id="contact_section">
                <StudioMap markerImage={markerImageSrc} />
            </div>
            <TeamSection id="team_section">
                {teamMap.map(teamSrc => (
                    <div className="team-member">
                        <GatsbyImage className={"team-background"} image={teamSrc.node.featuredImage.node.localFile.childImageSharp.gatsbyImageData} alt={teamSrc.node.featuredImage.node.title} />
                        <h3>{teamSrc.node.title}</h3>
                        <div dangerouslySetInnerHTML={{ __html: teamSrc.node.content }} />
                    </div>
                ))}
            </TeamSection>
        </Layout>
    )

}

const AnchorLinks = styled.div`
    position: absolute;
    z-index: 10;
    top: 80px;
    width: 100%;
    padding: 0 50px;
    display: flex;
    justify-content: flex-end;

    button {
        font-family: 'Carlito', sans-serif;
        font-size: 18px;
        color: #474747;
        background: none;
        border: none;
        padding-right: 0;
        padding-left: 30px;

        &:hover {
            cursor: pointer;
            font-weight: bold;
        }

    }
`

const ProfileSection = styled.section`
    max-width: 1220px;
    width: 100%;
    padding: 0 50px;
    margin: 50px auto;
    div.slider-container {
        overflow: hidden;
        .slick-slider {
            width: 100%;
            max-width: 890px;
            overflow: visible;
            .slick-list {
                overflow: visible;
            }
            .slick-slide {
                max-width: 890px;
                width: 890px;
                .gatsby-image-wrapper {
                    img {
                        display: block;
                        object-fit: cover;
                        height: 640px;
                        width: 850px;
                    }
                }
            }
        }
        .slick-prev {
            width: 30px;
            height: 30px;
            left: 30px;
            border-top: 6px solid #fff;
            border-left: 6px solid #fff;
            transform: rotate(-45deg);
            z-index: 2;
            color: transparent;
            box-shadow: -1px -1px 2px rgb(0 0 0 / 20%);
            &:before {
                display: none;
            }
            &.slick-disabled {
                opacity: 0;
            }
        }
        .slick-next {
            width: 30px;
            height: 30px;
            right: -200px;
            border-top: 6px solid #fff;
            border-right: 6px solid #fff;
            transform: rotate(45deg);
            z-index: 2;
            color: transparent;
            box-shadow: 1px -1px 2px rgb(0 0 0 / 20%);
            &:before {
                display: none;
            }
            &.slick-disabled {
                opacity: 0;
            }
        }
    }
    div.content {
        padding: 50px 0px;
        p {
            font-family: Roboto;
            color: #242424;
            font-size: 20px;
        }
    }
    @media(max-width:1200px) {
        max-width: 900px;
        div.slider-container {
            max-width: 800px;
            .slick-slider {
                max-width: 700px;
                .slick-slide {
                    max-width: 700px;
                    .gatsby-image-wrapper {
                        img {
                            height: 440px;
                            width: 660px;
                        }
                    }
                }
            }
            .slick-next {
                right: -80px;
            }
        }
        div.content {
            p {
                br {
                    display: none;
                }
            }
        }
    }
    @media(max-width:900px) {
        max-width: 700px;
        div.slider-container {
            max-width: 600px;
            .slick-slider {
                max-width: 500px;
                .slick-slide {
                    max-width: 500px;
                    .gatsby-image-wrapper {
                        img {
                            height: 320px;
                            width: 460px;
                        }
                    }
                }
            }
        }
    }
    @media(max-width:767px) {
        max-width: 100%;
        padding: 20px;
        div.slider-container {
            .slick-slider {
                max-width: 100%;
                .slick-slide {
                    max-width: 100%;
                    .gatsby-image-wrapper {
                        width: 100%;
                        img {
                            height: 250px;
                            width: 100%;
                        }
                    }
                }
            }
            .slick-next {
                right: 30px;
            }
        }
    }
`

const TeamSection = styled.section`
    max-width: 1220px;
    width: 100%;
    padding: 0 50px;
    padding-top: 100px;
    margin: 50px auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: flex-start;
    .team-member {
        width: calc(33.33% - 20px);
        .gatsby-image-wrapper {
            height: 350px;
            margin-bottom: 10px;
        }
        h3, p {
            font-family: Arial;
            margin: 0;
            font-weight: 400;
            font-size: 16px;
            line-height: 20px;
        }
        p {
            margin-bottom: 20px;
        }
    }
    @media(max-width:1200px) {
        max-width: 900px;
        padding: 30px;
        .team-member {
            width: calc(33.33% - 30px);
        }
    }
    @media(max-width:900px) {
        max-width: 700px;
        .team-member {
            width: calc(50% - 30px);
        }
    }
    @media(max-width:767px) {
        max-width: 100%;
        padding: 20px;
    }
    @media(max-width:580px) {
        max-width: 350px;
        .team-member {
            width: 100%;
        }
    }
`

export default StudioPage

export const pageQuery = graphql`
    query {
        pageContent: wpPage(databaseId: {eq: 227}) {
            content
            featuredImage {
                node {
                  title
                  localFile {
                    childImageSharp {
                      gatsbyImageData (
                          width: 1400
                          placeholder: DOMINANT_COLOR
                          formats: [AUTO, WEBP, AVIF]
                      )
                    }
                  }
                }
              }
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
        sliderContent: allWpStudioSlide(sort: {fields: date, order: ASC}) {
            edges {
              node {
                featuredImage {
                  node {
                    title
                    localFile {
                      childImageSharp {
                        gatsbyImageData (
                            width: 1000
                            placeholder: BLURRED
                            formats: [AUTO, WEBP, AVIF]
                        )
                      }
                    }
                  }
                }
              }
            }
          }
        markerImage: file(relativePath: { eq: "logo-blue-circle.png" }) {
            childImageSharp {
              gatsbyImageData(width: 50, layout: CONSTRAINED)
            }
          }
        teamContent: allWpTeamMember(sort: {fields: date, order: DESC}) {
            edges {
              node {
                title
                content
                featuredImage {
                  node {
                    title
                    localFile {
                      childImageSharp {
                        gatsbyImageData (
                            width: 500
                            placeholder: BLURRED
                            formats: [AUTO, WEBP, AVIF]
                        )
                      }
                    }
                  }
                }
              }
            }
          }
    }
`