// src/pages/index.js
import React from "react";
import { graphql } from "gatsby";
import styled from "styled-components";
import { GatsbyImage, getSrc } from "gatsby-plugin-image";

import Layout from "../components/layout";
import Seo from "../components/seo";

const IndexPage = ({ data: { featuredImage, queryContent, mobileImage } }) => {
  // Use mobile hero if present, otherwise fall back to desktop hero
  const mobileImageData =
    mobileImage?.featuredImage?.node?.localFile?.childImageSharp
      ?.gatsbyImageData || featuredImage.childImageSharp.gatsbyImageData;

  const mobileImageAlt =
    mobileImage?.featuredImage?.node?.title ||
    "StudiosC - Architecture Studio based in Brooklyn, NY";

  // og:image for SEO
  const metaImage = getSrc(
    queryContent.seo.opengraphImage.localFile.childImageSharp.gatsbyImageData
  );

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
          loading="eager"
        />
      </DesktopImage>

      <MobileImage>
        <GatsbyImage
          image={mobileImageData}
          alt={mobileImageAlt}
          // force a larger srcset candidate on small screens to avoid upscaling a 100vh hero
          sizes="(max-width: 767px) 2000px, 100vw"
          loading="eager"
          imgStyle={{ objectFit: "cover", width: "100%", height: "100%" }}
          style={{ height: "100vh", width: "100%" }}
        />
      </MobileImage>
    </Layout>
  );
};

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

  @media (max-width: 767px) {
    display: none;
  }
`;

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

  @media (max-width: 767px) {
    display: block;
  }
`;

export default IndexPage;

export const pageQuery = graphql`
  query {
    featuredImage: file(relativePath: { eq: "homepage-2024.jpg" }) {
      childImageSharp {
        gatsbyImageData(
          width: 2400
          quality: 100
          placeholder: BLURRED
          formats: [AUTO, WEBP, AVIF]
        )
      }
    }
    queryContent: wpPage(databaseId: { eq: 224 }) {
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
    mobileImage: wpHomeSection(databaseId: { eq: 1318 }) {
      featuredImage {
        node {
          title
          localFile {
            childImageSharp {
              gatsbyImageData(
                layout: FULL_WIDTH
                quality: 100
                placeholder: BLURRED
                breakpoints: [480, 750, 1080, 1400, 1800, 2000, 2200]
                formats: [AUTO, WEBP, AVIF]
              )
            }
          }
        }
      }
    }
  }
`;
