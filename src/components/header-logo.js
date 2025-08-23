import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";

export default function HeaderLogo() {
  const data = useStaticQuery(graphql`
    query HeaderLogoSafeQuery {
      placeholderImage: file(relativePath: { eq: "logo-square.png" }) {
        childImageSharp {
          gatsbyImageData(
            layout: FIXED
            width: 70
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

  // If Sharp can’t process (e.g., SVG) or file not found, use a plain <img>
  if (!imageData) {
    return (
      <img
        className="main-logo"
        src={fallbackURL || "/logo-square.png"}
        alt="StudiosC Logo"
        width={70}
        height="auto"
        style={{ display: "block" }}
      />
    );
  }

  return (
    <GatsbyImage
      className="main-logo"
      image={imageData}
      alt="StudiosC Logo"
    />
  );
}
