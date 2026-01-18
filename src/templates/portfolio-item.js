import * as React from "react";
import Layout from "../components/layout";
import { graphql, Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { renderRichText } from "gatsby-source-contentful/rich-text";

const PortfolioItemPage = ({ data }) => {
  const item = data.contentfulPortfolioItem;
  const image = getImage(item.image);

  return (
    <Layout>
      <section className="portfolioItem">
        <div className="portfolioItem-top">
          <Link to="/portfolio" className="portfolioItem-back">
            ← Tillbaka till Portfolio
          </Link>

          <h1 className="portfolioItem-title">{item.title}</h1>

          <p className="portfolioItem-meta">
            <span className="portfolioItem-pill">Slug</span> {item.slug}
          </p>
        </div>

        <div className="portfolioItem-grid">
          <div className="portfolioItem-content">
            {item.description?.raw && (
              <div className="portfolioItem-text">
                {renderRichText(item.description)}
              </div>
            )}

            <div className="portfolioItem-actions">
              {item.projectUrl && (
                <a
                  href={item.projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="portfolioItem-btn"
                >
                  View project →
                </a>
              )}
            </div>
          </div>

          {image && (
            <div className="portfolioItem-image">
              <GatsbyImage
                image={image}
                alt={item.image?.description || item.title}
              />
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export const query = graphql`
  query ($slug: String!) {
    contentfulPortfolioItem(slug: { eq: $slug }) {
      title
      slug
      projectUrl
      description {
        raw
      }
      image {
        description
        gatsbyImageData(layout: CONSTRAINED, width: 700, placeholder: BLURRED)
      }
    }
  }
`;

export const Head = ({ data }) => (
  <title>{data.contentfulPortfolioItem.title}</title>
);

export default PortfolioItemPage;
