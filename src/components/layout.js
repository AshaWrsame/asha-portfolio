import * as React from "react";
import { Link, graphql, useStaticQuery } from "gatsby";
import * as styles from "../styles/layout.module.css";

const Layout = ({ children }) => {
  const [menuOpen, setMenuOpen] = React.useState(false);

  const data = useStaticQuery(graphql`
    query {
      allContentfulMenuItems(sort: { fields: order, order: ASC }) {
        nodes {
          lable
          order
          page {
            slug
          }
        }
      }
    }
  `);

  const menuItems = data.allContentfulMenuItems.nodes;

  return (
    <div className={styles.container}>
      <header className={styles.navbar}>
        <div className={styles.navInner}>

          <button
            className={styles.hamburger}
            onClick={() => setMenuOpen((open) => !open)}
            aria-label="Toggle navigation"
          >
            <span className={styles.bar} />
            <span className={styles.bar} />
            <span className={styles.bar} />
          </button>

          <ul
            className={`${styles.navList} ${
              menuOpen ? styles.navListOpen : ""
            }`}
          >
            {menuItems.map((item) => {
              const slug = item.page?.slug || "";

              const to =
                slug === "" || slug === "/" || slug === "home"
                  ? "/"
                  : `/${slug}`;

              return (
                <li key={item.order}>
                  <Link
                    to={to}
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.lable}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </header>

      <main>{children}</main>

      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <p>© {new Date().getFullYear()} · Min Portfolio</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
