import React, { useState, useEffect } from "react";
import { useStaticQuery, graphql } from "gatsby";
import styled from "styled-components";
import { GatsbyImage } from "gatsby-plugin-image";
import Isotope from "isotope-layout/js/isotope";

const PressGrid = () => {
  if (typeof window !== `undefined`) {
    // Import Isotope API dynamically
    const Isotope = require("isotope-layout/js/isotope");
  }

  // Init one ref to store the future isotope object
  const isotope = React.useRef();
  // Store the filter keyword in a state
  const [filterKey, setFilterKey] = React.useState("*");

  // Initialize an Isotope object with configs
  React.useEffect(() => {
    isotope.current = new Isotope(".filter-container", {
      itemSelector: ".filter-item",
      layoutMode: "fitRows",
    });
    // Cleanup
    return () => isotope.current.destroy();
  }, []);

  // Handling filter key change
  React.useEffect(() => {
    filterKey === "*"
      ? isotope.current.arrange({ filter: `*` })
      : isotope.current.arrange({ filter: `.${filterKey}` });
  }, [filterKey]);

  const handleFilterKeyChange = (key) => () => setFilterKey(key);

  const data = useStaticQuery(graphql`
    query {
      allWpStudioPress(sort: { fields: date, order: DESC }) {
        edges {
          node {
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
  `);

  const pressMap = data.allWpStudioPress.edges;

  return (
    <>
      <GridMain>
        <ul className="project-cats">
          <li onClick={handleFilterKeyChange("*")}>All</li>
          <li onClick={handleFilterKeyChange("publication")}>Publications</li>
          <li onClick={handleFilterKeyChange("award")}>Awards</li>
        </ul>
        <ul className="filter-container">
          {pressMap.map((press) => (
            <div
              key={press.node.title}
              className={`filter-item ${press.node.categories.nodes
                .map((category) => category.slug)
                .join(" ")}`}
            >
              <a
                href={press.node.pressInfo.pressLink}
                target="_blank"
                rel="noreferrer"
              >
                <GatsbyImage
                  className="slide-background"
                  image={
                    press.node.featuredImage.node.localFile.childImageSharp
                      .gatsbyImageData
                  }
                  alt={press.node.featuredImage.node.title}
                />
                <div className="press-content">
                  <div className={`categories ${press.node.categories.nodes.length > 0 ? press.node.categories.nodes.map(category => `category-${category.slug}`).join(' ') : 'uncategorized'}`}>
                    {press.node.categories.nodes.length > 0 ? (
                      press.node.categories.nodes.map((category) => (
                        <span key={category.slug} className={`category-item category-${category.slug}`}>
                          {category.name}
                        </span>
                      ))
                    ) : (
                      <span className="category-item uncategorized">Uncategorized</span>
                    )}
                  </div>
                  <p className="full-title">{press.node.pressInfo.fullTitle}</p>
                  <div className="details">
                    <p className="title">{press.node.title}</p>
                    <p>{press.node.pressInfo.pressDate}</p>
                  </div>
                  
                </div>
              </a>
            </div>
          ))}
        </ul>
      </GridMain>
    </>
  );
};

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
    width: 25%;
    border: 10px solid #fff;
    background-color: #fff;
    position: relative;
    .gatsby-image-wrapper {
      height: auto;
      min-height: 346px;
      margin: 0 auto;
      margin-bottom: 0px;
      img {
        object-fit {
          contain !important;
        }
      }
    }
    .press-content {
      margin-bottom: 20px;
    }
    a {
      color: #242424;
      text-decoration: none;
    }
    h3 {
      font-family: "Pathway Gothic One", sans-serif;
      font-size: 26px;
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
  
  .press-content .categories{
    margin-top: 10px;
    background: #DEDEDE;
    display: inline-block;
    padding: 5px 9px;
    font-size: 12px;
    margin-bottom: 6px;
  }

  .press-content .categories.category-publication{
    color: #ffffff;
    background: #111111;
  }

  .press-content .full-title{
    font-size: 12px;
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
    border-bottom: 1px solid #DEDEDE;
    padding-bottom: 12px;
    margin-bottom: 0;
  }

  .press-content .details{
    display: grid;
    grid-template-columns: 1fr auto;
    border-bottom: 1px solid #DEDEDE;
  }

  .press-content .details p{
    border-bottom: none;
    font-size: 12px;
    margin-bottom: 0;
    padding-bottom: 11px;
  }

.press-content .details .title{
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
  @media (max-width: 640px) {
    .filter-container {
      max-width: 285px;
    }
    .filter-item {
      width: 100%;
    }
  }
`;

export default PressGrid;
