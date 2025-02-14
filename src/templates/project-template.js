import React from "react"
import { graphql, Link } from "gatsby"
import styled from "styled-components"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"

const ProjectTemplate = ({ data }) => {
  const post = data?.post

  // Fallback if data is missing
  if (!post) {
    return <p>Project data is missing. Please check the query and context.</p>
  }

  const featuredImage = getImage(post.seo.opengraphImage.localFile)

  return (
    <Layout>
      <Seo
        title={post.seo.title}
        description={post.seo.metaDesc}
        metaImage={featuredImage}
      />
      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <ProjectMain>
          {/* Top Info Section */}
          <div className="top-info">
            <div className="top-info-left">
              <h1>{post.title}</h1>
              <p>{post.propertyInfo.propertyLocation}</p>
            </div>
            <div className="top-info-right">
              <p>{post.propertyInfo.propertyShortDescription}</p>
            </div>
          </div>

          {/* Featured Image */}
          {featuredImage && (
            <div className="featured-image">
              <GatsbyImage
                className="featured-img"
                image={featuredImage}
                alt={post.title}
              />
            </div>
          )}

          {/* Property Info Section */}
          <div className="property-info">
            {/* Info Left */}
            <div className="info-left">
              <h2>About the Project</h2>
              <div
                className="description"
                dangerouslySetInnerHTML={{
                  __html: post.propertyInfo.propertyDescription,
                }}
              />
            </div>

            {/* Info Right */}
            <div className="info-right">
              <h2>Project Details:</h2>
              <ul>
                <li>
                  <p>Client</p> {post.propertyInfo.propertyClient}
                </li>
                <li>
                  <p>Location</p> {post.propertyInfo.propertyLocation}
                </li>
                <li>
                  <p>Size</p> {post.propertyInfo.propertySize}
                </li>
                <li>
                  <p>Date completed</p> {post.propertyInfo.propertyDate}
                </li>
                <li className="tag-list">
                  <p>Tags</p>
                  <ul className="tags">
                    {post.tags.nodes.map(tag => (
                      <li key={tag.id}>{tag.name}</li>
                    ))}
                  </ul>
                </li>
              </ul>
            </div>
          </div>

          {/* Gutenberg Content */}
          <div className="gutenberg-content">
            <div
              dangerouslySetInnerHTML={{
                __html: post.content, // Render Gutenberg content
              }}
            />
          </div>

          {/* Back to Projects Button */}
          <div className="back-to-projects">
            <Link to="/projects">Back to Projects</Link>
          </div>
        </ProjectMain>
      </article>
    </Layout>
  )
}

