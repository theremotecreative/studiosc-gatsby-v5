import React, { useState, useEffect, useRef } from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import styled from "styled-components"
import { GatsbyImage, getSrc } from "gatsby-plugin-image"
import { globalHistory } from "@reach/router"

const IsoGrid = () => {
  const containerRef = useRef(null)
  const isotope = useRef(null)

  const [filterKey, setFilterKey] = useState("*")
  const [parentCategory, setParentCategory] = useState(null)

  // Mount: create Isotope only in the browser
  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current) return

    let iso
    let imgLoad
    ;(async () => {
      // Load libs only in the browser
      const [{ default: Isotope }, imagesLoadedMod] = await Promise.all([
        import("isotope-layout"),
        import("imagesloaded"),
      ])
      const imagesLoaded = imagesLoadedMod.default || imagesLoadedMod

      iso = new Isotope(containerRef.current, {
        itemSelector: ".filter-item",
        layoutMode: "fitRows",
      })
      isotope.current = iso

      // restore saved filter
      const saved = localStorage.getItem("projectFilterKey")
      if (saved) {
        setFilterKey(saved)
        setParentCategory(saved === "*" ? null : saved)
      }

      // wait for images, then layout
      imgLoad = imagesLoaded(containerRef.current)
      imgLoad.on("always", () => iso.layout())
    })()

    return () => {
      try {
        imgLoad && imgLoad.off("always")
      } catch {}
      try {
        iso && iso.destroy()
      } catch {}
    }
  }, [])

  // Listen for route changes (browser only)
  useEffect(() => {
    if (typeof window === "undefined") return
    const unlisten = globalHistory.listen(({ location }) => {
      const isLeavingProjects = !location.pathname.startsWith("/projects/")
      if (isLeavingProjects) {
        localStorage.removeItem("projectFilterKey")
      } else {
        const saved = localStorage.getItem("projectFilterKey") || "*"
        setFilterKey(saved)
        setParentCategory(saved === "*" ? null : saved)
      }
    })
    return () => unlisten()
  }, [])

  // Apply filter to Isotope
  useEffect(() => {
    if (isotope.current) {
      isotope.current.arrange({
        filter: filterKey === "*" ? "*" : `.${filterKey}`,
      })
    }
  }, [filterKey])

  // Move/show the size submenu
  useEffect(() => {
    if (typeof document === "undefined") return
    const developmentItem = document.querySelector(
      ".project-cats > li:nth-child(2)"
    )
    const sizeSubMenu = document.querySelector(".size-cats")
    if (parentCategory === "development" && developmentItem && sizeSubMenu) {
      developmentItem.appendChild(sizeSubMenu)
      sizeSubMenu.style.display = "block"
    } else if (sizeSubMenu) {
      sizeSubMenu.style.display = "none"
    }
  }, [parentCategory])

  const handleParentCategoryClick = key => () => {
    const newKey = key === parentCategory ? "*" : key
    setParentCategory(newKey === "*" ? null : newKey)
    setFilterKey(newKey)
    if (typeof window !== "undefined") {
      localStorage.setItem("projectFilterKey", newKey)
    }
  }

  const handleChildCategoryClick = key => () => {
    setFilterKey(key)
    if (typeof window !== "undefined") {
      localStorage.setItem("projectFilterKey", key)
    }
  }

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
              secondaryImage {
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
    <GridMain>
      <ul className="project-cats">
        <li
          className={filterKey === "*" ? "active" : ""}
          onClick={handleParentCategoryClick("*")}
        >
          All
        </li>
        <li
          className={filterKey === "development" ? "active" : ""}
          onClick={handleParentCategoryClick("development")}
        >
          Development
        </li>
        <ul className="size-cats">
          <li
            className={filterKey === "s" ? "active" : ""}
            onClick={handleChildCategoryClick("s")}
          >
            S
          </li>
          <li
            className={filterKey === "m" ? "active" : ""}
            onClick={handleChildCategoryClick("m")}
          >
            M
          </li>
          <li
            className={filterKey === "l" ? "active" : ""}
            onClick={handleChildCategoryClick("l")}
          >
            L
          </li>
          <li
            className={filterKey === "xl-interiors" ? "active" : ""}
            onClick={handleChildCategoryClick("xl-interiors")}
          >
            XL-INTERIORS
          </li>
        </ul>
        <li
          className={filterKey === "residential" ? "active" : ""}
          onClick={handleParentCategoryClick("residential")}
        >
          Residential
        </li>
        <li
          className={filterKey === "office" ? "active" : ""}
          onClick={handleParentCategoryClick("office")}
        >
          Office
        </li>
        <li
          className={filterKey === "civic" ? "active" : ""}
          onClick={handleParentCategoryClick("civic")}
        >
          Civic
        </li>
        <li
          className={filterKey === "commerce" ? "active" : ""}
          onClick={handleParentCategoryClick("commerce")}
        >
          Commerce
        </li>
      </ul>

      <ul ref={containerRef} className="filter-container">
        {propertyMap.map(({ node: property }) => {
          const fallbackImage = "https://via.placeholder.com/800x400"
          const hoverImage = property.propertyInfo.secondaryImage?.localFile
            ?.childImageSharp?.gatsbyImageData
            ? getSrc(
                property.propertyInfo.secondaryImage.localFile.childImageSharp
                  .gatsbyImageData
              )
            : fallbackImage

          return (
            <Link
              to={`/projects/${property.slug}`}
              key={property.slug}
              className={`filter-item ${property.categories.nodes
                .map(c => c.slug)
                .join(" ")}`}
            >
              <div className="property-container">
                <div className="image-container">
                  {property.featuredImage?.node?.localFile?.childImageSharp
                    ?.gatsbyImageData && (
                    <GatsbyImage
                      className="featured-image"
                      image={
                        property.featuredImage.node.localFile.childImageSharp
                          .gatsbyImageData
                      }
                      alt={property.title || "Project Image"}
                    />
                  )}
                  <div
                    className="hover-image"
                    style={{ backgroundImage: `url(${hoverImage})` }}
                  />
                </div>
                <div className="info">
                  <h3>{property.title} -</h3>
                  <p>{property.propertyInfo.propertyLocation}</p>
                </div>
              </div>
            </Link>
          )
        })}
      </ul>
    </GridMain>
  )
}

