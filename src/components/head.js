import { graphql, useStaticQuery } from "gatsby";
import React from "react";
import { Helmet } from "react-helmet";
// import favicon from "../assets/icon.png";

export const query = graphql`
  {
    site {
      siteMetadata {
        description
        title
      }
    }
  }
`;

export const Head = ({ title, description }) => {
  const { site } = useStaticQuery(query);
  const metaDescription = description || site.siteMetadata.description;
  return (
    <Helmet
      htmlAttributes={{ lang: "en" }}
      title={` ${title} | ${site.siteMetadata.title}`}
      meta={[{ name: `description`, content: metaDescription }]}
    />
  );
};
