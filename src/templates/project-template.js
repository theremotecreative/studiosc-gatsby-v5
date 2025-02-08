import React from "react"
import { graphql } from "gatsby"
import styled from "styled-components"
import { GatsbyImage } from "gatsby-plugin-image"
import Slider from "react-slick"
import scrollTo from "gatsby-plugin-smoothscroll"

import { GrTextAlignFull } from "react-icons/gr"

import Layout from "../components/layout"
import Seo from "../components/seo"

const ProjectTemplate = ({ data: { post } }) => {
  const slideMap = post.propertyInfo.propertyGallery

  const settings = {
    arrows: true,
    dots: false,
    infinite: true,
    autoplay: false,
    speed: 1000,
    fade: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  }

  return (
    <Layout>
      <Seo
        title={post.seo.title}
        description={post.seo.metaDesc}
        metaImage={post.seo.opengraphImage.localFile.childImageSharp.fluid}
      />
      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <ProjectMain>
          <section class="slider-container">
            <Slider {...settings}>
              {slideMap && Array.isArray(slideMap) ? (
                slideMap.map(imageSrc => (
                  <div class="project-slide">
                    {imageSrc?.localFile?.childImageSharp?.gatsbyImageData ? (
                      <GatsbyImage
                        className={"slide-background"}
                        image={
                          imageSrc.localFile.childImageSharp.gatsbyImageData
                        }
                        alt={imageSrc.title}
                      />
                    ) : (
                      <p>No Image Available</p> // Prevents crash if no image exists
                    )}
                  </div>
                ))
              ) : (
                <p>No slides available</p> // Prevents crash if slideMap is null
              )}
            </Slider>
          </section>

          <header class="project-title">
            <div class="col-one header-col"></div>
            <div class="col-two header-col">
              <h1 class="proj-title">{post.title}</h1>
            </div>
            <div class="col-three header-col">
              <button onClick={() => scrollTo("#proj_cont")}>
                <GrTextAlignFull size={24} />
              </button>
            </div>
          </header>

          <section id="proj_cont" class="project-content">
            <div class="row">
              <ul class="description-titles">
                <li>Client</li>
                <li>Location</li>
                <li>size</li>
                <li>date completed</li>
              </ul>
              <ul class="description-info">
                <li>{post.propertyInfo.propertyClient}</li>
                <li>{post.propertyInfo.propertyLocation}</li>
                <li>{post.propertyInfo.propertySize}</li>
                <li>{post.propertyInfo.propertyDate}</li>
              </ul>
              <div
                class="description-main"
                dangerouslySetInnerHTML={{
                  __html: post.propertyInfo.propertyDescription,
                }}
              />
            </div>
          </section>
        </ProjectMain>
      </article>
    </Layout>
  )
}

const ProjectMain = styled.div`
  max-width: 1230px;
  width: 100%;
  padding: 0 50px;
  margin: 50px auto;
  margin-top: 0;
  .slider-container {
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
    }
    .slick-next {
      width: 30px;
      height: 30px;
      right: 30px;
      border-top: 6px solid #fff;
      border-right: 6px solid #fff;
      transform: rotate(45deg);
      z-index: 2;
      color: transparent;
      box-shadow: 1px -1px 2px rgb(0 0 0 / 20%);
      &:before {
        display: none;
      }
    }
    .gatsby-image-wrapper {
      width: 100%;
    }
  }
  .project-title {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .col-one {
      width: 30%;
    }
    .col-two {
      width: 40%;
      text-align: center;
    }
    .col-three {
      width: 30%;
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }
    h1 {
      font-family: "Roboto", sans-serif;
      font-weight: 400;
      text-transform: uppercase;
      font-size: 26px;
      padding: 30px;
      max-width: 100%;
      margin: 0;
      text-align: center;
    }
    button {
      background-color: transparent;
      border: none;
      &:hover {
        cursor: pointer;
      }
    }
  }
  .project-content {
    width: 100%;
    margin: 50px 0 150px;
    .row {
      display: flex;
      justify-content: center;
      align-items: flex-start;
    }
    .description-titles {
      width: 16.66%;
      color: #b2b2b2;
      list-style: none;
      margin: 0;
      li {
        font-family: Roboto;
        font-weight: 900;
        font-size: 12px;
        text-transform: uppercase;
        border-top: 1px solid #e7e7e7;
        padding: 7px 0;
        margin: 0;
        &:last-child {
          border-bottom: 1px solid #e7e7e7;
        }
      }
    }
    .description-info {
      width: 16.66%;
      color: #242424;
      list-style: none;
      margin: 0;
      li {
        font-family: Roboto;
        font-weight: 900;
        font-size: 12px;
        text-transform: uppercase;
        border-top: 1px solid #e7e7e7;
        padding: 7px 0;
        margin: 0;
        &:last-child {
          border-bottom: 1px solid #e7e7e7;
        }
      }
    }
    .description-main {
      width: 66.66%;
      padding-left: 20px;
      p {
        font-family: "Lato", sans-serif;
        font-size: 13px;
      }
    }
  }
  @media (max-width: 767px) {
    padding: 0px;
    margin-top: 0;
    .project-title {
      .col-one,
      .col-three {
        display: none;
      }
      .col-two {
        width: 100%;
      }
    }
    .project-content {
      padding: 0 20px;
      .row {
        flex-wrap: wrap;
        .description-titles,
        .description-info {
          width: 50%;
        }
        .description-main {
          width: 100%;
          margin-top: 20px;
          padding-left: 0px;
        }
      }
    }
  }
`

export default ProjectTemplate

export const pageQuery = graphql`
  query ProjectById(
    # these variables are passed in via createPage.pageContext in gatsby-node.js
    $id: String!
  ) {
    # selecting the current page by id
    post: wpProperty(id: { eq: $id }) {
      id
      title
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
      propertyInfo {
        propertyDescription
        propertyClient
        propertyLocation
        propertySize
        propertyDate
        propertyGallery {
          title
          localFile {
            childImageSharp {
              gatsbyImageData(
                width: 1130
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
