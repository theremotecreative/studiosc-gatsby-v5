import React, { useState, useEffect, useRef } from "react"
import { useStaticQuery, graphql } from "gatsby"
import styled from "styled-components"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

// NOTE: Do not import "isotope-layout" at the top level.
// We dynamically import it in a useEffect so SSR doesn't try to require it.

const PressGrid = () => {
  const gridRef = useRef(null)
  const isoRef = useRef(null)
  const [filterKey, setFilterKey] = useState("*")

  // Instantiate Isotope on the client only
  useEffect(() => {
    if (typeof window === "undefined") return
    let canceled = false

    ;(async () => {
      const { default: Isotope } = await import("isotope-layout")
      if (canceled || !gridRef.current) return

      isoRef.current = new Isotope(gridRef.current, {
        itemSelector: ".filter-item",
        layoutMode: "fitRows",
      })

      // Initial layout after mount
      requestAnimationFrame(() => {
        if (!canceled && isoRef.current) isoRef.current.layout()
      })
    })()

    return () => {
      canceled = true
      if (isoRef.current) {
        isoRef.current.destroy()
        isoRef.current = null
      }
    }
  }, [])

  // Apply filters when the key changes
  useEffect(() => {
    if (isoRef.current) {
      isoRef.current.arrange({
        filter: filterKey === "*" ? "*" : `.${filterKey}`,
      })
    }
  }, [filterKey])

  const handleFilterKeyChange = key => () => setFilterKey(key)

  // Updated sort syntax (avoids Gatsby deprecation warning) and includes `id` for stable keys
  const data = useStaticQuery(graphql`
    query {
      allWpStudioPress(sort: { date: DESC }) {
        edges {
          node {
            id
            title
            categories {
              nodes {
                name
                slug
              }
            }
            featuredImage {
              node {
                title
                localFile {
                  childImageSharp {
                    gatsbyImageData(
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
              fullTitle
            }
          }
        }
      }
    }
  `)

  const pressMap = data.allWpStudioPress.edges

  return (
    <GridMain>
      <div className="project-cats-container">
        <h3>Press</h3>
        <ul className="project-cats">
          <li
            className={filterKey === "*" ? "active" : ""}
            onClick={handleFilterKeyChange("*")}
          >
            All
          </li>
          <li
            className={filterKey === "publication" ? "active" : ""}
            onClick={handleFilterKeyChange("publication")}
          >
            Publications
          </li>
          <li
            className={filterKey === "award" ? "active" : ""}
            onClick={handleFilterKeyChange("award")}
          >
            Awards
          </li>
        </ul>
      </div>

      {/* Attach Isotope to a ref instead of querying by selector */}
      <ul className="filter-container" ref={gridRef}>
        {pressMap.map(({ node }) => {
          const image = getImage(node.featuredImage?.node?.localFile)
          const catNodes = node.categories?.nodes ?? []
          const catClasses = catNodes.map(c => c.slug).join(" ")

          return (
            <li key={node.id} className={`filter-item ${catClasses}`}>
              <a
                href={node.pressInfo?.pressLink || "#"}
                target="_blank"
                rel="noreferrer"
              >
                {image && (
                  <GatsbyImage
                    className="slide-background"
                    image={image}
                    alt={node.featuredImage?.node?.title || node.title}
                    // Nudge Isotope to relayout as images load
                    onLoad={() => isoRef.current && isoRef.current.layout()}
                  />
                )}
                <div className="press-content">
                  <div
                    className={`categories ${
                      catNodes.length > 0
                        ? catNodes
                            .map(category => `category-${category.slug}`)
                            .join(" ")
                        : "uncategorized"
                    }`}
                  >
                    {catNodes.length > 0 ? (
                      catNodes.map(category => (
                        <span
                          key={category.slug}
                          className={`category-item category-${category.slug}`}
                        >
                          {category.name}
                        </span>
                      ))
                    ) : (
                      <span className="category-item uncategorized">
                        Uncategorized
                      </span>
                    )}
                  </div>
                  <p className="full-title">{node.pressInfo?.fullTitle}</p>
                  <div className="details">
                    <p className="title">{node.title}</p>
                    <p>{node.pressInfo?.pressDate}</p>
                  </div>
                </div>
              </a>
            </li>
          )
        })}
      </ul>
    </GridMain>
  )
}

