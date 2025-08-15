// src/pages/projects.js
import React from "react";
import { graphql } from "gatsby";
import { getSrc } from "gatsby-plugin-image";

import Layout from "../components/layout";
import Seo from "../components/seo";
import IsoGrid from "../components/isotope-grid";

const ProjectPage = ({ data }) => {
  const seo = data?.queryContent?.seo;

  // Safely turn gatsbyImageData into a URL for <Seo />
  const ogGatsby =
    seo?.opengraphImage?.localFile?.childImageSharp?.gatsbyImageData;
  const metaImage = ogGatsby ? getSrc(ogGatsby) : undefined;

  return (
    <Layout>
      <Seo
        title={seo?.title || "Projects"}
        description={seo?.metaDesc || "StudiosC projects"}
        metaImage={metaImage}
      />
      <IsoGrid />
    </Layout>
  );
};

export default ProjectPage;

export const pageQuery = graphql`
  query ProjectsPageQuery {
    queryContent: wpPage(databaseId: { eq: 218 }) {
      seo {
        title
        metaDesc
        opengraphImage {
          localFile {
            childImageSharp {
              gatsbyImageData(
                width: 1200
                placeholder: BLURRED
                formats: [AUTO, WEBP, AVIF]
              )
            }
          }
        }
      }
    }
  }
`;
