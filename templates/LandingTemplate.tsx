import React, {useEffect, useState} from 'react'
import Head from "next/head";

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
  // Базові поля
  name: string
  html_head?: string
  url: string
  template?: string
  language_code: string
  allow_indexing: boolean
  redirect_404s_to_homepage: boolean
  use_www_version: boolean
  seo_title?: string
  seo_description?: string


  // Уніфіковані поля шаблонів
  site_name?: string
  hero_title?: string
  hero_subtitle?: string
  hero_badge?: string
  cta_text?: string
  logo?: { url: string; name?: string } | null
  accent_color?: string
  tagline?: string
  features_list?: string
  footer_text?: string
  popup_text?: string
  faq_title?:string
  login_text?: string
  register_text?: string
  slots_title?: string
  bonus_title?: string
  get_bonus_btn_text?: string
  redirect_link?: string

  // Колірні теми
  main_background?: string
  secondary_background?: string
  button_background?: string
  button_text?: string
  text_color?: string
  color_highlight_text?: string
  color_main_btn_text?: string

  // Rich text content
  content?: string

  // Repeatable components


  // Metadata
  _generated_at?: string
  _version?: string

  // Allow any other fields
  [key: string]: any
  cta_link?: string
  sections?: ContentSection[]
  FAQ?: { id?: number; question: string; answer: string }[]
}

interface SiteData {
  // Базові поля
  name: string
  html_head?: string
  url: string
  template?: string
  language_code: string
  allow_indexing: boolean
  redirect_404s_to_homepage: boolean
  use_www_version: boolean
  seo_title?: string
  seo_description?: string

  // Уніфіковані поля шаблонів
  site_name?: string
  hero_title?: string
  hero_subtitle?: string
  hero_badge?: string
  cta_text?: string
  logo?: { url: string; name?: string } | null
  accent_color?: string
  tagline?: string
  features_list?: string
  footer_text?: string
  popup_text?: string
  faq_title?:string
  login_text?: string
  register_text?: string
  slots_title?: string
  bonus_title?: string
  get_bonus_btn_text?: string
  redirect_link?: string

  // Колірні теми
  main_background?: string
  secondary_background?: string
  button_background?: string
  button_text?: string
  text_color?: string
  color_highlight_text?: string
  color_main_btn_text?: string

  // Rich text content
  content?: string

  // Repeatable components


  // Metadata
  _generated_at?: string
  _version?: string

