/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { Helmet } from "react-helmet-async";

const SEO = ({ title, description, image, article = true, publishDate, modifiedDate, author, tags, section, readTime }) => {
  const siteUrl = "https://handraputratama.xyz";
  const siteName = "Yuunagi Blog";
  const defaultImage = `${siteUrl}/default-og-image.jpg`;
  const twitterHandle = "@yourtwitterhandle";

  // Calculate reading time if not provided
  const getReadingTime = (content) => {
    const wordsPerMinute = 200;
    const words = content?.split(/\s+/)?.length || 0;
    return Math.ceil(words / wordsPerMinute);
  };

  const actualReadTime = readTime || getReadingTime(description);

  const schemaOrgJSONLD = {
    "@context": "http://schema.org",
    "@type": article ? "BlogPosting" : "WebSite",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteUrl}${window.location.pathname}`,
    },
    headline: title,
    description: description,
    image: {
      "@type": "ImageObject",
      url: image || defaultImage,
    },
    datePublished: publishDate,
    dateModified: modifiedDate || publishDate,
    author: {
      "@type": "Person",
      name: author,
      url: `${siteUrl}/about`,
    },
    publisher: {
      "@type": "Organization",
      name: siteName,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/logo.png`,
      },
    },
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{`${title} | ${siteName}`}</title>
      <meta name="description" content={description} />
      <meta name="robots" content="index, follow" />
      <meta name="author" content={author} />
      <link rel="canonical" href={`${siteUrl}${window.location.pathname}`} />
      {tags && <meta name="keywords" content={tags.join(", ")} />}

      {/* Open Graph Tags */}
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:type" content={article ? "article" : "website"} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={`${siteUrl}${window.location.pathname}`} />
      <meta property="og:image" content={image || defaultImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      {article && (
        <>
          <meta property="article:published_time" content={publishDate} />
          <meta property="article:modified_time" content={modifiedDate || publishDate} />
          <meta property="article:author" content={author} />
          <meta property="article:section" content={section || "Technology"} />
          {tags && tags.map((tag) => <meta property="article:tag" content={tag} key={tag} />)}
        </>
      )}

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={twitterHandle} />
      <meta name="twitter:site" content={twitterHandle} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image || defaultImage} />
      <meta name="twitter:label1" content="Reading time" />
      <meta name="twitter:data1" content={`${actualReadTime} min read`} />

      {/* Schema.org JSON-LD */}
      <script type="application/ld+json">{JSON.stringify(schemaOrgJSONLD)}</script>
    </Helmet>
  );
};

export default SEO;
