import React, { useState, useEffect } from 'react'
import Head from 'next/head'

interface MediaFile {
  id?: number
  name?: string
  url?: string
  formats?: any
}

interface Slot {
  id?: number
  Name?: string
  logo?: MediaFile | MediaFile[] | string
  link?: string
}

interface SubmenuItem {
  id?: number
  label: string
  url?: string
  link?: string
  open_in_new_tab?: boolean
}

interface MenuItem {
  id?: number
  label: string
  url?: string
  link?: string
  open_in_new_tab?: boolean
  submenu?: SubmenuItem[]
}

interface CasinoData {
  // Базові поля
  name: string
  html_head?: string
  url: string
  template?: string
  language_code: string
  allow_indexing: boolean
  redirect_404s_to_homepage: boolean
  use_www_version: boolean
  
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
  faq_title?: string
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
  Slots?: Slot[]
  header_menu?: MenuItem[]
  footer_menu?: MenuItem[]
  
  // Metadata
  _generated_at?: string
  _version?: string
  
  // Allow any other fields
  [key: string]: any
}



export default function ModernCasino() {
  const data: CasinoData = require('../data.json')
  const accentColor = data.accent_color || '#00d4ff'
  const [openFaqIndex, setOpenFaqIndex] = useState<number>(0)
  const [slotStartIndex, setSlotStartIndex] = useState(0)
  const [visibleSlots, setVisibleSlots] = useState(5)
  const [showPopup, setShowPopup] = useState(false)

  const faqTitle = data.faq_title
  const faqs = Array.isArray(data.FAQ) ? data.FAQ : []
  const slots = Array.isArray(data.Slots) ? data.Slots : []


  // Отримуємо кольори з data або використовуємо дефолтні
  const mainBackground = data.main_background || '#0a0a14' // default dark blue
  const secondaryBackground = data.secondary_background || '#1a1a2e' // default darker blue
  const buttonBackground = data.button_background || '#00d4ff' // default amber
  const buttonText = data.button_text || '#ffffff' // default dark
  const textColor = data.text_color || '#e0e0e0' // default light
  const colorHighlightText = data.color_highlight_text || '#00d4ff' // default amber
  const colorMainBtnText = data.color_main_btn_text || '#ffffff'
  const urlSite = data.url || '/'
  const siteName = data.site_name || data.name || 'LuckySpin'
  const heroTitle = data.hero_title || siteName
  const heroSubtitle = data.hero_subtitle || data.tagline || 'Trusted reviews, premium games, and instant access to top offers.'
  const heroBadge = data.hero_badge || 'Exclusive Welcome Offer'
  const ctaText = data.cta_text || 'Play Now'
  const slotButtonText = data.get_bonus_btn_text || data.cta_text || 'Play'
  const popupText = data.popup_text || 'Welcome bonus available for a limited time.'
  const slotsTitle = data.slots_title || 'Featured Online Slots'

  const loginText = data.login_text
  const registerText = data.register_text
  const redirectLink = data.redirect_link || ''

  const normalizeUrl = (url?: string) => {
    if (!url) return '#'
    if (/^https?:\/\//i.test(url)) return url
    return `https://${url}`
  }

  const getLinkUrl = (item?: { url?: string; link?: string }) => {
    return item?.link || item?.url || '#'
  }

  const getLogoUrl = (slot: Slot) => {
    if (!slot.logo) return ''
    if (typeof slot.logo === 'string') return slot.logo
    if (Array.isArray(slot.logo) && slot.logo.length > 0) return slot.logo[0].url || ''
    if (typeof slot.logo === 'object' && 'url' in slot.logo) return slot.logo.url || ''
    return ''
  }
  const getMediaUrl = (media?: MediaFile | MediaFile[] | string) => {
    if (!media) return ''
    if (typeof media === 'string') return media
    if (Array.isArray(media) && media.length > 0) return media[0].url || ''
    if (typeof media === 'object' && 'url' in media) return media.url || ''
    return ''
  }

  const backgroundImage = getMediaUrl(data.main_background_img);

  const handleSlotPrev = () => {
    setSlotStartIndex((prev) => Math.max(0, prev - 1))
  }

  const handleSlotNext = () => {
    setSlotStartIndex((prev) => Math.min(Math.max(0, slots.length - visibleSlots), prev + 1))
  }

  // Функція для заміни змінних у content
  const replaceVariables = (content: string): string => {
    if (!content) return content
    
    let result = content
    const variableRegex = /\{\{([^}]+)\}\}/g
    
    result = result.replace(variableRegex, (match, variableName) => {
      const trimmedName = variableName.trim()
      if (data[trimmedName] !== undefined && data[trimmedName] !== null) {
        return String(data[trimmedName])
      }
      return match
    })
    
    return result
  }

  const wrapContentIntoBlocks = (content: string): string => {
    if (!content) return content

    const headingRegex = /<h[23]\b[^>]*>[\s\S]*?<\/h[23]>/gi
    const matches = Array.from(content.matchAll(headingRegex))
    if (matches.length === 0) return content

    let result = ''
    let lastIndex = 0

    matches.forEach((match, idx) => {
      const start = match.index ?? 0
      const end = idx < matches.length - 1 ? (matches[idx + 1].index ?? content.length) : content.length
      const segment = content.slice(start, end).trim()

      result += content.slice(lastIndex, start)
      result += `<section class="content-block">${segment}</section>`
      lastIndex = end
    })

    return result.trim()
  }

  
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
    }
  `;

  const styles = `
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          background: #08101c;
          color: var(--foreground);
          overflow-x: hidden;
        }

        .page-shell {
          min-height: 100vh;
          background: linear-gradient(180deg, #08101c 0%, ${mainBackground} 100%);
        }

        .container {
          max-width: 1240px;
          margin: 0 auto;
          padding: 0 24px;
        }

        header {
          position: sticky;
          top: 0;
          z-index: 100;
          padding: 8px 0;
          background: var(--secondary);
          backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        }

        .header-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 28px;
          min-height: 66px;
        }

        .logo {
          flex: 0 0 auto;
          display: flex;
          align-items: center;
        }

        .logo a {
          display: inline-flex;
          align-items: center;
        }

        .logo-image {
          height: 42px;
          width: auto;
          max-width: 180px;
          object-fit: contain;
        }

        .header-nav {
          flex: 1 1 auto;
          display: flex;
          justify-content: center;
        }

    .header-nav-list {
      list-style: none;
      display: flex;
          align-items: center;
          gap: 8px;
          padding: 6px;
          margin: 0;
          background: var(--secondary);
          border: 1px solid rgba(255, 255, 255, 0.04);
          border-radius: 999px;
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.03);
    }

    .nav-bar,
    .nav-content,
    .nav-link,
    .hero-background,
    .hero-subtitle,
    .hero-bg,
    .hero-overlay,
    .header__gradient,
    .btn-lg,
    .btn-hero,
    .color-main-btn {
      display: none;
    }

        .header-buttons {
          display: flex;
          gap: 12px;
          align-items: center;
          flex: 0 0 auto;
        }

        .menu-item {
          position: relative;
          list-style: none;
        }

        .menu-item > a,
        .nav-fallback-link {
          color: var(--foreground);
          text-decoration: none;
          font-weight: 600;
          font-size: 15px;
          line-height: 1;
          padding: 14px 22px;
          border-radius: 999px;
          transition: color 0.25s ease, background 0.25s ease;
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .menu-item > a:hover,
        .nav-fallback-link:hover {
          color: #ffffff;
          background: rgba(255, 255, 255, 0.04);
        }

        .submenu {
          position: absolute;
          top: calc(100% + 10px);
          left: 0;
          background: var(--secondary);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 18px;
          padding: 10px 0;
          min-width: 200px;
          z-index: 1000;
          opacity: 0;
          visibility: hidden;
          transform: translateY(-10px);
          transition: all 0.3s ease;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.35);
        }

        .menu-item:hover .submenu,
        .submenu.open {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }

        .submenu a {
          display: block;
          color: var(--foreground);
          text-decoration: none;
          padding: 10px 18px;
          transition: all 0.3s;
        }

        .submenu a:hover {
          background: rgba(255, 255, 255, 0.04);
          color: #ffffff;
          padding-left: 22px;
        }

        .menu-arrow {
          font-size: 10px;
          transition: transform 0.3s;
        }

        .menu-item:hover .menu-arrow {
          transform: rotate(180deg);
        }

        .btn {
          border: none;
          cursor: pointer;
          border-radius: 999px;
          font-size: 16px;
          font-weight: 700;
          line-height: 1;
          padding: 14px 24px;
          text-decoration: none;
          transition: transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease, color 0.25s ease;
        }

        .btn:hover {
          transform: translateY(-1px);
        }

        .btn-outline {
          color: var(--button-text);
          background: transparent;
          border: 1px solid var(--button-bg);
          box-shadow: 0 0 12px var(--button-bg);
        }

        .btn-outline:hover {
          background: color-mix(in srgb, var(--button-bg) 22%, transparent);
          box-shadow: 0 0 18px var(--button-bg);
        }

        .btn-primary {
          color: var(--button-text);
          background: var(--button-bg);
          box-shadow: 0 0 14px var(--button-bg);
        }

        .btn-primary:hover {
          background: color-mix(in srgb, var(--button-bg) 78%, white);
          box-shadow: 0 0 20px var(--button-bg);
        }

        .site-footer {
          background: var(--secondary);
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          
          padding: 42px 0 26px;
        }

        .footer-main {
          display: grid;
          grid-template-columns: 1.2fr auto 1fr;
          align-items: flex-start;
          gap: 30px;
          padding-bottom: 28px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .footer-brand {
          max-width: 360px;
        }

        .footer-logo-link {
          display: inline-flex;
          align-items: center;
          margin-bottom: 14px;
        }

        .footer-logo {
          width: auto;
          height: 36px;
          max-width: 220px;
          object-fit: contain;
        }

        .footer-brand p {
          color: var(--foreground);
          font-size: 28px;
          line-height: 1.45;
          margin: 0;
        }

        .footer-badges {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          flex-wrap: wrap;
          padding-top: 6px;
        }

        .footer-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          height: 38px;
          padding: 0 16px;
          border-radius: 999px;
          border: 0;
          color: var(--foreground);
          font-size: 23px;
          font-weight: 700;
          background: var(--secondary);
          box-shadow: 0 0 10px var(--primary);
        }

        .footer-links {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 10px;
        }

        .footer-links a {
          color: var(--foreground);
          text-decoration: none;
          font-size: 27px;
          line-height: 1.3;
          transition: color 0.2s ease;
        }

        .footer-links a:hover {
          color: #ffffff;
        }

        .footer-bottom {
          text-align: center;
          color: var(--foreground);
          font-size: 22px;
          padding-top: 20px;
        }

        .bonus-popup {
          position: fixed;
          left: 50%;
          bottom: 20px;
          transform: translateX(-50%);
          width: min(850px, calc(100% - 28px));
          z-index: 120;
          background: var(--secondary);
          border: 0;
          border-radius: 24px;
          box-shadow: 0 0 10px var(--primary);
          animation: popup-up 0.24s ease-out;
        }

        .bonus-popup.hidden {
          display: none;
        }

        @keyframes popup-up {
          from {
            opacity: 0;
            transform: translateX(-50%) translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
        }

        .popup-content {
          display: grid;
          grid-template-columns: auto 1fr auto auto;
          align-items: center;
          gap: 14px;
          padding: 14px 18px;
        }

        .popup-logo {
          width: 58px;
          height: 58px;
          border-radius: 999px;
          object-fit: cover;
          border: 1px solid rgba(130, 173, 223, 0.45);
        }

        .popup-logo-fallback {
          width: 58px;
          height: 58px;
          border-radius: 999px;
          background: linear-gradient(180deg, #3d8cff 0%, #2f66da 100%);
          color: #ffffff;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 25px;
          font-weight: 800;
          border: 1px solid rgba(130, 173, 223, 0.45);
        }

        .popup-text-wrap {
          min-width: 0;
        }

        .popup-tag {
          display: block;
          color: var(--primary);
          font-size: 16px;
          font-weight: 800;
          margin-bottom: 3px;
          text-transform: uppercase;
        }

        .popup-text {
          color: var(--foreground);
          font-size: 24px;
          font-weight: 700;
          line-height: 1.25;
          text-align:center;
        }

        .popup-cta {
          height: 42px;
          padding: 0 22px;
          border-radius: 999px;
          border: 0;
          color: #ffffff;
          background: var(--button-bg);
          color: var(--button-text);
          font-size: 29px;
          font-weight: 700;
          cursor: pointer;
          box-shadow: 0 0 14px var(--button-bg);
          transition: background 0.2s ease, box-shadow 0.2s ease;
        }

        .popup-cta:hover {
          background: color-mix(in srgb, var(--button-bg) 78%, white);
          box-shadow: 0 0 20px var(--button-bg);
        }

        .popup-close {
          width: 34px;
          height: 34px;
          border: 0;
          border-radius: 999px;
          background: transparent;
          color: #93a8c4;
          font-size: 36px;
          cursor: pointer;
          line-height: 1;
        }

        .hero-section {
          position: relative;
          min-height: 705px;
          display: flex;
          align-items: center;
          overflow: hidden;
          background-color: #08101c;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }

        .hero-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at 22% 74%, rgba(32, 111, 255, 0.24), transparent 28%),
            linear-gradient(90deg, rgba(4, 10, 21, 0.96) 0%, rgba(6, 14, 28, 0.88) 40%, rgba(6, 14, 28, 0.42) 70%, rgba(6, 14, 28, 0.82) 100%);
        }

        .hero-section::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(8, 15, 28, 0) 0%, rgba(8, 15, 28, 0.65) 100%);
        }

        .hero-inner {
          position: relative;
          z-index: 2;
          width: 100%;
          
        }

        .hero-content {
          max-width: 620px;
        }

 .hero-badge {
    display: inline-block;
    background: color-mix(in srgb, var(--primary) 40%, transparent);
    color: var(--muted-foreground);
    padding: 0.5rem 1.5rem;
    border-radius: 9999px;
    font-size: 0.875rem;
    font-weight: 600;
    margin-bottom: 1rem;
    width: fit-content;
    box-shadow: 0 0 18px var(--button-bg);
  }
        .hero-title {
          font-size: clamp(3rem, 6vw, 6rem);
          font-weight: 900;
          line-height: 0.96;
          margin-bottom: 22px;
          color: #ffffff;
          letter-spacing: -0.04em;
        }

        .hero-title-accent {
          color: var(--primary);
        }

        .hero-description {
          max-width: 560px;
          font-size: 18px;
          line-height: 1.55;
          color: var(--foreground);
          margin-bottom: 34px;
        }

        .hero-actions {
          display: flex;
          align-items: center;
          gap: 18px;
          margin-bottom: 54px;
          flex-wrap: wrap;
        }

        .cta-button {
          background: linear-gradient(
            180deg,
            color-mix(in srgb, var(--button-bg) 76%, white) 0%,
            var(--button-bg) 100%
          );
          color: ${colorMainBtnText};
          padding: 18px 34px;
          font-size: 28px;
          font-weight: 700;
          border: none;
          border-radius: 999px;
          cursor: pointer;
          transition: all 0.3s;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 12px;
          box-shadow: 0 0 18px var(--button-bg);
        }

        .cta-button:hover {
          background: linear-gradient(
            180deg,
            color-mix(in srgb, var(--button-bg) 62%, white) 0%,
            color-mix(in srgb, var(--button-bg) 92%, white) 100%
          );
          transform: translateY(-3px);
          box-shadow: 0 0 24px var(--button-bg);
        }

        .hero-secondary-link {
          color: var(--foreground);
          text-decoration: none;
          font-weight: 700;
          font-size: 18px;
          transition: color 0.25s ease;
        }

        .hero-secondary-link:hover {
          color: #ffffff99
        }

        .hero-stats {
          display: flex;
          gap: 58px;
          flex-wrap: wrap;
        }

        .hero-stat {
          min-width: 102px;
        }

        .hero-stat-value {
          display: block;
          font-size: 32px;
          line-height: 1;
          font-weight: 900;
          color: var(--foreground);
          margin-bottom: 8px;
        }

        .hero-stat-label {
          display: block;
          font-size: 18px;
          line-height: 1.35;
          color: var(--foreground);
        }

        .features {
          padding: 80px 0;
          background: var(--background);
        }

        .features .container {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 30px;
        }

        .feature {
          background: var(--secondary);
          padding: 40px;
          border-radius: 20px;
          border: 0;
          box-shadow: 0 0 10px var(--primary);
          text-align: center;
          transition: all 0.3s;
        }

        .feature:hover {
          transform: translateY(-5px);
        }

        .feature h3 {
          color: var(--primary);
          margin-bottom: 15px;
          font-size: 24px;
          font-weight: 700;
        }

        .feature p {
          color: var(--foreground);
          line-height: 1.6;
        }

        .slots-section {
          padding: 56px 0 44px;
          background: var(--background);
        }

        .slots-head {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 20px;
          margin-bottom: 24px;
        }

        .slots-title-wrap h2 {
          font-size: clamp(2.25rem, 4.2vw, 3.2rem);
          line-height: 1.05;
          font-weight: 900;
          color: var(--primary);
          margin-bottom: 10px;
          letter-spacing: 0;
        }

        .slots-title-wrap p {
          font-size: 28px;
          line-height: 1.45;
          color: var(--foreground);
          margin: 0;
        }

        .slots-nav {
          display: flex;
          align-items: center;
          gap: 12px;
          padding-top: 10px;
          flex-shrink: 0;
        }

        .slots-nav-btn {
          width: 44px;
          height: 44px;
          border-radius: 999px;
          border: 0;
          background: var(--secondary);
          color: var(--primary);
          box-shadow: 0 0 10px var(--primary);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .slots-nav-btn:hover:not(:disabled) {
          color: var(--button-text);
          background: var(--button-bg);
          box-shadow: 0 0 14px var(--primary);
        }

        .slots-nav-btn:disabled {
          opacity: 0.35;
          cursor: not-allowed;
        }

        .slots-grid {
          display: grid;
          grid-template-columns: repeat(5, minmax(0, 1fr));
          gap: 16px;
        }

        .slots-grid.is-fluid {
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        }

        .slot-card {
          position: relative;
          border-radius: 22px;
          border: 0;
          overflow: hidden;
          width: 100%;
          aspect-ratio: 1;
          background: var(--secondary);
          box-shadow: 0 0 10px var(--primary);
        }

        .slot-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.3s ease;
        }

        .slot-card:hover .slot-image {
          transform: scale(1.05);
        }

        .slot-overlay {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          gap: 10px;
          padding: 14px;
          opacity: 0;
          background: linear-gradient(180deg, rgba(0, 0, 0, 0.08) 28%, rgba(0, 0, 0, 0.72) 100%);
          transition: opacity 0.25s ease;
        }

        .slot-card:hover .slot-overlay {
          opacity: 1;
        }

        .slot-name {
          color: var(--primary);
          font-size: 33px;
          font-weight: 700;
          line-height: 1.2;
          text-shadow: 0 8px 18px rgba(0, 0, 0, 0.45);
        }

        .slot-link {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 40px;
          border-radius: 999px;
          background: var(--button-bg);
          color: var(--button-text);
          text-decoration: none;
          font-size: 22px;
          font-weight: 700;
          transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
          box-shadow: 0 0 14px var(--button-bg);
        }

        .slot-link:hover {
          background: color-mix(in srgb, var(--button-bg) 78%, white);
          transform: translateY(-1px);
          box-shadow: 0 0 20px var(--button-bg);
        }

        .slot-logo-placeholder {
          width: 100%;
          height: 100%;
          background: var(--secondary);
        }

        .content-section {
          padding: 60px 0;
          background: var(--background);
          border-radius: 20px;
          margin: 40px 0;
          border: 0;
        }

        .content-wrapper {
          max-width: 900px;
          margin: 0 auto;
          padding: 0 20px;
          color: var(--foreground);
          line-height: 1.8;
          font-size: 18px;
        }

        .content-block {
          background: var(--secondary);
          border: 0;
          border-radius: 22px;
          padding: 30px 32px;
          margin-bottom: 22px;
          box-shadow: 0 0 10px var(--primary);
        }

        .content-block:last-child {
          margin-bottom: 0;
        }

        .content-wrapper h1, .content-wrapper h2, .content-wrapper h3, .content-wrapper h4 {
          color: var(--primary);
          margin: 30px 0 15px;
        }

        .content-wrapper h1 { font-size: 36px; }
        .content-wrapper h2 {
          font-size: 28px;
          margin-top: 0;
          margin-bottom: 14px;
          text-align: left;
        }
        .content-wrapper h3 { font-size: 22px; }

        .content-wrapper p {
          margin-bottom: 20px;
          color: var(--foreground);
        }

        .content-wrapper a {
          color: ${accentColor};
          text-decoration: underline;
        }

        .content-wrapper a:hover {
          color: var(--primary);
        }

        .content-wrapper ul, .content-wrapper ol {
          margin: 20px 0;
          padding-left: 0;
          list-style: none;
        }

        .content-wrapper li {
          margin-bottom: 12px;
          color: var(--foreground);
          line-height: 1.55;
          position: relative;
          padding-left: 38px;
        }

        .content-wrapper ul li::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0.62em;
          width: 8px;
          height: 8px;
          border-radius: 999px;
          background: color-mix(in srgb, var(--primary) 72%, white);
          box-shadow: 0 0 8px color-mix(in srgb, var(--primary) 72%, white);
        }

        .content-wrapper ol {
          counter-reset: content-steps;
        }

        .content-wrapper ol li {
          counter-increment: content-steps;
        }

        .content-wrapper ol li::before {
          content: counter(content-steps);
          position: absolute;
          left: 0;
          top: 0.1em;
          width: 28px;
          height: 28px;
          border-radius: 999px;
          background: color-mix(in srgb, var(--primary) 72%, white);
          color: var(--foreground);
          font-weight: 700;
          font-size: 14px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 10px color-mix(in srgb, var(--primary) 72%, white);
        }

        .content-wrapper blockquote {
          border-left: 4px solid ${accentColor};
          padding-left: 20px;
          margin: 20px 0;
          font-style: italic;
          color: var(--foreground);
        }

        .content-wrapper img {
          max-width: 100%;
          height: auto;
          border-radius: 15px;
          margin: 20px 0;
          border: 2px solid ${accentColor}44;
        }
        
        .faq-section {
          padding: 90px 0 20px;
          background: var(--background);
        }

        .faq-shell {
          background: var(--secondary);
          border-radius: 28px;
          padding: 42px 38px;
          border: 0;
          box-shadow: 0 0 10px var(--primary);
        }

        .faq-header {
          margin-bottom: 30px;
        }

        .faq-title {
          font-size: 3rem;
          line-height: 1;
          font-weight: 800;
          color: var(--primary);
          margin-bottom: 14px;
        }

        .faq-subtitle {
          font-size: 1.45rem;
          line-height: 1.5;
          color: var(--foreground);
          max-width: 720px;
        }

        .faq-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 14px 16px;
        }

        .faq-item {
          background: var(--secondary);
          border: 0;
          border-radius: 28px;
          padding: 24px 22px 22px;
          transition: background 0.25s ease, transform 0.25s ease;
          box-shadow: 0 0 10px var(--primary);
        }

        .faq-item.open {
          background: var(--secondary);
          box-shadow: 0 0 14px var(--primary);
        }

        .faq-question {
          width: 100%;
          background: transparent;
          border: 0;
          padding: 0;
          color: var(--primary);
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 16px;
          text-align: left;
          cursor: pointer;
          font-size: 1.125rem;
          font-weight: 700;
          line-height: 1.4;
        }

        .faq-question:hover {
          color: #ffffff;
        }

        .faq-toggle-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: var(--primary);
          flex-shrink: 0;
          margin-top: 2px;
          transition: transform 0.25s ease;
        }

        .faq-toggle-icon.open {
          transform: rotate(180deg);
        }

        .faq-answer {
          color: var(--foreground);
          line-height: 1.65;
          font-size: 1.03rem;
          max-height: 0;
          opacity: 0;
          overflow: hidden;
          transition: max-height 0.3s ease, opacity 0.25s ease, margin-top 0.25s ease;
          margin-top: 0;
          padding-right: 28px;
        }

        .faq-answer.open {
          max-height: 240px;
          opacity: 1;
          margin-top: 16px;
        }

        .final-cta {
          padding: 20px 0 8px;
        }

        .final-cta-shell {
          border: 0;
          border-radius: 26px;
          background: var(--secondary);
          padding: 64px 24px;
          text-align: center;
          box-shadow: 0 0 10px var(--primary);
        }

        .final-cta-title {
          font-size: clamp(2rem, 4.8vw, 3.4rem);
          line-height: 1.08;
          font-weight: 900;
          color: var(--primary);
          margin-bottom: 16px;
        }

        .final-cta-title span {
          color: var(--primary);
        }

        .final-cta-subtitle {
          color: var(--foreground);
          font-size: 32px;
          line-height: 1.45;
          margin-bottom: 30px;
        }

        @media (max-width: 768px) {
          .container {
            padding: 0 16px;
          }

          .header-content {
            flex-wrap: wrap;
            justify-content: center;
          }

          .header-nav {
            order: 3;
            width: 100%;
          }

          .header-nav-list {
            width: 100%;
            justify-content: center;
            flex-wrap: wrap;
            border-radius: 24px;
          }

          .header-buttons {
            width: 100%;
            justify-content: center;
          }

          .btn {
            padding: 12px 18px;
            font-size: 14px;
          }

          .hero-section {
            min-height: 520px;
            background-position: 66% center;
          }

          .hero-inner {
            
          }

          .hero-content {
            max-width: 100%;
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
            font-size: clamp(2rem, 9vw, 2.6rem);
            line-height: 1.04;
            margin-bottom: 14px;
          }

          .hero-description {
            max-width: 100%;
            font-size: 18px;
            line-height: 1.5;
            margin-bottom: 20px;
          }

          .hero-actions {
            margin-bottom: 24px;
            gap: 12px;
            align-items: center;
            flex-wrap: wrap;
          }

          .cta-button {
            width: auto;
            min-width: 136px;
            justify-content: center;
            padding: 12px 20px;
            font-size: 18px;
            box-shadow: 0 12px 28px rgba(29, 139, 248, 0.36);
          }

          .hero-secondary-link {
            width: auto;
            font-size: 18px;
            color: #8ea3bf;
            white-space: normal;
          }

          .hero-stats {
            width: 100%;
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 10px;
          }

          .hero-stat {
            min-width: 0;
          }

          .hero-stat-value {
            font-size: 34px;
            margin-bottom: 6px;
          }

          .hero-stat-label {
            font-size: 16px;
          }

          .site-footer {
            margin-top: 52px;
            padding: 30px 0 20px;
          }

          .footer-main {
            display: flex;
            gap: 22px;
            padding-bottom: 18px;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }

          .footer-brand {
            max-width: 100%;
          }

          .footer-logo {
            height: 32px;
          }

          .footer-brand p {
            font-size: 16px;
          }

          .footer-badges {
            justify-content: flex-start;
            padding-top: 0;
          }

          .footer-badge {
            font-size: 14px;
            height: 34px;
            padding: 0 12px;
          }

          .footer-links {
            align-items: flex-start;
            gap: 8px;
          }

          .footer-links a {
            font-size: 16px;
          }

          .footer-bottom {
            font-size: 14px;
           
            padding-top: 16px;
          }

          .bonus-popup {
            width: calc(100% - 20px);
            bottom: 10px;
            border-radius: 18px;
          }

          .popup-content {
            grid-template-columns: 44px 1fr auto auto;
            gap: 10px;
            padding: 10px 12px;
          }

          .popup-logo,
          .popup-logo-fallback {
            width: 44px;
            height: 44px;
            font-size: 18px;
          }

          .popup-tag {
            font-size: 10px;
            margin-bottom: 1px;
          }

          .popup-text {
            font-size: 16px;
          }

          .popup-cta {
            height: 34px;
            padding: 0 14px;
            font-size: 16px;
          }

          .popup-close {
            width: 24px;
            height: 24px;
            font-size: 20px;
          }

          .features {
            padding: 56px 0;
          }

          .features .container {
            grid-template-columns: 1fr;
          }

          .slots-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 14px;
          }

          

          .slots-title-wrap p {
            font-size: 16px;
          }

          .slots-nav {
            align-self: flex-end;
            padding-top: 0;
          }

          .slot-name {
            font-size: 18px;
          }

          .slot-link {
            height: 36px;
            font-size: 18px;
          }

          .content-wrapper {
            font-size: 16px;
          }

          .content-block {
            border-radius: 18px;
            padding: 22px 18px;
            margin-bottom: 14px;
          }

          .faq-shell {
            padding: 28px 20px;
            border-radius: 24px;
          }

          .faq-title {
            font-size: 2.2rem;
          }

          .faq-subtitle {
            font-size: 1.05rem;
          }

          .faq-grid {
            grid-template-columns: 1fr;
          }

          .final-cta-shell {
            padding: 38px 16px;
            border-radius: 20px;
          }

          .final-cta-title {
            font-size: 34px;
            margin-bottom: 12px;
          }

          .final-cta-subtitle {
            font-size: 18px;
            margin-bottom: 20px;
          }

          .faq-item {
            border-radius: 22px;
            padding: 20px 18px;
          }

          .faq-answer {
            padding-right: 0;
          }
        }

        @media (max-width: 420px) {
          .hero-section {
            min-height: 480px;
          }

          .hero-description {
            font-size: 17px;
          }

          .cta-button {
            font-size: 17px;
            min-width: 124px;
            padding: 11px 18px;
          }

          .hero-secondary-link {
            font-size: 17px;
          }

          .hero-stat-value {
            font-size: 30px;
          }

          .hero-stat-label {
            font-size: 14px;
          }

          .footer-brand p {
            font-size: 15px;
          }
        }
