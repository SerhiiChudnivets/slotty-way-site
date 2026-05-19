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
  .minimal-template {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background: #fff;
    color: #111;
    min-height: 100vh;
  }

  .minimal-header {
    padding: 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1000px;
    margin: 0 auto;
  }

  .minimal-logo {
    font-size: 1rem;
    font-weight: 600;
    color: #111;
    text-decoration: none;
    letter-spacing: -0.02em;
  }

  .minimal-nav {
    display: flex;
    gap: 2rem;
  }

  .minimal-nav a {
    color: #666;
    text-decoration: none;
    font-size: 0.875rem;
    transition: color 0.2s;
  }

  .minimal-nav a:hover {
    color: #111;
  }

  .minimal-main {
    max-width: 680px;
    margin: 0 auto;
    padding: 4rem 2rem 6rem;
  }

  .minimal-title {
    font-size: 2.5rem;
    font-weight: 600;
    line-height: 1.2;
    margin-bottom: 1rem;
    letter-spacing: -0.03em;
  }

  .minimal-subtitle {
    font-size: 1.125rem;
    color: #666;
    margin-bottom: 3rem;
    line-height: 1.6;
  }

  .minimal-content {
    font-size: 1.0625rem;
    line-height: 1.75;
    color: #333;
  }

  .minimal-content h2 {
    font-size: 1.5rem;
    font-weight: 600;
    margin: 3rem 0 1rem;
    letter-spacing: -0.02em;
  }

  .minimal-content h3 {
    font-size: 1.25rem;
    font-weight: 600;
    margin: 2.5rem 0 0.75rem;
  }

  .minimal-content p {
    margin-bottom: 1.5rem;
  }

  .minimal-content a {
    color: #111;
    text-decoration: underline;
    text-underline-offset: 2px;
  }

  .minimal-content blockquote {
    border-left: 2px solid #ddd;
    padding-left: 1.25rem;
    margin: 2rem 0;
    color: #555;
    font-style: italic;
  }

  .minimal-content ul, .minimal-content ol {
    margin: 1.5rem 0;
    padding-left: 1.25rem;
  }

  .minimal-content li {
    margin-bottom: 0.5rem;
  }

  .minimal-content img {
    max-width: 100%;
    margin: 2rem 0;
  }

  .minimal-image {
    margin: 3rem 0;
  }

  .minimal-image img {
    width: 100%;
  }

  .minimal-section {
    margin: 4rem 0;
    padding-top: 2rem;
    border-top: 1px solid #eee;
  }

  .minimal-section h2 {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 1rem;
    letter-spacing: -0.02em;
  }

  .minimal-section-text {
    color: #444;
    line-height: 1.75;
  }

  .minimal-section img {
    width: 100%;
    margin-top: 1.5rem;
  }

  .minimal-link {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    color: #111;
    text-decoration: none;
    font-weight: 500;
    margin-top: 1.5rem;
    transition: gap 0.2s;
  }

  .minimal-link:hover {
    gap: 0.75rem;
  }

  .minimal-link::after {
    content: '→';
  }

  .minimal-footer {
    border-top: 1px solid #eee;
    padding: 2rem;
    text-align: center;
    color: #999;
    font-size: 0.875rem;
  }

  .minimal-faq {
    margin-top: 4rem;
    padding-top: 2rem;
    border-top: 1px solid #eee;
  }

  .minimal-faq h2 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 2rem;
    letter-spacing: -0.02em;
  }

  .minimal-faq-item {
    padding: 1.25rem 0;
    border-bottom: 1px solid #f0f0f0;
  }

  .minimal-faq-question {
    font-weight: 600;
    color: #111;
    margin-bottom: 0.5rem;
  }

  .minimal-faq-answer {
    color: #555;
    line-height: 1.75;
  }

  @media (max-width: 768px) {
    .minimal-title { font-size: 1.75rem; }
    .minimal-main { padding: 2rem 1.5rem 4rem; }
    .minimal-nav { gap: 1rem; }
  }
`

export default function MinimalTemplate({ page, site }: { page: PageData; site: SiteData }) {
  const siteName = site.site_name || site.name

  return (
    <div className="minimal-template">
      <style dangerouslySetInnerHTML={{ __html: styles }} />

      <header className="minimal-header">
        <a href="/" className="minimal-logo">
          {site.logo?.url ? <img src={site.logo.url} alt={siteName} style={{height: '24px'}} /> : siteName}
        </a>
        <nav className="minimal-nav">
          {site.pages?.map((p, i) => (
            <a key={i} href={`/${p.slug}`}>{p.title}</a>
          ))}
        </nav>
      </header>

      <main className="minimal-main">
        <h1 className="minimal-title">{page.hero_title || page.title}</h1>
        {page.hero_subtitle && <p className="minimal-subtitle">{page.hero_subtitle}</p>}

        {page.hero_image?.url && (
          <div className="minimal-image">
            <img src={page.hero_image.url} alt={page.title} />
          </div>
        )}

        {page.content && (
          <div className="minimal-content" dangerouslySetInnerHTML={{ __html: page.content }} />
        )}

        {page.sections?.map((section, index) => (
          <div key={section.id || index} className="minimal-section">
            {section.heading && <h2>{section.heading}</h2>}
            {section.text && <div className="minimal-section-text" dangerouslySetInnerHTML={{ __html: section.text }} />}
            {section.image?.url && <img src={section.image.url} alt={section.heading || ''} />}
            {section.cta_text && section.cta_link && (
              <a href={section.cta_link} className="minimal-link">{section.cta_text}</a>
            )}
          </div>
        ))}

        {page.cta_text && page.cta_link && (
          <div style={{marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid #eee'}}>
            <a href={page.cta_link} className="minimal-link">{page.cta_text}</a>
          </div>
        )}
        {page.FAQ && page.FAQ.length > 0 && (
          <div className="minimal-faq">
            {page.faq_title && <h2>{page.faq_title}</h2>}
            {page.FAQ.map((item, index) => (
              <div key={item.id || index} className="minimal-faq-item">
                <div className="minimal-faq-question">{item.question}</div>
                <div className="minimal-faq-answer">{item.answer}</div>
              </div>
            ))}
          </div>
        )}
      </main>

      <footer className="minimal-footer">
        {site.footer_text || `© ${new Date().getFullYear()} ${siteName}`}
      </footer>
    </div>
  )
}
