import Document, {
    Html,
    Head,
    Main,
    NextScript,
    DocumentContext,
    DocumentInitialProps,
} from 'next/document'
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

interface CustomDocumentProps extends DocumentInitialProps {
    lang: string
    faviconHref: string | null
}

export default class MyDocument extends Document<CustomDocumentProps> {
    static async getInitialProps(
        ctx: DocumentContext
    ): Promise<CustomDocumentProps> {
        const initialProps = await Document.getInitialProps(ctx)
        const data = require('../data.json')

        const defaultLang = data?.language_code || 'en'
        let lang = defaultLang

        const slugParam = ctx.query?.slug
        const slug = Array.isArray(slugParam) ? slugParam[0] : slugParam

        if (slug && Array.isArray(data?.pages)) {
            const currentPage = data.pages.find((page: any) => page?.slug === slug)
            lang = currentPage?.lang || defaultLang || 'en'
        }

        return {
            ...initialProps,
            lang,
            faviconHref: getFaviconHref(),
        }
    }

    render() {
        const { lang, faviconHref } = this.props

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
}