`

const processedContent = data.content ? wrapContentIntoBlocks(replaceVariables(data.content)) : ''

  // Parse html_head and inject into document head (client-side only)
  useEffect(() => {
    if (data.html_head && typeof document !== 'undefined') {
      // Create a temporary div to parse HTML
      const temp = document.createElement('div');
      temp.innerHTML = data.html_head;
      
      // Move all elements to document.head
      Array.from(temp.children).forEach((child) => {
        const clone = child.cloneNode(true) as HTMLElement;
        // Add identifier to track our injected elements
        clone.setAttribute('data-injected-from-strapi', 'true');
        document.head.appendChild(clone);
      });
      
      // Cleanup on unmount
      return () => {
        document.querySelectorAll('[data-injected-from-strapi="true"]').forEach((el) => {
          el.remove();
        });
      };
    }
  }, [data.html_head]);

  useEffect(() => {
    const updateVisibleSlots = () => {
      if (window.innerWidth <= 768) {
        setVisibleSlots(2)
      } else if (window.innerWidth <= 1120) {
        setVisibleSlots(4)
      } else {
        setVisibleSlots(5)
      }
    }

    updateVisibleSlots()
    window.addEventListener('resize', updateVisibleSlots)
    return () => window.removeEventListener('resize', updateVisibleSlots)
  }, [])

  useEffect(() => {
    const maxStart = Math.max(0, slots.length - visibleSlots)
    if (slotStartIndex > maxStart) {
      setSlotStartIndex(maxStart)
    }
  }, [slotStartIndex, slots.length, visibleSlots])

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight * 0.5) {
        setShowPopup(true)
      } else {
        setShowPopup(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (data.faq_schema && typeof document !== 'undefined') {
      const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map(({ question, answer }) => ({
          "@type": "Question",
          "name": question,
          "acceptedAnswer": { "@type": "Answer", "text": answer }
        }))
      };

      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.text = JSON.stringify(faqSchema);
      document.head.appendChild(script);


      return () => {
        document.head.removeChild(script);
      };
    }
  }, [faqs, data.faq_schema]);

  return (
    <>
      <Head>
        <title>{data.site_name || data.name}</title>
        <meta name="robots" content={data.allow_indexing ? 'index,follow' : 'noindex,nofollow'} />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>


      <style dangerouslySetInnerHTML={{ __html: dynamicStyles }} />
      <style dangerouslySetInnerHTML={{ __html: styles }} />

      <div className="page-shell">
        {/* Header */}
        <header>
          <div className="container">
            <div className="header-content">
              <div className="logo">
                <a href={normalizeUrl(urlSite)}>
                  <img src={getMediaUrl(data.logo)} alt={siteName} className="logo-image"/>
                </a>
              </div>
              <nav className="header-nav">
                <ul className="header-nav-list">
                  {data.header_menu && data.header_menu.length > 0 ? (
                    data.header_menu.map((item, index) => (
                      <li key={item.id || index} className="menu-item">
                        <a
                          href={redirectLink || getLinkUrl(item)}
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
                                href={redirectLink || getLinkUrl(subitem)}
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
                      <li className="menu-item"><a href="#home" className="nav-fallback-link">Online Casinos</a></li>
                      <li className="menu-item"><a href="#bonus" className="nav-fallback-link">Bonuses</a></li>
                      <li className="menu-item"><a href="#slots" className="nav-fallback-link">Online Slots</a></li>
                    </>
                  )}
                </ul>
              </nav>
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
          <div className="container hero-inner">
            <div className="hero-content">
              <span className="hero-badge">{heroBadge}</span>
              <h1 className="hero-title">
                <span className="hero-title-accent">{heroTitle}</span>
              </h1>
              <p className="hero-description">{heroSubtitle}</p>
              <div className="hero-actions">
                <button
                    className="cta-button"
                    onClick={() => {
                      const link = redirectLink ? redirectLink : '/';
                      window.open(link, '_blank');
                    }}
                >
                  {ctaText}
                  <span>›</span>
                </button>
                <a href="#content" className="hero-secondary-link">How we rate casinos →</a>
              </div>
              <div className="hero-stats">
                <div className="hero-stat">
                  <span className="hero-stat-value">1,420+</span>
                  <span className="hero-stat-label">Casinos reviewed</span>
                </div>
                <div className="hero-stat">
                  <span className="hero-stat-value">3,893</span>
                  <span className="hero-stat-label">Active bonuses</span>
                </div>
                <div className="hero-stat">
                  <span className="hero-stat-value">98%</span>
                  <span className="hero-stat-label">Player trust score</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {slots.length > 0 && (
          <section id="slots" className="slots-section">
            <div className="container">
              <div className="slots-head">
                <div className="slots-title-wrap">
                  <h2>{slotsTitle}</h2>
                </div>
                <div className="slots-nav">
                  <button
                    type="button"
                    className="slots-nav-btn"
                    onClick={handleSlotPrev}
                    disabled={slotStartIndex === 0}
                    aria-label="Previous slots"
                  >
                    <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 18l-6-6 6-6" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    className="slots-nav-btn"
                    onClick={handleSlotNext}
                    disabled={slotStartIndex >= Math.max(0, slots.length - visibleSlots)}
                    aria-label="Next slots"
                  >
                    <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 6l6 6-6 6" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className={`slots-grid ${slots.length < 5 ? 'is-fluid' : ''}`}>
                {slots.slice(slotStartIndex, slotStartIndex + visibleSlots).map((slot, index) => {
                  const logoUrl = getLogoUrl(slot)
                  const slotName = slot.Name || `Slot ${index + 1}`
                  const slotLink = redirectLink || slot.link || '#'

                  return (
                    <article key={slot.id || index} className="slot-card">
                      {logoUrl ? (
                        <img src={logoUrl} alt={slotName} className="slot-image" />
                      ) : (
                        <div className="slot-logo-placeholder" />
                      )}
                      <div className="slot-overlay">
                        <div className="slot-name">{slotName}</div>
                        <a href={slotLink} className="slot-link" target="_blank" rel="noopener noreferrer">
                          {slotButtonText}
                        </a>
                      </div>
                    </article>
                  )
                })}
              </div>
            </div>
          </section>
        )}

        {processedContent && (
          <section id="content" className="content-section">
            <div className="content-wrapper" dangerouslySetInnerHTML={{ __html: processedContent }} />
          </section>
        )}

        <section className="features">
          <div className="container">
          <div className="feature">
            <h3>⚡ Lightning Fast</h3>
            <p>{data.features_list?.split('\n')[0] }</p>
          </div>
          <div className="feature">
            <h3>🎮 Modern Games</h3>
            <p>{data.features_list?.split('\n')[1] }</p>
          </div>
          <div className="feature">
            <h3>🔐 Secure</h3>
            <p>{data.features_list?.split('\n')[2] }</p>
          </div>
          </div>
        </section>




        {/* FAQ */}
        {faqs.length > 0 && (
            <section id="faq" className="faq-section">
              <div className="container">
                <div className="faq-shell">
                  <div className="faq-header">
                    <h2 className="faq-title">{faqTitle || 'FAQ'}</h2>
                    <p className="faq-subtitle">
                      Quick answers to the questions players ask us most.
                    </p>
                  </div>
                  <div className="faq-grid">
                    {faqs.map((item, index) => {
                      const isOpen = openFaqIndex === index;

                      return (
                        <div key={item.id || index} className={`faq-item ${isOpen ? 'open' : ''}`}>
                          <button
                            type="button"
                            className="faq-question"
                            onClick={() => setOpenFaqIndex(isOpen ? -1 : index)}
                            aria-expanded={isOpen}
                          >
                            <span>{item.question}</span>
                            <span className={`faq-toggle-icon ${isOpen ? 'open' : ''}`}>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="m6 9 6 6 6-6"></path>
                              </svg>
                            </span>
                          </button>
                          <div className={`faq-answer ${isOpen ? 'open' : ''}`}>{item.answer}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </section>
        )}

        <section className="final-cta">
          <div className="container">
            <div className="final-cta-shell">
              <h2 className="final-cta-title">
                Ready to claim your <span>€500 welcome bonus</span>?
              </h2>
              <p className="final-cta-subtitle">
                Verified operator. Instant withdrawals. Play responsibly - 18+ only.
              </p>
              <button
                className="cta-button"
                onClick={() => {
                  const link = redirectLink ? redirectLink : '/'
                  window.open(link, '_blank')
                }}
              >
                {ctaText}
                <span>›</span>
              </button>
            </div>
          </div>
        </section>


      </div>

      <footer className="site-footer">
        <div className="container">
          <div className="footer-main">
            <div className="footer-brand">
              <a className="footer-logo-link" href={normalizeUrl(urlSite)}>
                <img src={getMediaUrl(data.logo)} alt={siteName} className="footer-logo" />
              </a>

            </div>

            <div className="footer-badges" aria-label="Trust badges">
              <span className="footer-badge">18+</span>
              <span className="footer-badge">GamCare</span>
              <span className="footer-badge">FairPlay</span>
            </div>

            <ul className="footer-links">
              {(data.footer_menu && data.footer_menu.length > 0 ? data.footer_menu : [
                { label: 'About Us', url: '#', open_in_new_tab: false },
                { label: 'Terms and Conditions', url: '#', open_in_new_tab: false },
                { label: 'Responsible Gambling', url: '#', open_in_new_tab: false },
              ]).map((item, index) => (
                <li key={item.id || index}>
                  <a
                    href={getLinkUrl(item)}
                    target={item.open_in_new_tab ? '_blank' : '_self'}
                    rel={item.open_in_new_tab ? 'noopener noreferrer' : undefined}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="footer-bottom">
            {data.footer_text || `© ${new Date().getFullYear()} ${siteName}. Gambling involves risk. Play responsibly.`}
          </div>
        </div>
      </footer>

      <div className={`bonus-popup ${showPopup ? '' : 'hidden'}`}>
        <div className="popup-content">
          {getMediaUrl(data.popup_logo) ? (
            <img src={getMediaUrl(data.popup_logo)} alt="Popup logo" className="popup-logo" />
          ) : (
            <span className="popup-logo-fallback">{siteName.slice(0, 2).toUpperCase()}</span>
          )}
          <div className="popup-text-wrap">
            
            <div className="popup-text">{popupText}</div>
          </div>
          <button
            className="popup-cta"
            onClick={() => {
              const link = redirectLink ? redirectLink : '/'
              window.open(link, '_blank')
            }}
          >
            {slotButtonText}
          </button>
          <button className="popup-close" onClick={() => setShowPopup(false)} aria-label="Close popup">
            ×
          </button>
        </div>
      </div>
    </>
  )
}
