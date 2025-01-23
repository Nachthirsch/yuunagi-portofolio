/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { Helmet } from "react-helmet-async";

const SEO = ({ title, description, image, article = true }) => {
  const siteUrl = "https://handraputratama.xyz/"; // Update with your domain

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />

      {/* Open Graph Tags */}
      <meta property="og:type" content={article ? "article" : "website"} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={siteUrl} />
      {image && <meta property="og:image" content={image} />}

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={image} />}
    </Helmet>
  );
};

export default SEO;
