/**
 * 👋 Hey there!
 * This file is the starting point for your new WordPress/Gatsby site! 🚀
 * For more information about what this file is and does, see
 * https://www.gatsbyjs.com/docs/gatsby-config/
 *
 */

// Add this to ignore SSL errors for local development
// process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"

// Hard-disable Gatsby Cloud CDNs on Netlify
if (process.env.NETLIFY) {
  process.env.GATSBY_CLOUD_IMAGE_CDN = "0"
  process.env.GATSBY_CLOUD_FILE_CDN = "0"
}

module.exports = {
  // flags: {
  //   LMDB_STORE: false,
  // },
  siteMetadata: {
    title: `StudiosC`,
    description: `Architecture Studio Based in Brooklyn, New York`,
    author: `StudiosC`,
    siteUrl: `https://studiosc.net`,
  },
  plugins: [
    {
      resolve: `gatsby-source-wordpress`,
      options: {
        url:
          process.env.WPGRAPHQL_URL ||
          `https://studiosc.theremotecreative.com/graphql`,
        schema: {
          requestConcurrency: 3, // lower = slower but safer for Netlify
          previewRequestConcurrency: 2,
        },
        type: {
          MediaItem: {
            localFile: {
              maxFileSizeBytes: 5000000, // Skip images >5MB
              requestConcurrency: 2,
            },
          },
        },
      },
    },

    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `assets`,
        path: `${__dirname}/content/assets`,
      },
    },
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [
          `Roboto\:300,400,500,700`,
          `Carlito:400,400i,700,700i`,
          `Pathway Gothic One:400`,
          `Lato:400`,
        ],
        display: "swap",
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-image`,
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-smoothscroll`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `StudiosC`,
        short_name: `StudiosC`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `content/assets/logo-square.png`,
      },
    },
    `gatsby-plugin-react-helmet`,
    // `gatsby-plugin-offline`,
  ],
}
