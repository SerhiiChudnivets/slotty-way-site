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
  .fullwidth-template {
    font-family: 'Space Grotesk', -apple-system, BlinkMacSystemFont, sans-serif;
    background: #0a0a0a;
    color: #fff;
    min-height: 100vh;
  }

  .fullwidth-header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    padding: 1.5rem 3rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 100;
    background: rgba(10, 10, 10, 0.9);
    backdrop-filter: blur(20px);
  }

  .fullwidth-logo {
    font-size: 1.25rem;
    font-weight: 700;
    color: #fff;
    text-decoration: none;
  }

  .fullwidth-nav {
    display: flex;
    gap: 2.5rem;
    align-items: center;
  }

  .fullwidth-nav a {
    color: rgba(255,255,255,0.7);
    text-decoration: none;
    font-size: 0.9rem;
    font-weight: 500;
    transition: color 0.3s;
  }

  .fullwidth-nav a:hover {
    color: #fff;
  }

  .fullwidth-hero {
    min-height: 100vh;
    display: flex;
    align-items: center;
    position: relative;
    overflow: hidden;
  }

  .fullwidth-hero-bg {
    position: absolute;
    inset: 0;
    background-size: cover;
    background-position: center;
  }

  .fullwidth-hero-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.7) 50%, rgba(10,10,10,0.3) 100%);
  }

  .fullwidth-hero-content {
    position: relative;
    padding: 0 3rem;
    max-width: 50%;
  }

  .fullwidth-badge {
    display: inline-block;
    background: linear-gradient(135deg, #ff6b6b, #ff8e53);
    color: #fff;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-bottom: 1.5rem;
  }

  .fullwidth-hero h1 {
    font-size: 4.5rem;
    font-weight: 700;
    line-height: 1.05;
    margin-bottom: 1.5rem;
    letter-spacing: -0.03em;
  }

  .fullwidth-hero p {
    font-size: 1.25rem;
    color: rgba(255,255,255,0.7);
    line-height: 1.7;
    margin-bottom: 2.5rem;
    max-width: 500px;
  }

  .fullwidth-btn {
    display: inline-block;
    background: #fff;
    color: #0a0a0a;
    padding: 1rem 2.5rem;
    font-size: 1rem;
    font-weight: 600;
    text-decoration: none;
    transition: transform 0.3s, box-shadow 0.3s;
  }

  .fullwidth-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(255,255,255,0.2);
  }

  .fullwidth-btn-outline {
    background: transparent;
    border: 1px solid rgba(255,255,255,0.3);
    color: #fff;
    margin-left: 1rem;
  }

  .fullwidth-btn-outline:hover {
    background: rgba(255,255,255,0.1);
    box-shadow: none;
  }

  .fullwidth-section {
    min-height: 100vh;
    display: flex;
    position: relative;
  }

  .fullwidth-section:nth-child(even) {
    flex-direction: row-reverse;
  }

  .fullwidth-section-image {
    width: 50%;
    background-size: cover;
    background-position: center;
  }

  .fullwidth-section-content {
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 4rem 5rem;
    background: #0a0a0a;
  }

  .fullwidth-section:nth-child(even) .fullwidth-section-content {
    background: #111;
  }

  .fullwidth-section h2 {
    font-size: 3rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    letter-spacing: -0.02em;
  }

  .fullwidth-section-text {
    font-size: 1.125rem;
    color: rgba(255,255,255,0.7);
    line-height: 1.8;
  }

  .fullwidth-section .fullwidth-btn {
    margin-top: 2.5rem;
    align-self: flex-start;
  }

  .fullwidth-content-section {
    padding: 6rem 3rem;
    max-width: 900px;
    margin: 0 auto;
  }

  .fullwidth-content-section h2 {
    font-size: 2rem;
    margin-bottom: 1.5rem;
  }

  .fullwidth-content {
    font-size: 1.125rem;
    line-height: 1.9;
    color: rgba(255,255,255,0.8);
  }

  .fullwidth-content h2, .fullwidth-content h3 {
    color: #fff;
    margin: 2.5rem 0 1rem;
  }

  .fullwidth-content p {
    margin-bottom: 1.5rem;
  }

  .fullwidth-content a {
    color: #ff8e53;
  }

  .fullwidth-footer {
    background: #050505;
    padding: 4rem 3rem;
    text-align: center;
  }

  .fullwidth-footer-text {
    color: rgba(255,255,255,0.4);
    font-size: 0.875rem;
  }

  .fullwidth-faq {
    padding: 6rem 3rem;
    background: #111;
  }

  .fullwidth-faq-inner {
    max-width: 900px;
    margin: 0 auto;
  }

  .fullwidth-faq h2 {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 3rem;
    text-align: center;
  }

  .fullwidth-faq-item {
    background: #1a1a1a;
    border: 1px solid #222;
    padding: 1.5rem 2rem;
    margin-bottom: 1rem;
  }

  .fullwidth-faq-question {
    font-size: 1.125rem;
    font-weight: 600;
    color: #fff;
    margin-bottom: 0.75rem;
  }

  .fullwidth-faq-answer {
    color: rgba(255,255,255,0.6);
    line-height: 1.7;
  }

  @media (max-width: 1024px) {
    .fullwidth-hero h1 { font-size: 3rem; }
    .fullwidth-hero-content { max-width: 70%; }
    .fullwidth-section { flex-direction: column !important; min-height: auto; }
    .fullwidth-section-image { width: 100%; height: 50vh; }
    .fullwidth-section-content { width: 100%; padding: 3rem 2rem; }
    .fullwidth-section h2 { font-size: 2rem; }
  }

  @media (max-width: 768px) {
    .fullwidth-hero h1 { font-size: 2.25rem; }
    .fullwidth-hero-content { max-width: 100%; padding: 0 1.5rem; }
    .fullwidth-nav { display: none; }
    .fullwidth-header { padding: 1rem 1.5rem; }
    .fullwidth-btn-outline { margin-left: 0; margin-top: 1rem; display: block; }
  }
