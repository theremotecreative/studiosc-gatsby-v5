import React, { useState, useEffect } from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import styled from "styled-components"
import { GatsbyImage } from "gatsby-plugin-image"

import Isotope from "isotope-layout/js/isotope"

const IsoGrid = () => {
  if (typeof window !== `undefined`) {
    // import Isotope API
    const Isotope = require("isotope-layout/js/isotope")
  }

  // init one ref to store the future isotope object
  const isotope = React.useRef()
  // store the filter keyword in a state
  const [filterKey, setFilterKey] = React.useState("*")

  // initialize an Isotope object with configs
  React.useEffect(() => {
    isotope.current = new Isotope(".filter-container", {
      itemSelector: ".filter-item",
      layoutMode: "fitRows",
    })
    // cleanup
    return () => isotope.current.destroy()
  }, [])

  // handling filter key change
  React.useEffect(() => {
    filterKey === "*"
      ? isotope.current.arrange({ filter: `*` })
      : isotope.current.arrange({ filter: `.${filterKey}` })
  }, [filterKey])

  const handleFilterKeyChange = key => () => setFilterKey(key)

  const data = useStaticQuery(graphql`
    query {
      allWpProperty(sort: { date: DESC }) {
        edges {
          node {
            title
            slug
            categories {
              nodes {
                slug
              }
            }
            featuredImage {
              node {
                localFile {
                  childImageSharp {
                    gatsbyImageData(
                      width: 800
                      placeholder: BLURRED
                      formats: [AUTO, WEBP, AVIF]
                    )
                  }
                }
              }
            }
            propertyInfo {
              propertyLocation
            }
          }
        }
      }
    }
  `)

  const propertyMap = data.allWpProperty.edges

  return (
    <>
      <GridMain>
        <ul className="project-cats">
          <li onClick={handleFilterKeyChange("*")}>All</li>
          <li onClick={handleFilterKeyChange("development")}>Development</li>
          <li onClick={handleFilterKeyChange("residential")}>Residential</li>
          <li onClick={handleFilterKeyChange("office")}>Office</li>
          <li onClick={handleFilterKeyChange("adaptive-reuse")}>
            Adaptive Reuse
          </li>
          <li onClick={handleFilterKeyChange("commerce")}>Commerce</li>
        </ul>
        <ul className="filter-container">
          {propertyMap.map(property => (
            <div
              className={`filter-item ${property.node.categories.nodes
                .map(category => category.slug)
                .join(" ")}`}
            >
              <div className="property-container">
                <GatsbyImage
                  className={"slide-background"}
                  image={
                    property.node.featuredImage.node.localFile.childImageSharp
                      .gatsbyImageData
                  }
                  alt={"slide"}
                />
                <Link to={property.node.slug}>
                  <div>
                    <h3>{property.node.title}</h3>
                    <p>{property.node.propertyInfo.propertyLocation}</p>
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </ul>
      </GridMain>
    </>
  )
}

const GridMain = styled.section`
  max-width: 100%;
  padding: 0 30px;
  ul.project-cats {
    list-style: none;
    display: flex;
    width: 100%;
    justify-content: flex-end;
    align-items: center;
    padding: 0 20px;
    margin: 0;
    margin-top: -25px;
    position: relative;
    z-index: 4;
    li {
      color: #474747;
      font-family: "Carlito", sans-serif;
      font-weight: 700;
      font-size: 17px;
      padding-left: 20px;
      margin: 0;
      line-height: 3;
      &:hover {
        cursor: pointer;
      }
    }
  }
  .filter-item {
    height: 400px;
    width: 33%;
    border: 10px solid #fff;
    background-color: #fff;
    position: relative;
    .property-container {
      position: absolute;
      width: 100%;
      height: 100%;
    }
    .gatsby-image-wrapper {
      position: absolute !important;
      height: 100%;
      width: 100%;
      max-height: 100% !important;
      max-width: 100% !important;
      z-index: 1;
      opacity: 1;
      transition-duration: 0.5s;
      > div {
        height: 100%;
        width: 100%;
        max-height: 100% !important;
        max-width: 100% !important;
      }
      img {
        width: 100% !important;
        height: 100% !important;
        max-height: 100% !important;
        max-width: 100% !important;
        object-fit: cover !important;
        aspect-ratio: unset !important;
      }
    }
    a {
      position: absolute;
      display: flex;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      justify-content: center;
      align-items: center;
      color: #000;
      text-decoration: none;
      z-index: 2;
      opacity: 0;
      transition-duration: 0.5s;
    }
    h3 {
      font-family: "Pathway Gothic One", sans-serif;
      text-align: center;
      font-size: 30px;
      letter-spacing: 1.5px;
      font-weight: 400;
      text-transform: uppercase;
    }
    p {
      font-family: "Pathway Gothic One", sans-serif;
      text-align: center;
      font-size: 16px;
      font-weight: 400;
    }
    &:hover {
      .gatsby-image-wrapper {
        opacity: 0;
      }
      a {
        opacity: 1;
      }
    }
  }
  @media (max-width: 1200px) {
    .filter-item {
      width: 50%;
    }
  }
  @media (max-width: 767px) {
    padding: 0 10px;
    ul.project-cats {
      flex-wrap: wrap;
      justify-content: center;
      margin-top: 30px;
    }
    .filter-item {
      width: 100%;
      height: 300px;
      .gatsby-image-wrapper {
        opacity: 1 !important;
      }
      a {
        opacity: 1 !important;
        color: #fff !important;
        background-color: rgba(0, 0, 0, 0.5);
      }
      h3 {
        color: #fff !important;
      }
    }
  }
`

export default IsoGrid