  // Allow any other fields
  [key: string]: any
}

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  html, body {
  overflow-x: hidden;
  width: 100%;
}

  body {
    font-family: 'Space Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    background: var(--background);
    color: var(--foreground);
    line-height: 1.6;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }

  /* Header Styles */
  header {
    position: sticky;
    top: 0;
    z-index: 50;
    background: hsla(var(--card), 0.95);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--border);
  }

  .header-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 0;
  }
  
  .logo {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  .logo-image{
    width: 100%;
    height: 60px;
  }
  .logo-icon {
    width: 2rem;
    height: 2rem;
    color: var(--button-bg);
  }

  .logo-text {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--button-bg);
  }

  .header-buttons {
    display: flex;
    gap: 0.75rem;
  }

  .btn {
    padding: 0.5rem 1.5rem;
    font-weight: 600;
    border-radius: calc(var(--radius) * 1);
    cursor: pointer;
    transition: all 0.3s;
    border: none;
    font-size: 0.95rem;
  }

  .btn-outline {
    background: transparent;
    border: 1px solid var(--primary);
    color: var(--primary);
  }

  .btn-outline:hover {
    background: var(--primary);
    color: var(--primary-foreground);
  }

  .btn-primary {
    background: var(--button-bg);
    color: var(--primary-foreground);
  }

  .btn-primary:hover {
    opacity: 0.9;
  }

  .btn-lg {
    padding: 1rem 2rem;
    font-size: 1.125rem;
  }

  /* Navigation Styles */
  .nav-bar {
    background: var(--secondary);
    border-bottom: 1px solid var(--border);
  }

  .nav-content {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    padding: 0.75rem 0;
    overflow-x: auto;
     color: var(--primary);
  }

  .menu-item {
    position: relative;
  }

  .nav-link {
    color: var(--muted-foreground);
    text-decoration: none;
    font-weight: 500;
    white-space: nowrap;
    transition: color 0.3s;
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }

  .nav-link:hover {
    color: var(--primary);
  }

  .menu-arrow {
    font-size: 10px;
    transition: transform 0.3s;
  }

  .menu-item:hover .menu-arrow {
    transform: rotate(180deg);
  }

  .submenu {
    position: absolute;
    top: 100%;
    left: 0;
    background: var(--secondary);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 0.5rem 0;
    min-width: 200px;
    z-index: 1000;
    opacity: 0;
    visibility: hidden;
    transform: translateY(-10px);
    transition: all 0.3s ease;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  }

  .menu-item:hover .submenu {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }

  .submenu a {
    display: block;
    color: var(--muted-foreground);
    text-decoration: none;
    padding: 0.5rem 1rem;
    transition: all 0.3s;
    white-space: nowrap;
  }

  .submenu a:hover {
    background: var(--accent);
    color: var(--primary);
  }

  footer .nav-content {
    padding: 1rem 0;
    font-size: 0.875rem;
  }

  footer .nav-link {
    font-size: 0.875rem;
  }


  /* Hero Banner Styles */
  .hero-section {
    position: relative;
    width: 100%;
    height: auto;
    overflow: hidden;
    padding: 5rem;
    background-size: cover;
    background-position: center center; 
  }

  .hero-bg {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .hero-overlay {
    position: absolute;
    inset: 0;
    
  }
  
  .header__gradient { 
    position: absolute;
    background: linear-gradient(180deg, rgba(25, 25, 25, 0.00) 0%, #191919 100%); 
    height: 30px;
    width: 100%;
    bottom: -1px; 
    left: 0;
    z-index: 1; 
  }
  
  .hero-background{
    background: #00000070;
    padding: 1.5rem;
    border-radius: 1rem;
    margin-bottom:1rem;
  }

  .hero-content {
    position: relative;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-width: 40rem;
  }
 

  .hero-badge {
    display: inline-block;
    background: color-mix(in srgb, var(--primary) 40%, transparent);
    color: var(--muted-foreground);
    padding: 0.25rem 1rem;
    border-radius: 9999px;
    font-size: 0.875rem;
    font-weight: 600;
    margin-bottom: 1rem;
    width: fit-content;
  }

  .hero-title {
    font-size: 3.5rem;
    font-weight: 700;
    color: var(--primary);
    margin-bottom: 1rem;
    line-height: 1.1;
  }

  .hero-accent {
   
  }

  .hero-subtitle {
    font-size: 1.25rem;
    color: var(--primary);
    margin-bottom: 0.5rem;
  }

  .hero-description {
    color: var(--muted-foreground);
    margin-bottom: 2rem;
  }

  .btn-hero {
    box-shadow: 0 0 30px hsla(var(--button-bg), 0.4);
  }
  
  .color-main-btn{
     color: var(--color-main-btn);
     box-shadow: 0 0 10px var(--primary);
  }

  /* Slots Section */
  .slots-section {
    padding: 4rem 0;
    background: var(--background);
  }
  
 .slot-background {
    background: #00000070;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    gap: 1rem;
    border-radius: 1rem;
}

  .section-title {
    text-align: center;
    font-size: 2rem;
    font-weight: 700;
    color: var(--primary);
    margin-bottom: 2rem;
  }

  .slider-container {
    position: relative;
  }

  .slider-btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 10;
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 50%;
    padding: 0.5rem;
    cursor: pointer;
    transition: all 0.3s;
  }

  .slider-btn:hover {
    background: var(--secondary);
  }

  .slider-btn:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }

  .slider-btn-left {
    left: -1rem;
  }

  .slider-btn-right {
    right: -1rem;
  }

  .slots-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    padding: 0 2rem;
  }

  .slot-card {
    position: relative;
    border-radius: 0.75rem;
    overflow: hidden;
    cursor: pointer;
    transition: transform 0.3s;
  }

  .slot-card:hover {
    transform: scale(1.05);
  }

  .slot-image {
    width: 100%;
    aspect-ratio: 1;
    object-fit: cover;
  }

  .slot-overlay {
    position: absolute;
    inset: 0;
    background: hsla(var(--background), 0.8);
    opacity: 0;
    transition: opacity 0.3s;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
  }

  .slot-card:hover .slot-overlay {
    opacity: 1;
  }

  .slot-name {
    color: var(--primary);
    font-weight: 700;
    font-size: 1.125rem;
  }

  /* Bonuses Section */
  .bonuses-section {
    padding: 4rem 0;
    background: var(--secondary);
  }

  .bonuses-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    padding: 0 2rem;
  }

  .bonus-card {
    
    border-radius: 0.75rem;
    overflow: hidden;
    border: 1px solid var(--border);
    transition: all 0.3s;
  }
  .bonus-card img{
    max-width: 100%;
    max-height: 80px;
    object-fit: cover;
  }

  .bonus-card:hover {
    border-color: var(--primary);
    box-shadow: 0 0 20px hsla(var(--primary), 0.2);
  }

  .bonus-header {
    height: 6rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #00000070;
  }

  .bonus-icon {
    width: 3rem;
    height: 3rem;
    color: white;
  }

  .bonus-content {
    padding: 1rem;
    text-align: center;
    background: var(--background);
  }

  .bonus-name {
    color: var(--primary);
    font-weight: 700;
    font-size: 1.125rem;
    margin-bottom: 0.25rem;
  }

  .bonus-text {
    color: var(--button-bg);
    font-size: 0.875rem;
    font-weight: 600;
    margin-bottom: 0.75rem;
  }

  /* Custom Content Section */
  .content-section {
    padding: 4rem 0;
    background: var(--background);
  }

  .content-wrapper {
    max-width: 56rem;
    margin: 0 auto;
    color: var(--foreground);
    line-height: 1.8;
    font-size: 1.125rem;
  }

  .content-wrapper h1, .content-wrapper h2, .content-wrapper h3, .content-wrapper h4 {
    color: var(--primary);
    margin: 2rem 0 1rem;
    font-weight: 700;
    text-align: center;
  }

  .content-wrapper h1 { font-size: 2.5rem; }
  .content-wrapper h2 { font-size: 2rem; }
  .content-wrapper h3 { font-size: 1.5rem; }

  .content-wrapper p {
    margin-bottom: 1.5rem;
    color: var(--muted-foreground);
    line-height: 1.75rem;
    font-size: 1.125rem;
    font-weight: 200;
  }

  .content-wrapper a {
    color: var(--button-bg);
    text-decoration: underline;
  }

  .content-wrapper a:hover {
    opacity: 0.8;
  }

  .content-wrapper ul, .content-wrapper ol {
    margin: 1.5rem 0;
    padding-left: 2rem;
    color: var(--muted-foreground);
  }

  .content-wrapper li {
    margin-bottom: 0.5rem;
  }

  .content-wrapper blockquote {
    border-left: 4px solid var(--primary);
    padding-left: 1.5rem;
    margin: 1.5rem 0;
    font-style: italic;
    color: var(--muted-foreground);
  }
  .faq-section {
    padding: 4rem 0;
    background: var(--background);
  }
  .faq-section .content-wrapper{
    line-height: unset;
  } 
  
  .faq-title {
    font-size: 2rem;
    font-weight: 700;
    color: var(--primary);
    text-align: center;
  }
  
  .faq-list {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
  
  .faq-item {
    background: var(--card);
    border-radius: 1.75rem;
    padding: 1rem;
    cursor: pointer;
    box-shadow: 0 0 5px var(--primary);
    transition: all 0.3s ease;
  }
  
  .faq-question {
    font-size: 1.125rem;
    font-weight: 700;
    color: var(--primary);
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    transition: background 0.3s ease;
  }
  
  .faq-question:hover {
    background-color: var(--secondary);
  }
  
  .faq-answer {
    padding: 0; 
    color: var(--muted-foreground);
    line-height: 1.6;
    height: 0;
    overflow: hidden;
    opacity: 0;
    transition: height 0.3s ease-out, opacity 0.3s ease-out;
    max-height: 1000px; 
  }
  
  .faq-answer.open {
    height: auto;
    opacity: 1;
  }
  
  .faq-toggle-icon {
    display: flex;
    margin-left: 1rem;
    transition: transform 0.3s ease;
  }
  
  .faq-toggle-icon svg {
    transition: transform 0.3s ease;
  }
  
  
  
  .faq-toggle-icon.open {
    transform: rotate(180deg); 
  }


  /* Footer */
  footer {
    background: var(--card);
    border-top: 1px solid var(--border);
    padding: 2rem 0 7rem 0;
  }

  .footer-content {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .footer-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 1.5rem;
  }

  .footer-certifications {
    display: flex;
    align-items: center;
    gap: 1.5rem;
  }

  .cert-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--muted-foreground);
    font-size: 0.875rem;
  }

  .age-badge {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    border: 2px solid hsl(0 84% 60%);
    color: hsl(0 84% 60%);
    font-weight: 700;
    font-size: 0.875rem;
  }

  .footer-links {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    flex-wrap: wrap;
  }

  .footer-link {
    color: var(--muted-foreground);
    text-decoration: none;
    font-size: 0.875rem;
    transition: color 0.3s;
  }

  .footer-link:hover {
    color: var(--primary);
  }

  .footer-bottom {
    padding-top: 1.5rem;
    border-top: 1px solid var(--border);
    text-align: center;
  }

  .footer-copyright {
    color: var(--muted-foreground);
    font-size: 0.875rem;
  }

  /* Bonus Popup */
  .bonus-popup {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 50;
    background: var(--card);
    border-top: 1px solid hsla(var(--primary), 0.3);
    box-shadow: 0 -2px 15px var(--primary);
    animation: slideUp 0.3s ease-out;
  }

  .bonus-popup.hidden {
    display: none;
  }

  @keyframes slideUp {
    from {
      transform: translateY(100%);
    }
    to {
      transform: translateY(0);
    }
  }

  .popup-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
    gap: 1rem;
  }

  .popup-text {
    font-size: 1.125rem;
    font-weight: 700;
    color: var(--primary);
    flex: 1;
    text-align: center;
  }

  .popup-buttons {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .btn-close {
    padding: 0.25rem;
    color: var(--muted-foreground);
    background: transparent;
    border: none;
    cursor: pointer;
    transition: color 0.3s;
  }

  .btn-close:hover {
    color: var(--foreground);
  }

  /* Responsive */
  .landing-faq {
    padding: 6rem 2rem;
    background: #fff;
    color: #333;
  }

  .landing-faq-inner {
    max-width: 800px;
    margin: 0 auto;
  }

  .landing-faq h2 {
    font-size: 2.5rem;
    color: #1a1a1a;
    text-align: center;
    margin-bottom: 3rem;
  }

  .landing-faq-item {
    background: #f8f9fa;
    border-radius: 12px;
    padding: 1.5rem 2rem;
    margin-bottom: 1rem;
  }

  .landing-faq-question {
    font-size: 1.125rem;
    font-weight: 600;
    color: #1a1a1a;
    margin-bottom: 0.75rem;
  }

  .landing-faq-answer {
    color: #555;
    line-height: 1.7;
  }

  @media (max-width: 768px) {
    .hero-title {
      font-size: 2.5rem;
    }

    .hero-section {
      padding:2rem;
    }

    .slots-grid,
    .bonuses-grid {
      grid-template-columns: repeat(2, 1fr);
    }
    .popup-content{
      padding: 1rem 0;
    }
    .popup-content .logo-image{
      height: 45px;
    }
    .popup-text {
      font-size: 0.775rem;
    }
    .popup-content .btn{
      font-size: 0.75rem;
    } 
    
      table {
    overflow-x: auto;
    white-space: nowrap;
    display: block;
  }
  td {
    width: 1%;
  }

    .header-buttons .btn {
      padding: 0.375rem 1rem;
      font-size: 0.875rem;
    }

    .content-wrapper {
      font-size: 1rem;
    }
    .faq-list, .section-title{
      width: 100%;
    }
    .faq-section .container{
      flex-direction: column;
    }
  }
`;

export default function LandingTemplate({ page, site }: { page: PageData; site: SiteData }) {
  const siteName = site.site_name || site.name
  const data: PageData = require('../data.json')
  const htmlHeadContent = page.html_head || '';

  // Функція для парсингу htmlHeadContent
  const renderHeadTags = (html: string) => {
    if (typeof document === 'undefined') return null;

    const temp = document.createElement('div');
    temp.innerHTML = html;

    return Array.from(temp.children).map((child, i) => {
      if (!(child instanceof HTMLElement)) return null;

      const tagName = child.tagName.toLowerCase();
      const attributes = Array.from(child.attributes) as Attr[];

      if (tagName === 'meta') {
        return <meta key={i} {...Object.fromEntries(attributes.map(a => [a.name, a.value]))} />;
      }

      if (tagName === 'link') {
        return <link key={i} {...Object.fromEntries(attributes.map(a => [a.name, a.value]))} />;
      }

      if (tagName === 'script') {
        return (
            <script
                key={i}
                {...Object.fromEntries(attributes.map(a => [a.name, a.value]))}
                dangerouslySetInnerHTML={{ __html: child.innerHTML }}
            />
        );
      }

      return null;
    });
  };


  // Отримуємо кольори з data або використовуємо дефолтні
  const mainBackground = data.main_background || '#1a202c' // default dark blue
  const secondaryBackground = data.secondary_background || '#2d3748' // default darker blue
  const buttonBackground = data.button_background || '#f59e0b' // default amber
  const buttonText = data.button_text || '#1a202c' // default dark
  const textColor = data.text_color || '#f7fafc' // default light
  const colorHighlightText = data.color_highlight_text || '#f59e0b'
  const colorMainBtnText = data.color_main_btn_text || 'fff'



  const heroTitle = page.hero_title || 'Get 200% Bonus'
  const heroSubtitle = page.hero_subtitle || 'Up to €1,000 + 100 Free Spins'
  const heroBadge = data.hero_badge || '🎰 Welcome Bonus'
  const ctaText = data.cta_text || 'Play Now'
  const [showPopup, setShowPopup] = useState(false)
  const popupText = data.popup_text || '🎁 Welcome Bonus: 100% up to $500 + 200 Free Spins!'
  // New variable
  const normalizeUrl = (url?: string) => {
    if (!url) return '#'
    if (/^https?:\/\//i.test(url)) return url
    return `https://${url}`
  }
  const urlSite = data.url || '/'
  const year = new Date().getFullYear();
  const faqTitle = page.faq_title
  const faqs = Array.isArray(page?.FAQ) ? page.FAQ : []
  const loginText = data.login_text
  const registerText = data.register_text
  const slotsTitle = data.slots_title
  const bonusTitle = data.bonus_title
  const getBonusBtn = data.get_bonus_btn_text || 'Get Bonus'
  const redirectLink = data.redirect_link || ''
  // Генеруємо динамічні стилі з кольорами
  const dynamicStyles = `
    :root {
      --background: ${mainBackground};
      --foreground: ${textColor};
      --card: ${secondaryBackground};
      --primary: ${colorHighlightText};
      --primary-foreground: ${buttonText};
      --secondary: ${secondaryBackground};
      --muted: ${mainBackground};
      --muted-foreground: ${textColor}cc; /* with opacity */
      --border: ${secondaryBackground}33; /* with opacity */
      --radius: 0.5rem;
      --button-bg: ${buttonBackground};
      --button-text: ${buttonText};
      --color-main-btn: ${colorMainBtnText};
    }
  `;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight * 0.5) {
        setShowPopup(true)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const getMediaUrl = (media?: MediaFile | MediaFile[] | string) => {
    if (!media) return ''
    if (typeof media === 'string') return media
    if (Array.isArray(media) && media.length > 0) return media[0].url || ''
    if (typeof media === 'object' && 'url' in media) return media.url || ''
    return ''
  }

  const backgroundImage = getMediaUrl(data.main_background_img);

  return (
   <>
     <Head>
       <title>{page.seo_title || data.site_name}</title>
       <meta name="robots" content={data.allow_indexing ? 'index,follow' : 'noindex,nofollow'} />
       <meta charSet="utf-8" />
       <meta name="viewport" content="width=device-width, initial-scale=1" />
       {/* Вставка всіх тегів з html_head */}
       {htmlHeadContent && renderHeadTags(htmlHeadContent)}
     </Head>
     <style dangerouslySetInnerHTML={{ __html: dynamicStyles }} />
     <style dangerouslySetInnerHTML={{ __html: styles }} />




      <header>
        <div className="container">
          <div className="header-content">
            <div className="logo">
              <a href={normalizeUrl(urlSite)}>
                <img src={getMediaUrl(data.logo)} alt={siteName} className="logo-image"/>
              </a>
            </div>
            <div className="header-buttons">
              {loginText && (
                  <button
                      className="btn btn-outline"
                      onClick={() => {
                        const link = redirectLink ? redirectLink : '/';
                        window.open(link, '_blank');
                      }}
                  >
                    {loginText}
                  </button>
              )}

              {registerText && (
                  <button
                      className="btn btn-primary"
                      onClick={() => {
                        const link = redirectLink ? redirectLink : '/';
                        window.open(link, '_blank');
                      }}
                  >
                    {registerText}
                  </button>
              )}
            </div>
          </div>
        </div>
      </header>


      {/* Navigation */}
      <nav className="nav-bar">
        <div className="container">
          <ul className="nav-content">
            {data.header_menu && data.header_menu.length > 0 ? (
                data.header_menu.map((item, index) => (
                    <li key={item.id || index} className="menu-item">
                      <a
                          href={redirectLink ? redirectLink : item.url}
                          className="nav-link"
                          target={item.open_in_new_tab ? '_blank' : '_self'}
                          rel={item.open_in_new_tab ? 'noopener noreferrer' : undefined}
                      >
                        {item.label}
                        {item.submenu && item.submenu.length > 0 && (
                            <span className="menu-arrow">▼</span>
                        )}
                      </a>
                      {item.submenu && item.submenu.length > 0 && (
                          <div className="submenu">
                            {item.submenu.map((subitem, subindex) => (
                                <a
                                    key={subitem.id || subindex}
                                    href={redirectLink ? redirectLink : subitem.url}
                                    target={subitem.open_in_new_tab ? '_blank' : '_self'}
                                    rel={subitem.open_in_new_tab ? 'noopener noreferrer' : undefined}
                                >
                                  {subitem.label}
                                </a>
                            ))}
                          </div>
                      )}
                    </li>
                ))
            ) : (
                <>
                  <li><a href="#home" className="nav-link">Home</a></li>
                  <li><a href="#slots" className="nav-link">Slots</a></li>
                  <li><a href="#bonuses" className="nav-link">Bonuses</a></li>
                </>
            )}
          </ul>
        </div>
      </nav>

      {/* Hero Banner */}
      <section
          id="home"
          className="hero-section"
          style={{
            backgroundImage: backgroundImage
                ? `url(${backgroundImage})`
                : `linear-gradient(135deg, var(--secondary) 0%, var(--background) 100%)`,
          }}
      >
        <div className="header__gradient"></div>
        <div className="hero-bg"></div>
        <div className="hero-overlay"></div>
        <div className="container">
          <div className="hero-content">
            <span className="hero-badge">{heroBadge}</span>
            <div className="hero-background">
              <h1 className="hero-title">
                <span className="hero-accent">{heroTitle}</span>
              </h1>
              <p className="hero-subtitle">{heroSubtitle}</p>
              <p className="hero-description">
                {data.tagline || 'Start your winning journey today with the best welcome offer in online gaming!'}
              </p>
            </div>
            <button
                className="btn btn-primary btn-lg btn-hero color-main-btn"
                onClick={() => {
                  const link = redirectLink ? redirectLink : '/';
                  window.open(link, '_blank');
                }}
            >
              {ctaText}
            </button>
          </div>
        </div>
      </section>



      {/* Custom Content Section */}
      {page.content && (
          <section className="content-section">
            <div className="container">
              <div className="content-wrapper" dangerouslySetInnerHTML={{ __html: page.content }} />
            </div>
          </section>
      )}


      {/* FAQ */}
      {faqs.length > 0 && (
          <section id="faq" className="faq-section">
            <div className="container">
              <div className="content-wrapper">
                <h2 className="faq-title">{faqTitle}</h2>
                <div className="faq-list">
                  {faqs.map((item, index) => {
                    const [isOpen, setIsOpen] = useState(false);
                    const toggleAnswer = () => {
                      setIsOpen(!isOpen);
                    };

                    return (
                        <div key={item.id || index} className="faq-item">
                          <div className="faq-question" onClick={toggleAnswer}>
                            {item.question}
                            <span className={`faq-toggle-icon ${isOpen ? 'open' : ''}`}>
                    {isOpen ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-chevron-down h-4 w-4 shrink-0 transition-transform duration-200"
                        >
                          <path d="m6 9 6 6 6-6"></path>
                        </svg>
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-chevron-down h-4 w-4 shrink-0 transition-transform duration-200"
                        >
                          <path d="m6 9 6 6 6-6"></path>
                        </svg>
                    )}
                  </span>
                          </div>
                          <div className={`faq-answer ${isOpen ? 'open' : ''}`}>{item.answer}</div>
                        </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>
      )}

      {/* Footer */}
      <footer>
        <div className="container">
          <div className="footer-content">
            <div className="footer-top">
              <div className="logo">
                <a href={normalizeUrl(urlSite)}>
                  <img src={getMediaUrl(data.logo)} alt={siteName} className="logo-image"/>
                </a>
              </div>

              <div className="footer-certifications">
                <div className="cert-item">
                  <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span>FairPlay</span>
                </div>
                <div className="age-badge">18+</div>
              </div>

              <div className="footer-links">
                {data.footer_menu && data.footer_menu.length > 0 && (
                    data.footer_menu.map((item, index) => (
                        <a
                            key={item.id || index}
                            href={item.url}
                            className="footer-link"
                            target={item.open_in_new_tab ? '_blank' : '_self'}
                            rel={item.open_in_new_tab ? 'noopener noreferrer' : undefined}
                        >
                          {item.label}
                        </a>
                    ))
                )}
              </div>
            </div>

            <div className="footer-bottom">
              <p className="footer-copyright">
                {data.footer_text ||
                    `© ${year}. All rights reserved. ${siteName} Casino.`}
              </p>
            </div>
          </div>
        </div>
      </footer>

      <div className={`bonus-popup ${showPopup ? '' : 'hidden'}`}>
        <div className="container">
          <div className="popup-content">
            {getMediaUrl(data.popup_logo) && (
                <div className="logo">
                  <img
                      src={getMediaUrl(data.popup_logo)}
                      alt="Logo"
                      className="logo-image"
                  />
                </div>
            )}
            <div className="popup-text">{popupText}</div>

            <div className="popup-buttons">
              <button
                  className="btn btn-primary color-main-btn"
                  onClick={() => {
                    const link = redirectLink ? redirectLink : '/';
                    window.open(link, '_blank');
                  }}
              >
                {getBonusBtn}
              </button>
              <button className="btn-close" onClick={() => setShowPopup(false)}>
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
   </>
  )
}
