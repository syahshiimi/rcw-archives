/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: "Reconceptualizing the Cold War",
    description: "By historian Masuda Hajimu",
    author: "Masuda Hajimu",
    person: {
      name: "Masuda Hajimu",
      age: "32",
    },
    simpleData: ["item 1", "item 2"],
    complexData: [
      { name: "Syahrul", age: "26" },
      { name: "Varun", age: "26" },
    ],
  },
  plugins: [
    {
      resolve: `gatsby-plugin-styled-components`,
      options: {
        // Add any options here
      },
    },
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/assets/img`,
      },
    },
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: `2h4eq8swsmzf`,
        accessToken: process.env.CONTENTFUL_API_KEY,
      },
    },
  ],
}