const GridMain = styled.section`
  width: 100%;
  padding: 0 30px;

  .project-cats-container {
    display: grid;
    grid-template-columns: auto 1fr;
    max-width: 1140px;
    width: 100%;
    margin: 0 auto;
    margin-top: 40px;
    margin-bottom: 40px;
    padding: 0 10px;
    align-items: end;

    h3 {
      font-size: 42px;
      font-weight: bold;
      margin-bottom: 0;
      margin-top: 0;
    }
  }

  ul.project-cats {
    list-style: none;
    display: flex;
    width: 100%;
    justify-content: flex-end;
    align-items: flex-end;
    padding: 0 0 0 20px;
    margin: 0;
    margin-top: -25px;
    position: relative;
    z-index: 4;

    li {
      color: #474747;
      font-family: "Carlito", sans-serif;
      font-size: 16px;
      margin: 0;
      line-height: 3;
      border-bottom: solid 1px #dedede;
      padding-left: 45px;
      padding-right: 45px;
      &:hover {
        cursor: pointer;
      }
    }
    .active {
      border-color: #474747;
    }
  }

  h1 {
    max-width: 1060px;
    width: 100%;
    margin: 0 auto;
    font-family: Roboto, sans-serif;
    font-weight: 400;
    font-size: 24px;
    text-transform: uppercase;
  }

  .filter-container {
    list-style: none;
    padding: 0;
    max-width: 1140px;
    width: 100%;
    margin: 0 auto 50px;
  }

  .filter-item {
    width: 25%;
    border: 10px solid #fff;
    background-color: #fff;
    position: relative;

    .gatsby-image-wrapper {
      height: auto;
      min-height: 346px;
      margin: 0 auto 0;
      img {
        /* fix typo: use property syntax, not block */
        object-fit: contain !important;
      }
    }

    .press-content {
      margin-bottom: 20px;
    }
    a {
      color: #242424;
      text-decoration: none;
      display: block;
    }
    h3 {
      font-family: "Pathway Gothic One", sans-serif;
      font-size: 26px;
      font-weight: 400;
      margin-top: 0;
      margin-bottom: 0;
    }
    p {
      font-family: Roboto, sans-serif;
      font-size: 16px;
      padding: 8px 0;
      border-bottom: 1px solid #242424;
      display: inline-block;
      margin-bottom: 10px;
    }
  }

  .press-content .categories {
    margin-top: 10px;
    background: #dedede;
    display: inline-block;
    padding: 5px 9px;
    font-size: 12px;
    margin-bottom: 6px;
  }

  .press-content .categories.category-publication {
    color: #ffffff;
    background: #111111;
  }

  .press-content .full-title {
    font-size: 12px;
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
    border-bottom: 1px solid #dedede;
    padding-bottom: 12px;
    margin-bottom: 0;
  }

  .press-content .details {
    display: grid;
    grid-template-columns: 1fr auto;
    border-bottom: 1px solid #dedede;
  }

  .press-content .details p {
    border-bottom: none;
    font-size: 10px;
    margin-bottom: 0;
    padding-bottom: 11px;
  }

  .press-content .details .title {
    font-weight: 900;
  }

  @media (max-width: 1200px) {
    .filter-container {
      max-width: 855px;
    }
    .filter-item {
      width: 33.33%;
    }
  }
  @media (max-width: 850px) {
    .filter-container {
      max-width: 570px;
    }
    .filter-item {
      width: 50%;
    }
  }
  @media (max-width: 767px) {
    padding: 0px;
    ul.project-cats {
      justify-content: center;
      margin-top: 30px;
    }
    h1 {
      display: none;
    }
  }
  @media screen and (max-width: 640px) {
    .filter-container {
      max-width: 285px;
      margin: 0 auto;

      .filter-item {
        width: 100%;
        box-sizing: border-box;
      }
    }

    .project-cats-container {
      grid-template-columns: 1fr;
      padding: 0px 15px;
    }

    ul.project-cats {
      padding: 0;

      li {
        flex: 1;
        text-align: center;
        padding-left: 30px;
        padding-right: 30px;
      }
    }
  }

`

export default PressGrid
