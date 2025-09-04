/**
 * 👋 Hey there!
 * This file is the starting point for your new WordPress/Gatsby site! 🚀
 * For more information about what this file is and does, see
 * https://www.gatsbyjs.com/docs/gatsby-config/
 *
 */

const adapter = require("gatsby-adapter-netlify").default

module.exports = {
  adapter: adapter(),
  siteMetadata: {
    title: `StudiosC`,
    description: `Architecture Studio Based in Brooklyn, New York`,
    author: `StudiosC`,
    siteUrl: `https://studiosc.net`,
  },
  plugins: [
    // --- Google Analytics (gtag) ---
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        // Prefer env var if set in Netlify/GitHub Actions; fallback to hardcoded ID
        trackingIds: [process.env.GATSBY_GTAG_ID || `G-YP8E8EN36T`],
        gtagConfig: {
          anonymize_ip: true,
          send_page_view: true,
        },
        pluginConfig: {
          head: true,              // load in <head> so it appears in Network as gtag/js
          respectDNT: true,        // respect “Do Not Track”
          exclude: ["/privacy/**"] // optional: don’t track your privacy page(s)
        },
      },
    },
    {
      resolve: `gatsby-source-wordpress`,
      options: {
        url:
          process.env.WPGRAPHQL_URL ||
          `https://studiosc.theremotecreative.com/graphql`,
        schema: {
          requestConcurrency: 1, // lower = slower but safer for Netlify
          previewRequestConcurrency: 2,
        },
        type: {
          MediaItem: {
            localFile: {
              maxFileSizeBytes: 4000000, // Skip images >4MB
              requestConcurrency: 1,
            },
          },
        },
        // Reuse previously downloaded media files during builds
        preserveMediaFiles: true,
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
    "gatsby-plugin-netlify",
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
