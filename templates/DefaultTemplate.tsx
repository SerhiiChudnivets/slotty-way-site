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
  .default-template {
    font-family: 'Space Grotesk', -apple-system, BlinkMacSystemFont, sans-serif;
    background: #1a1a2e;
    color: #f5f5f5;
    min-height: 100vh;
  }

  .default-header {
    background: rgba(26, 26, 46, 0.95);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid #2a2a4a;
    padding: 1rem 0;
    position: sticky;
    top: 0;
    z-index: 100;
  }

  .default-header-inner {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .default-logo {
    font-size: 1.5rem;
    font-weight: 700;
    color: #ffd700;
    text-decoration: none;
  }

  .default-nav {
    display: flex;
    gap: 1.5rem;
  }

  .default-nav a {
    color: #a0a0a0;
    text-decoration: none;
    transition: color 0.3s;
  }

  .default-nav a:hover {
    color: #ffd700;
  }

  .default-hero {
    padding: 4rem 1rem;
    text-align: center;
    background: linear-gradient(180deg, #2a2a4a 0%, #1a1a2e 100%);
    position: relative;
  }

  .default-hero-bg {
    position: absolute;
    inset: 0;
    background-size: cover;
    background-position: center;
    opacity: 0.2;
  }

  .default-hero-content {
    position: relative;
    max-width: 800px;
    margin: 0 auto;
  }

  .default-hero h1 {
    font-size: 3rem;
    color: #ffd700;
    margin-bottom: 1rem;
  }

  .default-hero p {
    font-size: 1.25rem;
    color: #a0a0a0;
    margin-bottom: 2rem;
  }

  .default-btn {
    display: inline-block;
    background: #ffd700;
    color: #1a1a2e;
    padding: 0.75rem 2rem;
    border-radius: 8px;
    font-weight: 600;
    text-decoration: none;
    transition: transform 0.3s, opacity 0.3s;
  }

  .default-btn:hover {
    transform: translateY(-2px);
    opacity: 0.9;
  }

  .default-content {
    max-width: 900px;
    margin: 0 auto;
    padding: 3rem 1rem;
  }

  .default-content h1, .default-content h2, .default-content h3 {
    color: #ffd700;
    margin: 2rem 0 1rem;
  }

  .default-content p {
    color: #c0c0c0;
    line-height: 1.8;
    margin-bottom: 1.5rem;
  }

  .default-content a {
    color: #ffd700;
  }

  .default-section {
    padding: 3rem 1rem;
    max-width: 1200px;
    margin: 0 auto;
  }

  .default-section-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
    align-items: center;
  }

  .default-section-grid.reverse {
    direction: rtl;
  }

  .default-section-grid.reverse > * {
    direction: ltr;
  }

  .default-section h2 {
    font-size: 2rem;
    color: #ffd700;
    margin-bottom: 1rem;
  }

  .default-section p {
    color: #a0a0a0;
    line-height: 1.8;
  }

  .default-section img {
    width: 100%;
    border-radius: 12px;
    box-shadow: 0 10px 40px rgba(0,0,0,0.3);
  }

  .default-footer {
    background: #0f0f1a;
    border-top: 1px solid #2a2a4a;
    padding: 2rem 1rem;
    text-align: center;
    color: #606060;
  }

  .default-faq {
    max-width: 900px;
    margin: 0 auto;
    padding: 3rem 1rem;
  }

  .default-faq h2 {
    font-size: 2rem;
    color: #ffd700;
    margin-bottom: 2rem;
    text-align: center;
  }

  .default-faq-item {
    background: #1e1e3a;
    border: 1px solid #2a2a4a;
    border-radius: 8px;
    margin-bottom: 1rem;
    padding: 1.25rem 1.5rem;
  }

  .default-faq-question {
    font-size: 1.125rem;
    font-weight: 600;
    color: #ffd700;
    margin-bottom: 0.75rem;
  }

  .default-faq-answer {
    color: #a0a0a0;
    line-height: 1.7;
  }

  @media (max-width: 768px) {
    .default-hero h1 { font-size: 2rem; }
    .default-section-grid { grid-template-columns: 1fr; }
    .default-nav { display: none; }
  }
`

export default function DefaultTemplate({ page, site }: { page: PageData; site: SiteData }) {
  const siteName = site.site_name || site.name

  return (
    <div className="default-template">
      <style dangerouslySetInnerHTML={{ __html: styles }} />

      <header className="default-header">
        <div className="default-header-inner">
          <a href="/" className="default-logo">
            {site.logo?.url ? <img src={site.logo.url} alt={siteName} style={{height: '40px'}} /> : siteName}
          </a>
          <nav className="default-nav">
            <a href="/">Home</a>
            {site.pages?.map((p, i) => (
              <a key={i} href={`/${p.slug}`}>{p.title}</a>
            ))}
          </nav>
        </div>
      </header>

      <section className="default-hero">
        {page.hero_image?.url && (
          <div className="default-hero-bg" style={{ backgroundImage: `url(${page.hero_image.url})` }} />
        )}
        <div className="default-hero-content">
          {page.hero_badge && <span style={{background: 'rgba(255,215,0,0.2)', color: '#ffd700', padding: '0.25rem 1rem', borderRadius: '20px', fontSize: '0.875rem'}}>{page.hero_badge}</span>}
          <h1>{page.hero_title || page.title}</h1>
          {page.hero_subtitle && <p>{page.hero_subtitle}</p>}
          {page.cta_text && page.cta_link && (
            <a href={page.cta_link} className="default-btn">{page.cta_text}</a>
          )}
        </div>
      </section>

      {page.content && (
        <div className="default-content" dangerouslySetInnerHTML={{ __html: page.content }} />
      )}

      {page.sections?.map((section, index) => (
        <section key={section.id || index} className="default-section">
          <div className={`default-section-grid ${section.layout === 'text-right' ? 'reverse' : ''}`}>
            <div>
              {section.heading && <h2>{section.heading}</h2>}
              {section.text && <div dangerouslySetInnerHTML={{ __html: section.text }} />}
              {section.cta_text && section.cta_link && (
                <a href={section.cta_link} className="default-btn" style={{marginTop: '1rem'}}>{section.cta_text}</a>
              )}
            </div>
            {section.image?.url && (
              <div>
                <img src={section.image.url} alt={section.heading || ''} />
              </div>
            )}
          </div>
        </section>
      ))}

      {page.FAQ && page.FAQ.length > 0 && (
        <div className="default-faq">
          {page.faq_title && <h2>{page.faq_title}</h2>}
          {page.FAQ.map((item, index) => (
            <div key={item.id || index} className="default-faq-item">
              <div className="default-faq-question">{item.question}</div>
              <div className="default-faq-answer">{item.answer}</div>
            </div>
          ))}
        </div>
      )}

      <footer className="default-footer">
        {site.footer_text || `© ${new Date().getFullYear()} ${siteName}. All rights reserved.`}
      </footer>
    </div>
  )
}
