import React from 'react'

interface MediaFile {
  id?: number
  name?: string
  url?: string
}

interface ContentSection {
  id?: number
  heading?: string
  text?: string
  image?: MediaFile
  cta_text?: string
  cta_link?: string
  layout?: string
}

interface PageData {
  title: string
  slug: string
  content?: string
  seo_title?: string
  seo_description?: string
  html_head?: string
  hero_title?: string
  hero_subtitle?: string
  hero_badge?: string
  hero_image?: MediaFile
  cta_text?: string
  cta_link?: string
  sections?: ContentSection[]
  template?: string
  faq_title?: string
  FAQ?: { id?: number; question: string; answer: string }[]
}

interface SiteData {
  name: string
  url: string
  site_name?: string
  accent_color?: string
  footer_text?: string
  allow_indexing?: boolean
  logo?: MediaFile
  login_text?: string
  register_text?: string
  redirect_link?: string
  pages?: PageData[]
  header_menu?: any[]
  footer_menu?: any[]
}

const styles = `
  .blog-template {
    font-family: 'Georgia', 'Times New Roman', serif;
    background: #fafafa;
    color: #333;
    min-height: 100vh;
  }

  .blog-header {
    background: #fff;
    border-bottom: 1px solid #eee;
    padding: 1rem 0;
    position: sticky;
    top: 0;
    z-index: 100;
  }

  .blog-header-inner {
    max-width: 700px;
    margin: 0 auto;
    padding: 0 1.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .blog-logo {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 1.25rem;
    font-weight: 700;
    color: #1a1a1a;
    text-decoration: none;
  }

  .blog-nav {
    display: flex;
    gap: 1.5rem;
  }

  .blog-nav a {
    color: #666;
    text-decoration: none;
    font-size: 0.9rem;
    transition: color 0.3s;
  }

  .blog-nav a:hover {
    color: #1a1a1a;
  }

  .blog-article {
    max-width: 700px;
    margin: 0 auto;
    padding: 3rem 1.5rem;
  }

  .blog-article-header {
    margin-bottom: 3rem;
    padding-bottom: 2rem;
    border-bottom: 1px solid #eee;
  }

  .blog-category {
    display: inline-block;
    background: #f0f0f0;
    color: #666;
    padding: 0.25rem 0.75rem;
    border-radius: 4px;
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 1rem;
  }

  .blog-article h1 {
    font-size: 2.5rem;
    line-height: 1.2;
    color: #1a1a1a;
    margin-bottom: 1rem;
    font-weight: 400;
  }

  .blog-subtitle {
    font-size: 1.25rem;
    color: #666;
    line-height: 1.6;
    font-style: italic;
  }

  .blog-hero-image {
    width: 100%;
    margin: 2rem 0;
    border-radius: 8px;
  }

  .blog-content {
    font-size: 1.125rem;
    line-height: 1.9;
    color: #444;
  }

  .blog-content h2 {
    font-size: 1.75rem;
    color: #1a1a1a;
    margin: 3rem 0 1.5rem;
    font-weight: 400;
  }

  .blog-content h3 {
    font-size: 1.375rem;
    color: #1a1a1a;
    margin: 2.5rem 0 1rem;
    font-weight: 600;
  }

  .blog-content p {
    margin-bottom: 1.75rem;
  }

  .blog-content a {
    color: #0066cc;
    text-decoration: underline;
  }

  .blog-content blockquote {
    border-left: 3px solid #ddd;
    padding-left: 1.5rem;
    margin: 2rem 0;
    font-style: italic;
    color: #666;
  }

  .blog-content ul, .blog-content ol {
    margin: 1.5rem 0;
    padding-left: 1.5rem;
  }

  .blog-content li {
    margin-bottom: 0.75rem;
  }

  .blog-content img {
    max-width: 100%;
    border-radius: 8px;
    margin: 2rem 0;
  }

  .blog-section {
    margin: 3rem 0;
    padding: 2rem;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  }

  .blog-section h2 {
    font-size: 1.5rem;
    color: #1a1a1a;
    margin-bottom: 1rem;
    font-weight: 600;
    font-family: 'Space Grotesk', sans-serif;
  }

  .blog-section-content {
    color: #555;
    line-height: 1.8;
  }

  .blog-section img {
    width: 100%;
    border-radius: 8px;
    margin-top: 1.5rem;
  }

  .blog-cta {
    display: inline-block;
    background: #1a1a1a;
    color: #fff;
    padding: 0.75rem 1.5rem;
    border-radius: 6px;
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.9rem;
    text-decoration: none;
    margin-top: 1rem;
    transition: background 0.3s;
  }

  .blog-cta:hover {
    background: #333;
  }

  .blog-footer {
    background: #fff;
    border-top: 1px solid #eee;
    padding: 2rem;
    text-align: center;
    color: #999;
    font-size: 0.875rem;
    font-family: 'Space Grotesk', sans-serif;
  }

  .blog-faq {
    margin: 3rem 0;
  }

  .blog-faq h2 {
    font-size: 1.75rem;
    color: #1a1a1a;
    margin-bottom: 1.5rem;
    font-family: 'Space Grotesk', sans-serif;
  }

  .blog-faq-item {
    padding: 1.5rem 0;
    border-bottom: 1px solid #eee;
  }

  .blog-faq-question {
    font-size: 1.125rem;
    font-weight: 600;
    color: #1a1a1a;
    margin-bottom: 0.5rem;
    font-family: 'Space Grotesk', sans-serif;
  }

  .blog-faq-answer {
    color: #555;
    line-height: 1.7;
  }

  @media (max-width: 768px) {
    .blog-article h1 { font-size: 1.75rem; }
    .blog-content { font-size: 1rem; }
    .blog-nav { display: none; }
  }
`

