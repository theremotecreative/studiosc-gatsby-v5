import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

const HomeMobileLogo = () => {
  const data = useStaticQuery(graphql`
    query {
      placeholderImage: file(relativePath: { eq: "logo-blue-circle.png" }) {
        childImageSharp {
          gatsbyImageData (
              width: 55
              placeholder: BLURRED
              formats: [AUTO, WEBP, AVIF]
          )
        }
      }
    }
  `)

  const mainLogo = getImage(data.placeholderImage.childImageSharp.gatsbyImageData)

  return <GatsbyImage className={"home-mobile-logo"} image={mainLogo} alt="StudiosC Logo" />
}

export default HomeMobileLogo