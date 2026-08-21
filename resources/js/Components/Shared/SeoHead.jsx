import { Head } from "@inertiajs/react";

const SITE_NAME = "SMART MIRAH HOSPITALITY";
const SITE_URL = "https://smartmirah.com";
const DEFAULT_IMAGE = `${SITE_URL}/images/logo-with-name.png`;

/**
 * Per-page SEO head manager.
 *
 * @param {object} props
 * @param {string} props.title - Page title (site name is appended automatically).
 * @param {string} [props.description] - Meta description for this page.
 * @param {string} [props.image] - Absolute URL of the social share image.
 * @param {string} [props.path] - Canonical path, e.g. "/products". Defaults to current URL.
 * @param {string} [props.type] - Open Graph type ("website" or "product").
 * @param {object} [props.children] - Extra <meta>/<link> tags (e.g. JSON-LD).
 */
export default function SeoHead({
    title,
    description,
    image = DEFAULT_IMAGE,
    path,
    type = "website",
    children,
}) {
    const canonical = path ? `${SITE_URL}${path}` : undefined;

    return (
        <Head title={title ? `${title} - ${SITE_NAME}` : SITE_NAME}>
            {description && <meta name="description" content={description} />}
            {canonical && <link rel="canonical" href={canonical} />}

            <meta property="og:type" content={type} />
            <meta property="og:title" content={title ? `${title} - ${SITE_NAME}` : SITE_NAME} />
            {description && <meta property="og:description" content={description} />}
            {canonical && <meta property="og:url" content={canonical} />}
            <meta property="og:image" content={image} />

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title ? `${title} - ${SITE_NAME}` : SITE_NAME} />
            {description && <meta name="twitter:description" content={description} />}
            <meta name="twitter:image" content={image} />

            {children}
        </Head>
    );
}
