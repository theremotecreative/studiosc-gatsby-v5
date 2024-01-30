import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

const HeaderLogo = () => {
  const data = useStaticQuery(graphql`
    query {
      placeholderImage: file(relativePath: { eq: "logo-square.png" }) {
        childImageSharp {
          gatsbyImageData (
              width: 75
              placeholder: BLURRED
              formats: [AUTO, WEBP, AVIF]
          )
        }
      }
    }
  `)

  const mainLogo = getImage(data.placeholderImage.childImageSharp.gatsbyImageData)

  return <GatsbyImage className={"main-logo"} image={mainLogo} alt="StudiosC Logo" />
}

export default HeaderLogo