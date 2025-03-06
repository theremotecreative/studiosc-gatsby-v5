import React, { useState, useEffect } from "react";
import { useStaticQuery, graphql, Link } from "gatsby";
import styled from "styled-components";
import { GatsbyImage } from "gatsby-plugin-image";
import Isotope from "isotope-layout/js/isotope";
import imagesLoaded from "imagesloaded"; // Ensure Isotope waits for images

const IsoGrid = () => {
  const isotope = React.useRef();
  const [filterKey, setFilterKey] = useState("*");
  const [parentCategory, setParentCategory] = useState(null);

  // Initialize Isotope
  useEffect(() => {
    isotope.current = new Isotope(".filter-container", {
      itemSelector: ".filter-item",
      layoutMode: "fitRows",
    });

    // Ensure Isotope waits for images & text to load before calculating positions
    imagesLoaded(".filter-container", function () {
      isotope.current.layout();
    });

    return () => isotope.current.destroy();
  }, []);

  // Apply filtering
  useEffect(() => {
    isotope.current.arrange({
      filter: filterKey === "*" ? `*` : `.${filterKey}`,
    });
  }, [filterKey]);

  // Handle submenus for parent categories
  useEffect(() => {
    const developmentItem = document.querySelector(
      ".project-cats > li:nth-child(2)"
    );
    const sizeSubMenu = document.querySelector(".size-cats");

    if (parentCategory === "development" && developmentItem && sizeSubMenu) {
      developmentItem.appendChild(sizeSubMenu);
      sizeSubMenu.style.display = "block";
    } else if (sizeSubMenu) {
      sizeSubMenu.style.display = "none";
    }
  }, [parentCategory]);

  // Handle parent category clicks
  const handleParentCategoryClick = (key) => () => {
    setParentCategory(key === parentCategory ? null : key);
    setFilterKey(key === parentCategory ? "*" : key);
  };

  // Handle child category clicks
  const handleChildCategoryClick = (key) => () => {
    setFilterKey(key);
  };

  // Fetch data using GraphQL
  const data = useStaticQuery(graphql`
    query {
      allWpProperty(sort: { fields: date, order: DESC }) {
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
          }
        }
      }
    }
  `);

  const propertyMap = data.allWpProperty.edges;

  return (
    <GridMain>
      {/* Categories */}
      <ul className="project-cats">
        <li onClick={handleParentCategoryClick("*")}>All</li>
        <li onClick={handleParentCategoryClick("development")}>
          Development
        </li>
        <ul className="size-cats">
          <li onClick={handleChildCategoryClick("s")}>S</li>
          <li onClick={handleChildCategoryClick("m")}>M</li>
          <li onClick={handleChildCategoryClick("l")}>L</li>
          <li onClick={handleChildCategoryClick("xl")}>XL</li>
        </ul>
        <li onClick={handleParentCategoryClick("residential")}>
          Residential
        </li>
        <li onClick={handleParentCategoryClick("office")}>Office</li>
        <li onClick={handleParentCategoryClick("adaptive-reuse")}>
          Adaptive Reuse
        </li>
        <li onClick={handleParentCategoryClick("commerce")}>Commerce</li>
      </ul>

      {/* Properties */}
      <ul className="filter-container">
        {propertyMap.map((property) => (
          <Link
            to={property.node.slug}
            key={property.node.slug}
            className={`filter-item ${property.node.categories.nodes
              .map((category) => category.slug)
              .join(" ")}`}
          >
            <div className="property-container">
              <div className="image-container">
                <GatsbyImage
                  className="featured-image"
                  image={
                    property.node.featuredImage.node.localFile.childImageSharp
                      .gatsbyImageData
                  }
                  alt={property.node.title}
                />
                <div
                  className="hover-image"
                  style={{
                    backgroundImage: property.node.propertyInfo.secondaryImage
                      ? `url(${property.node.propertyInfo.secondaryImage.localFile.childImageSharp.gatsbyImageData.images.fallback.src})`
                      : `url('https://via.placeholder.com/800x400')`,
                  }}
                ></div>
              </div>
              <div className="info">
                <h3>{property.node.title} -</h3>
                <p>{property.node.propertyInfo.propertyLocation}</p>
              </div>
            </div>
          </Link>
        ))}
      </ul>
    </GridMain>
  );
};

const GridMain = styled.section`
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
      font-family: 'Calibri', sans-serif;
      font-weight: 300;
      font-size: 17px;
      padding-left: 20px;
      position: relative;

      &:hover {
        cursor: pointer;
      }

      @media (max-width: 767px) {
        font-weight: 600;
        font-size: 15px;
      }

      ul.size-cats {
        list-style: none;
        display: none;
        flex-direction: column;
        margin: 0;
        position: absolute;
        left: 32px;
        top: 21px;
        z-index: 3;

        @media (max-width: 767px) {
          top: 19px;
        }

        li {
          font-size: 13px;
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

          .featured-image {
            height: 100%;
            width: 100%;
            object-fit: cover;
            transition: opacity 0.3s ease;
          }

          .hover-image {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-size: cover;
            background-position: center;
            opacity: 0;
            transition: opacity 0.3s ease;
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
            font-family: 'Calibri', sans-serif;
            font-size: 16px;
            line-height: 16px;
            margin: 0;
            font-weight: 300;
          }

          p {
            font-family: 'Calibri', sans-serif;
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
        /*color: #fff !important;*/
      }
    }
  
  }
`;

export default IsoGrid;
