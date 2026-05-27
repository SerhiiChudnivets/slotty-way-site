import React, { useEffect } from 'react'
import Head from 'next/head'
import { GetStaticPaths, GetStaticProps } from 'next'
import fs from 'fs'
import path from 'path'

import DefaultTemplate from '../templates/DefaultTemplate'
import BlogTemplate from '../templates/BlogTemplate'
import LandingTemplate from '../templates/LandingTemplate'
import MinimalTemplate from '../templates/MinimalTemplate'
import FullWidthTemplate from '../templates/FullWidthTemplate'

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
  template?: 'default' | 'blog' | 'landing' | 'minimal' | 'full-width'
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

const templates = {
  default: DefaultTemplate,
  blog: BlogTemplate,
  landing: LandingTemplate,
  minimal: MinimalTemplate,
  'full-width': FullWidthTemplate,
}

export default function DynamicPage({ page, site }: { page: PageData; site: SiteData }) {
  const siteName = site.site_name || site.name

  const Template = (templates[page.template || 'default'] || templates.default) as React.ComponentType<{
    page: PageData
    site: SiteData
  }>

  return (
    <>
      <Template page={page} site={site} />
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const dataPath = path.join(process.cwd(), 'data.json')
  const data: SiteData = JSON.parse(fs.readFileSync(dataPath, 'utf8'))
  
  const paths = data.pages?.map(page => ({
    params: { slug: page.slug }
  })) || []

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const dataPath = path.join(process.cwd(), 'data.json')
  const data: SiteData = JSON.parse(fs.readFileSync(dataPath, 'utf8'))
  
  const page = data.pages?.find(p => p.slug === params?.slug)

  if (!page) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      page,
      site: {
        name: data.name,
        url: data.url,
        site_name: data.site_name,
        accent_color: data.accent_color,
        footer_text: data.footer_text,
        allow_indexing: data.allow_indexing,
        logo: data.logo,
        login_text: data.login_text,
        register_text: data.register_text,
        redirect_link: data.redirect_link,
        pages: data.pages,
        header_menu: data.header_menu,
        footer_menu: data.footer_menu
      }
    }
  }
}