const ProjectMain = styled.div`
  width: 100%;
  padding: 0 50px;
  margin: 50px auto;

  .top-info {
    display: flex;
    justify-content: space-between;
    margin-bottom: 30px;
    margin: auto;
    padding: 0 28px;
    max-width: 1280px;

    .top-info-left {
      flex: 1.6;

      h1 {
        font-size: 42px;
        font-weight: bold;
        margin-bottom: 10px;
        margin-top: 0;
      }

      p {
        font-size: 16px;
        color: #555;
      }
    }

    .top-info-right {
      flex: 1;
      display: none;

      p {
        font-size: 16px;
        color: #555;
      }
    }
  }

  .featured-image {
    margin-bottom: 30px;

    .gatsby-image-wrapper {
      width: calc(100% + 100px);
      margin-left: -50px;
      max-height: none;
    }
  }

  .property-info {
    display: grid;
    grid-template-columns: 1fr 0.6fr 0.8fr;
    gap: 20px;
    margin-top: 50px;
    padding: 0 28px;
    margin-left: auto;
    margin-right: auto;
    max-width: 1280px;

    .info-left {
      h2 {
        font-size: 24px;
        font-weight: bold;
        margin-bottom: 30px;
      }

      .description {
        font-size: 16px;
        color: #333;
      }
    }

    .info-right {
      grid-column: 3;
      justify-self: end;
      width: 100%;
      padding-left: 20px;

      h2 {
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 22px;
        padding: 0 8px;
      }

      ul {
        list-style: none;
        padding: 0;
        margin: 0;

        li {
          display: flex;
          justify-content: space-between;
          font-size: 16px;
          padding: 17px 8px;
          border-top: 1px solid #5F5F5F;
          margin-top: 0px;
          margin-bottom: 0px;

          strong {
            font-weight: bold;
            color: #555;
          }

          .tags {
            display: flex;
            flex-wrap: wrap;
            gap: 2px;
            margin-top: 10px;

            li {
              background: #111111;
              padding: 5px 10px;
              font-size: 12px;
              margin: 3px;
              color: #ffffff;
              border: none;
            }
          }
        }

        .tag-list {
          display: block; /* Explicitly set display block for the tag-list class */
          display: none;
        }
      }
    }
  }

  .gutenberg-content {
    margin-top: 40px;
    padding: 0 28px;
    max-width: 1280px;
    margin-left: auto;
    margin-right: auto;

    h1, h2, h3, h4, h5, h6 {
      font-family: "Roboto", sans-serif;
      font-weight: bold;
      margin-bottom: 20px;
    }

    p {
      font-size: 16px;
      line-height: 1.6;
      margin-bottom: 20px;
    }

    ul, ol {
      margin-left: 20px;
      margin-bottom: 20px;
    }

    a {
      color: #007acc;
      text-decoration: underline;

      &:hover {
        color: #005fa3;
      }
    }
  }

  .back-to-projects {
    margin-top: 30px;
    text-align: right;
    max-width: 1280px;
    margin-left: auto;
    margin-right: auto;
    padding: 0 28px;

    a {
      display: inline-block;
      background-color: #111111;
      color: #fff;
      text-decoration: none;
      padding: 10px 16px;
      font-size: 16px;
      transition: background-color 0.3s;
      font-weight: 600;

      &:hover {
        background-color: #333;
      }
    }
  }

  .two-column-grid{
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1em;
  }

  .one-em-gap {
    gap: 1em;
  }

  .margin-top-80{
    margin-top: 80px;
  }

  .padding-right-10-percent{
    padding-right: 10%;
  }

  .img-less-height{
    height: calc(100% - 2em);

    img{
      height: 100%;
    }
  }

  @media (max-width: 992px) {

    .property-info{
        grid-template-columns: 1fr 0.2fr 0.8fr;
    }

  }

  @media (max-width: 781px){

    .wp-block-image{
        text-align: center;
    }

    .wp-block-column:nth-child(even) {
        margin-left: 0;
    }

    .wp-block-column {
        flex-basis: 100% !important;
    }

    .margin-top-80, .wp-block-columns{
        margin-top: 0;
        margin-bottom: 0;
    }

    .two-column-grid{
        gap: 0;
    }

  }

  @media (max-width: 768px) {
    padding: 0px;

    .top-info {
      flex-direction: column;
      padding: 0 50px;

      .top-info-right {
        text-align: left;
        margin-top: 10px;
      }
    }

    .property-info {
        grid-template-columns: 1fr;
        gap: 0;
        padding: 0 50px;

      .info-right{
        grid-column: 1;
      }

      .info-left,
      .info-right {
        border: none;
        padding: 0;

        h2 {
          font-size: 18px;
          margin-top: 20px;
        }
      }

      .info-right ul li {
        justify-content: space-between;
      }
    }

    .two-column-grid{
        grid-template-columns: 1fr;
    }

    .back-to-projects{
        text-align: center;
    }

    .mobile-padding{
        padding: 0 50px;
    }
  }

  @media (max-width: 480px){
    
    .mobile-padding, .property-info, .top-info{
        padding: 0 20px;
    }


  }
`

export default ProjectTemplate

export const pageQuery = graphql`
  query ProjectById($id: String!) {
    post: wpProperty(id: { eq: $id }) {
      id
      title
      content # Gutenberg content
      seo {
        title
        metaDesc
        opengraphImage {
          localFile {
            childImageSharp {
              gatsbyImageData(
                width: 1920
                quality: 90
                placeholder: BLURRED
                formats: [AUTO, WEBP, AVIF]
              )
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
        propertyShortDescription
      }
      tags {
        nodes {
          id
          name
        }
      }
    }
  }
`
