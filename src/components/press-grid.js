import React, { useState, useEffect }  from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import styled from 'styled-components'
import { GatsbyImage } from "gatsby-plugin-image"

import Isotope from "isotope-layout/js/isotope";

const PressGrid = () => {

    if (typeof window !== `undefined`) {

      // import Isotope API
      const Isotope = require("isotope-layout/js/isotope");
      
    }

    // init one ref to store the future isotope object
    const isotope = React.useRef()
    // store the filter keyword in a state
    const [filterKey, setFilterKey] = React.useState('*')

    // initialize an Isotope object with configs
    React.useEffect(() => {
        isotope.current = new Isotope('.filter-container', {
        itemSelector: '.filter-item',
        layoutMode: 'fitRows',
        })
        // cleanup
        return () => isotope.current.destroy()
    }, [])

    // handling filter key change
    React.useEffect(() => {
        filterKey === '*'
        ? isotope.current.arrange({filter: `*`})
        : isotope.current.arrange({filter: `.${filterKey}`})
    }, [filterKey])

    const handleFilterKeyChange = key => () => setFilterKey(key)

    const data = useStaticQuery(graphql`
        query {
          allWpStudioPress(sort: {fields: date, order: DESC}) {
            edges {
              node {
                title
                categories {
                  nodes {
                    slug
                  }
                }
                featuredImage {
                  node {
                    title
                    localFile {
                      childImageSharp {
                        gatsbyImageData (
                            width: 400
                            placeholder: DOMINANT_COLOR
                            formats: [AUTO, WEBP, AVIF]
                        )
                      }
                    }
                  }
                }
                pressInfo {
                  pressDate
                  pressLink
                }
              }
            }
          }
        }
    `)

    const pressMap = data.allWpStudioPress.edges

    return (
        <>
          <GridMain>
            <ul class="project-cats">
              <li onClick={handleFilterKeyChange('*')}>All</li>
              <li onClick={handleFilterKeyChange('publication')}>Publications</li>
              <li onClick={handleFilterKeyChange('award')}>Awards</li>
            </ul>
            <h1>Press</h1>
            <ul className="filter-container">

              {pressMap.map(press => (

                <div className={`filter-item ${press.node.categories.nodes.map(category => ( category.slug  )).join(' ')}`}>
                  <a href={press.node.pressInfo.pressLink} target="_blank"  rel="noreferrer">
                    <GatsbyImage className={"slide-background"} image={press.node.featuredImage.node.localFile.childImageSharp.gatsbyImageData} alt={press.node.featuredImage.node.title} />
                    <div>
                      <p>{press.node.pressInfo.pressDate}</p>
                      <h3>{press.node.title}</h3>
                    </div>
                  </a>
                </div>
              ))}
            </ul>
          </GridMain>
        </>
    )

}

const GridMain = styled.section`
  width: 100%;
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
      color: #4c5166;
      font-family: Roboto;
      font-weight: 700;
      font-size: 14px;
      letter-spacing: 1px;
      padding-left: 20px;
      text-transform: lowercase;
      margin: 0;
      line-height: 3;
      &:hover {
        cursor: pointer;
      }
    }
  }
  h1 {
      max-width: 1060px;
      width: 100%;
      margin: 0 auto;
      font-family: Roboto;
      font-weight: 400;
      font-size: 24px;
      text-transform: uppercase;
  }
  .filter-container {
      max-width: 1140px;
      width: 100%;
      margin: 0 auto;
      margin-bottom: 50px;
  }
  .filter-item {
    height: 440px;
    width: 25%;
    border: 40px solid #fff;
    background-color: #fff;
    position: relative;
    .gatsby-image-wrapper {
        height: auto;
        margin: 0 auto;
        margin-bottom: 20px;
        img {
            object-fit {
                contain !important;
            }
        }
    }
    a {
        color: #242424;
        text-decoration: none;
    }
    h3 {
        font-family: Roboto;
        font-size: 20px;
        font-weight: 400;
        margin-top: 0;
        margin-bottom: 0;
    }
    p {
        font-family: Roboto;
        font-size: 16px;
        text-transform: uppercase;
        padding: 8px 0;
        border-bottom: 1px solid #242424;
        display: inline-block;
        margin-bottom: 10px;
    }
  }
  @media(max-width:1200px) {
    .filter-container {
      max-width: 855px;
    }
    .filter-item {
      width: 33.33%;
    }
  }
  @media(max-width:850px) {
    .filter-container {
      max-width: 570px;
    }
    .filter-item {
      width: 50%;
    }
  }
  @media(max-width:767px) {
    ul.project-cats {
      justify-content: center;
      margin-top: 30px;
    }
    h1 {
      display: none;
    }
  }
  @media(max-width:640px) {
    .filter-container {
      max-width: 285px;
    }
    .filter-item {
      width: 100%;
    }
  }
`

export default PressGrid