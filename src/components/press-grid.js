import React, { useState, useEffect, useRef } from "react";
import { useStaticQuery, graphql } from "gatsby";
import styled from "styled-components";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import Isotope from "isotope-layout";

const PressGrid = () => {
  const isotope = useRef();
  const [filterKey, setFilterKey] = useState("*");

  useEffect(() => {
    isotope.current = new Isotope(".filter-container", {
      itemSelector: ".filter-item",
      layoutMode: "fitRows",
    });

    return () => isotope.current.destroy();
  }, []);

  useEffect(() => {
    if (isotope.current) {
      isotope.current.arrange({
        filter: filterKey === "*" ? "*" : `.${filterKey}`,
      });
    }
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
    <GridMain>
      <div className="project-cats-container">
        <h3>Press</h3>
        <ul className="project-cats">
          <li className={filterKey === "*" ? "active" : ""} onClick={handleFilterKeyChange("*")}>All</li>
          <li className={filterKey === "publication" ? "active" : ""} onClick={handleFilterKeyChange("publication")}>Publications</li>
          <li className={filterKey === "award" ? "active" : ""} onClick={handleFilterKeyChange("award")}>Awards</li>
        </ul>
      </div>
      <ul className="filter-container">
        {pressMap.map(({ node }) => {
          const image = getImage(node.featuredImage?.node?.localFile);

          return (
            <div
              key={node.title}
              className={`filter-item ${node.categories.nodes.map((category) => category.slug).join(" ")}`}
            >
              <a href={node.pressInfo.pressLink} target="_blank" rel="noreferrer">
                {image && (
                  <GatsbyImage
                    className="slide-background"
                    image={image}
                    alt={node.featuredImage?.node?.title || node.title}
                  />
                )}
                <div className="press-content">
                  <div className={`categories ${node.categories.nodes.length > 0 ? node.categories.nodes.map(category => `category-${category.slug}`).join(' ') : 'uncategorized'}`}>
                    {node.categories.nodes.length > 0 ? (
                      node.categories.nodes.map((category) => (
                        <span key={category.slug} className={`category-item category-${category.slug}`}>
                          {category.name}
                        </span>
                      ))
                    ) : (
                      <span className="category-item uncategorized">Uncategorized</span>
                    )}
                  </div>
                  <p className="full-title">{node.pressInfo.fullTitle}</p>
                  <div className="details">
                    <p className="title">{node.title}</p>
                    <p>{node.pressInfo.pressDate}</p>
                  </div>
                </div>
              </a>
            </div>
          );
        })}
      </ul>
    </GridMain>
  );
};

const GridMain = styled.section`
  /* Styles remain unchanged */
`;

export default PressGrid;