`

export default function FullWidthTemplate({ page, site }: { page: PageData; site: SiteData }) {
  const siteName = site.site_name || site.name

  return (
    <div className="fullwidth-template">
      <style dangerouslySetInnerHTML={{ __html: styles }} />

      <header className="fullwidth-header">
        <a href="/" className="fullwidth-logo">
          {site.logo?.url ? <img src={site.logo.url} alt={siteName} style={{height: '36px'}} /> : siteName}
        </a>
        <nav className="fullwidth-nav">
          <a href="/">Home</a>
          {site.pages?.map((p, i) => (
            <a key={i} href={`/${p.slug}`}>{p.title}</a>
          ))}
          {site.redirect_link && (
            <a href={site.redirect_link} className="fullwidth-btn" style={{padding: '0.6rem 1.5rem', fontSize: '0.85rem'}}>
              {site.register_text || 'Sign Up'}
            </a>
          )}
        </nav>
      </header>

      <section className="fullwidth-hero">
        {page.hero_image?.url && (
          <div className="fullwidth-hero-bg" style={{ backgroundImage: `url(${page.hero_image.url})` }} />
        )}
        <div className="fullwidth-hero-overlay" />
        <div className="fullwidth-hero-content">
          {page.hero_badge && <span className="fullwidth-badge">{page.hero_badge}</span>}
          <h1>{page.hero_title || page.title}</h1>
          {page.hero_subtitle && <p>{page.hero_subtitle}</p>}
          <div>
            {page.cta_text && page.cta_link && (
              <a href={page.cta_link} className="fullwidth-btn">{page.cta_text}</a>
            )}
            {site.login_text && site.redirect_link && (
              <a href={site.redirect_link} className="fullwidth-btn fullwidth-btn-outline">{site.login_text}</a>
            )}
          </div>
        </div>
      </section>

      {page.content && (
        <div className="fullwidth-content-section">
          <div className="fullwidth-content" dangerouslySetInnerHTML={{ __html: page.content }} />
        </div>
      )}

      {page.sections?.map((section, index) => (
        <section key={section.id || index} className="fullwidth-section">
          {section.image?.url ? (
            <div className="fullwidth-section-image" style={{ backgroundImage: `url(${section.image.url})` }} />
          ) : (
            <div className="fullwidth-section-image" style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)' }} />
          )}
          <div className="fullwidth-section-content">
            {section.heading && <h2>{section.heading}</h2>}
            {section.text && <div className="fullwidth-section-text" dangerouslySetInnerHTML={{ __html: section.text }} />}
            {section.cta_text && section.cta_link && (
              <a href={section.cta_link} className="fullwidth-btn">{section.cta_text}</a>
            )}
          </div>
        </section>
      ))}

      {page.FAQ && page.FAQ.length > 0 && (
        <section className="fullwidth-faq">
          <div className="fullwidth-faq-inner">
            {page.faq_title && <h2>{page.faq_title}</h2>}
            {page.FAQ.map((item, index) => (
              <div key={item.id || index} className="fullwidth-faq-item">
                <div className="fullwidth-faq-question">{item.question}</div>
                <div className="fullwidth-faq-answer">{item.answer}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      <footer className="fullwidth-footer">
        <p className="fullwidth-footer-text">
          {site.footer_text || `© ${new Date().getFullYear()} ${siteName}. All rights reserved.`}
        </p>
      </footer>
    </div>
  )
}