export default function BlogTemplate({ page, site }: { page: PageData; site: SiteData }) {
  const siteName = site.site_name || site.name

  return (
    <div className="blog-template">
      <style dangerouslySetInnerHTML={{ __html: styles }} />

      <header className="blog-header">
        <div className="blog-header-inner">
          <a href="/" className="blog-logo">
            {site.logo?.url ? <img src={site.logo.url} alt={siteName} style={{height: '32px'}} /> : siteName}
          </a>
          <nav className="blog-nav">
            <a href="/">Home</a>
            {site.pages?.map((p, i) => (
              <a key={i} href={`/${p.slug}`}>{p.title}</a>
            ))}
          </nav>
        </div>
      </header>

      <article className="blog-article">
        <header className="blog-article-header">
          {page.hero_badge && <span className="blog-category">{page.hero_badge}</span>}
          <h1>{page.hero_title || page.title}</h1>
          {page.hero_subtitle && <p className="blog-subtitle">{page.hero_subtitle}</p>}
        </header>

        {page.hero_image?.url && (
          <img src={page.hero_image.url} alt={page.title} className="blog-hero-image" />
        )}

        {page.content && (
          <div className="blog-content" dangerouslySetInnerHTML={{ __html: page.content }} />
        )}

        {page.sections?.map((section, index) => (
          <div key={section.id || index} className="blog-section">
            {section.heading && <h2>{section.heading}</h2>}
            {section.text && <div className="blog-section-content" dangerouslySetInnerHTML={{ __html: section.text }} />}
            {section.image?.url && <img src={section.image.url} alt={section.heading || ''} />}
            {section.cta_text && section.cta_link && (
              <a href={section.cta_link} className="blog-cta">{section.cta_text}</a>
            )}
          </div>
        ))}

        {page.cta_text && page.cta_link && (
          <div style={{textAlign: 'center', marginTop: '3rem'}}>
            <a href={page.cta_link} className="blog-cta">{page.cta_text}</a>
          </div>
        )}
        {page.FAQ && page.FAQ.length > 0 && (
          <div className="blog-faq">
            {page.faq_title && <h2>{page.faq_title}</h2>}
            {page.FAQ.map((item, index) => (
              <div key={item.id || index} className="blog-faq-item">
                <div className="blog-faq-question">{item.question}</div>
                <div className="blog-faq-answer">{item.answer}</div>
              </div>
            ))}
          </div>
        )}
      </article>

      <footer className="blog-footer">
        {site.footer_text || `© ${new Date().getFullYear()} ${siteName}`}
      </footer>
    </div>
  )
}
