// src/components/mobile-logo.js
import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";

export default function HomeMobileLogo() {
  const data = useStaticQuery(graphql`
    query HomeMobileLogoSafeQuery {
      placeholderImage: file(relativePath: { eq: "logo-white-square.png" }) {
        childImageSharp {
          gatsbyImageData(
            layout: FIXED
            width: 55
            placeholder: NONE
            formats: [AUTO, WEBP, AVIF]
            backgroundColor: "transparent"
          )
        }
        publicURL
      }
    }
  `);

  const imageData = data?.placeholderImage?.childImageSharp?.gatsbyImageData;
  const fallbackURL = data?.placeholderImage?.publicURL;

  if (!imageData) {
    return (
      <img
        className="home-mobile-logo"
        src={fallbackURL || "/logo-white-square.png"}
        alt="StudiosC Logo"
        width={55}
        height="auto"
        style={{ display: "block" }}
      />
    );
  }

  return (
    <GatsbyImage
      className="home-mobile-logo"
      image={imageData}
      alt="StudiosC Logo"
    />
  );
}
