import * as React from "react";
import Layout from "../components/layout";
import { Link, graphql, useStaticQuery } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { renderRichText } from "gatsby-source-contentful/rich-text";

const IndexPage = () => {
  const data = useStaticQuery(graphql`
    query HomeQuery {
      contentfulHome {
        title
        presentationText {
          raw
        }
        homeImage {
          description
          gatsbyImageData(layout: CONSTRAINED, width: 900, placeholder: BLURRED)
        }
      }
    }
  `);

 const home = data?.contentfulHome;
const image = home?.homeImage ? getImage(home.homeImage) : null;

  return (
    <Layout>
      <section className="home">
        <div className="home-content">
          <h1 className="home-title">{home.title}</h1>

          {home.presentationText && (
            <div className="home-text">{renderRichText(home.presentationText)}</div>
          )}

          <Link to="/portfolio" className="home-link">
            Min Portfolio →
          </Link>
        </div>

        {image && (
          <div className="home-image">
            <GatsbyImage image={image} alt={home.homeImage?.description || home.title} />
          </div>
        )}
      </section>
    </Layout>
  );
};

export const Head = () => <title>Hem</title>;
export default IndexPage;
