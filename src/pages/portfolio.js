import * as React from "react";
import Layout from "../components/layout";
import { Link, graphql, useStaticQuery } from "gatsby";
import { StaticImage, GatsbyImage, getImage } from "gatsby-plugin-image";
import { renderRichText } from "gatsby-source-contentful/rich-text";

const PortfolioPage = () => {
  const data = useStaticQuery(graphql`
    query PortfolioListQuery {
      allContentfulPortfolioItem(sort: { title: ASC }) {
        nodes {
          slug
          title
          projectUrl
          description {
            raw
          }
          image {
            description
            gatsbyImageData(
              layout: CONSTRAINED
              width: 600
              placeholder: BLURRED
            )
          }
        }
      }
    }
  `);

  const items = data.allContentfulPortfolioItem.nodes;
  const [search, setSearch] = React.useState("");

  const filteredItems = React.useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return items;

    return items.filter((item) => {
      const title = (item.title || "").toLowerCase();
      const slug = (item.slug || "").toLowerCase();
      return title.includes(q) || slug.includes(q);
    });
  }, [search, items]);

  return (
    <Layout>
      <section className="portfolio">
        <div className="portfolio-header">
          <div>
            <h1 className="portfolio-title">Min Portfolio</h1>
            <p className="portfolio-subtitle">
              Här hittar du ett urval av projekt. Sök eller klicka för att läsa mer.
            </p>

            <Link to="/" className="portfolio-back">
              ← Tillbaka till Hem
            </Link>
          </div>

          <div className="portfolio-heroimage">
            <StaticImage
              src="../images/portfolioimage.png"
              alt="Portfolio"
              placeholder="blurred"
              layout="constrained"
              width={900}
            />
          </div>
        </div>

        <div className="portfolio-controls">
          <label className="portfolio-label" htmlFor="portfolioSearch">
            Sök
          </label>
          <input
            id="portfolioSearch"
            type="text"
            placeholder="Sök portfolio..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="portfolio-input"
          />
          {search.trim() && (
            <button
              type="button"
              className="portfolio-clear"
              onClick={() => setSearch("")}
            >
              Rensa
            </button>
          )}
        </div>

        <div className="portfolio-grid">
          {filteredItems.map((item) => {
            const img = getImage(item.image);

            return (
              <article key={item.slug} className="portfolio-card">
                <Link to={`/portfolio/${item.slug}`} className="portfolio-cardlink">
                  {img && (
                    <GatsbyImage
                      image={img}
                      alt={item.image?.description || item.title}
                      className="portfolio-cardimage"
                    />
                  )}

                  <h2 className="portfolio-cardtitle">{item.title}</h2>

                  {item.description?.raw && (
                    <div className="portfolio-carddesc">
                      {renderRichText(item.description)}
                    </div>
                  )}

                  <span className="portfolio-cardcta">Visa projekt →</span>
                </Link>

                {item.projectUrl && (
                  <a
                    href={item.projectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="portfolio-cardexternallink"
                  >
                      Besök projekt

                  </a>
                )}
              </article>
            );
          })}
        </div>

        {filteredItems.length === 0 && (
          <p className="portfolio-empty">Inga träffar på “{search}”.</p>
        )}
      </section>
    </Layout>
  );
};

export const Head = () => <title>Portfolio</title>;
export default PortfolioPage;