const GridMain = styled.section`
  /* ... (same styling as before) ... */
  max-width: 100%;
  padding: 0 30px;

  @media (max-width: 767px) {
    padding: 0 10px !important;
  }

  ul.project-cats {
    list-style: none;
    display: flex;
    width: 100%;
    justify-content: flex-end;
    align-items: center;
    padding: 0 20px;
    margin: 0;

    @media (max-width: 767px) {
      flex-wrap: wrap !important;
      justify-content: center !important;
      margin-top: 30px !important;
      row-gap: 5px;
    }

    li {
      color: #474747;
      font-family: "Calibri", sans-serif;
      font-weight: 300;
      font-size: 17px;
      padding-left: 20px;
      position: relative;

      &:hover {
        cursor: pointer;
      }

      &.active {
        font-weight: 400;
      }

      @media (max-width: 767px) {
        font-weight: 600;
        font-size: 15px;
        padding-left: 10px;
        padding-right: 10px;
      }

      ul.size-cats {
        list-style: none;
        display: none;
        flex-direction: column;
        margin: 0;
        position: absolute;
        width: max-content;
        left: -4px;
        top: 25px;
        z-index: 3;

        @media (max-width: 767px) {
          top: 19px;
        }

        li {
          font-size: 14px;
          padding: 0 4px;
          text-transform: uppercase;
          display: inline-block;

          @media (max-width: 767px) {
            font-weight: 300;
            font-size: 12px;
          }

          &:hover {
            cursor: pointer;
          }
        }
      }
    }
  }

  .filter-container {
    display: flex;
    flex-wrap: wrap;

    @media (max-width: 767px) {
      margin-top: -5px;
    }

    .filter-item {
      width: 33%;
      padding: 10px;
      text-decoration: none;

      .property-container {
        display: flex;
        flex-direction: column;
        background: #fff;
        text-align: center;
        cursor: pointer;

        .image-container {
          position: relative;
          overflow: hidden;
          height: 360px;

          .hover-image,
          .featured-image {
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            object-fit: cover;
            transition: all 1.5s ease;
          }

          .hover-image {
            z-index: 2;
            opacity: 0;
            background-size: cover;
            background-position: center;
          }

          .featured-image {
            z-index: 1;
            opacity: 1;
          }
        }

        &:hover .hover-image {
          opacity: 1;
        }

        &:hover .featured-image {
          opacity: 0;
        }

        .info {
          padding: 10px;
          display: flex;
          justify-content: end;
          align-items: center;
          gap: 4px;

          h3 {
            font-family: "Calibri", sans-serif;
            font-size: 16px;
            line-height: 16px;
            margin: 0;
            font-weight: 300;
          }

          p {
            font-family: "Calibri", sans-serif;
            font-size: 15px;
            margin: 0;
            color: #1a202c;
            font-weight: 300;
          }
        }
      }
    }

    @media (max-width: 1200px) {
      .filter-item {
        width: 50%;
      }
    }

    @media (max-width: 767px) {
      .filter-item {
        width: 100%;
        height: 330px;
        left: 0 !important;

        .property-container {
          .image-container {
            height: 270px;
          }
        }

        .gatsby-image-wrapper {
          opacity: 1 !important;
        }

        a {
          opacity: 1 !important;
          color: #fff !important;
          background-color: rgba(0, 0, 0, 0.5);
        }

        h3 {
          /* color: #fff !important; */
        }
      }
    }
  }
`

export default IsoGrid
