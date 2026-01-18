import * as React from "react";
import Layout from "../components/layout";
import { Link, graphql, useStaticQuery } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { renderRichText } from "gatsby-source-contentful/rich-text";

const IndexPage = () => {
  const data = useStaticQuery(graphql`
    query HomeQuery {
      contentfulPage {
        title
        body {
          raw
        }
        image {
          description
          gatsbyImageData(layout: CONSTRAINED, width: 900, placeholder: BLURRED)
        }
      }
    }
  `);

  const page = data?.contentfulPage ?? null;
  const image = page?.image ? getImage(page.image) : null;

  return (
    <Layout>
      <section className="home">
        <div className="home-content">
          <h1 className="home-title">{page?.title}</h1>

          {page?.body && (
            <div className="home-text">{renderRichText(page.body)}</div>
          )}

          <Link to="/portfolio" className="home-link">
            Min Portfolio →
          </Link>
        </div>

        {image && (
          <div className="home-image">
            <GatsbyImage
              image={image}
              alt={page?.image?.description || page?.title || "Home image"}
            />
          </div>
        )}
      </section>
    </Layout>
  );
};

export const Head = () => <title>Hem</title>;
export default IndexPage;
