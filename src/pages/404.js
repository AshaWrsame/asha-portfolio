import * as React from "react";
import { Link } from "gatsby";
import Layout from "../components/layout";

const NotFoundPage = () => {
  return (
    <Layout>
      <section className="notfound">
        <h1>404</h1>
        <p>Sidan du försöker nå finns inte.</p>

        <Link to="/" className="notfound-link">
          ← Tillbaka till startsidan
        </Link>
      </section>
    </Layout>
  );
};

export const Head = () => <title>404 – Sidan hittades inte</title>;

export default NotFoundPage;
