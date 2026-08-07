import { router } from "@inertiajs/react";

/** IDs of the scrollable sections on the home page. */
const HOME_ANCHORS = ["about", "services", "contact"];

export function isHash(href) {
    return typeof href === "string" && href.startsWith("#");
}

export function scrollToHash(hash) {
    const id = hash.slice(1);

    if (!id) return;

    requestAnimationFrame(() => {
        const el = document.getElementById(id);

        if (!el) return;

        el.scrollIntoView({ behavior: "smooth" });
    });
}

/**
 * Scroll to a hash, then re-scroll a few times shortly after.
 * As images/fonts finish loading the page height changes, so a single
 * scroll can land slightly off-target; repeating the scroll settles it.
 */
function scrollToHashWithRetry(hash) {
    [0, 300, 800, 1500].forEach((delay) => {
        setTimeout(() => scrollToHash(hash), delay);
    });
}

/**
 * Navigate to a hash that lives on the home page.
 * If we're already on the home page, scroll smoothly.
 * Otherwise, go home, then scroll once the page has loaded.
 */
export function navigateToHomeAnchor(hash) {
    const onHome = window.location.pathname === "/";

    if (onHome) {
        scrollToHashWithRetry(hash);
        return;
    }

    let scrolled = false;

    router.visit(route("home"), {
        preserveState: false,
        onSuccess: () => {
            if (!scrolled) {
                scrolled = true;
                scrollToHashWithRetry(hash);
            }
        },
    });
}

/**
 * Central handler for any element whose href may be a home anchor
 * ("#about", "#services", "#contact") or a normal route. Returns false
 * when an anchor was handled (so callers can preventDefault), true
 * otherwise.
 */
export function handleHashHref(href, e) {
    if (!isHash(href)) return true;

    const id = href.slice(1);

    if (!HOME_ANCHORS.includes(id)) return true;

    e?.preventDefault();

    navigateToHomeAnchor(href);

    return false;
}
