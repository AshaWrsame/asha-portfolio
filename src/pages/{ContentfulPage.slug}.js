import * as React from "react";
import Layout from "../components/layout";
import { graphql } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import * as styles from "../styles/about.module.css";
import PortfolioPage from "./portfolio";

const Page = ({ data }) => {
  const page = data.contentfulPage;
  if (page.slug === "portfolio"){
     return <PortfolioPage />
  }
  return (
    <Layout>
      <div className={styles.wrapper}>
        <header className={styles.header}>
          <h1 className={styles.pageTitle}>{page.title}</h1>

          {page.subtitle && (
            <p className={styles.subtitle}>{page.subtitle}</p>
          )}
        </header>

        <div className={styles.grid}>
          <div className={styles.content}>
            <div className={styles.text}>
              {page.body?.raw && renderRichText(page.body)}
            </div>
          </div>

          {page.image?.gatsbyImageData && (
            <div className={styles.image}>
              <GatsbyImage
                image={page.image.gatsbyImageData}
                alt={page.image.title || page.title}
              />
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Page;


export const query = graphql `
query ($slug: String!) {
  contentfulPage(slug: {eq: $slug}) {
    title
    slug
    body {
      raw
    }
      image {
      gatsbyImageData(layout: CONSTRAINED, width: 400, placeholder: BLURRED)
    }
  }
}
`;

export const Head = ({data}) => {
if (data.contentfulPage.slug === "portfolio"){
    return <title>Portfolio</title>
}
return <title>{data.contentfulPage.title}</title>
};
