import { Html, Head, Main, NextScript } from 'next/document'
import fs from 'fs'
import path from 'path'

function getFaviconHref(): string | null {
  const publicDir = path.join(process.cwd(), 'public')
  const extensions = ['.ico', '.png', '.svg', '.jpg', '.jpeg', '.gif', '.webp']
  for (const ext of extensions) {
    if (fs.existsSync(path.join(publicDir, `favicon${ext}`))) {
      return `/favicon${ext}`
    }
  }
  return null
}

export default function Document() {
    const data = require('../data.json')
    const lang = data.language_code || 'en'
    const faviconHref = getFaviconHref()
      return (
        <Html lang={lang}>
          <Head>
            {faviconHref && <link rel="icon" href={faviconHref} />}
          </Head>
          <body>
            <Main />
            <NextScript />
          </body>
        </Html>
      )
}
