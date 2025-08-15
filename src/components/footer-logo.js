// src/components/footer-logo.js
import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";

export default function FooterLogo() {
  const data = useStaticQuery(graphql`
    query FooterLogoSafeQuery {
      placeholderImage: file(relativePath: { eq: "logo-white-square.png" }) {
        childImageSharp {
          gatsbyImageData(
            layout: FIXED
            width: 45
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
        className="footer-logo"
        src={fallbackURL || "/logo-white-square.png"}
        alt="StudiosC Footer Logo"
        width={45}
        style={{ margin: "0 auto", display: "block" }}
      />
    );
  }

  return (
    <GatsbyImage
      className="footer-logo"
      image={imageData}
      alt="StudiosC Footer Logo"
      style={{ margin: "0 auto" }}
    />
  );
}
