const LOGO_URL = "https://cdn-production-opera-website.operacdn.com/staticfiles/assets/images/logo/gx/opera-gx__logo--white.160608602ec9.svg";
const CTA_URL = "https://osyvia.com/ogx/7155/";
const CTA_TEXT = "Download Opera GX";
const BRAND_NAME = "Opera GX";
const PAGE_VARIANT = "A";

window.dataLayer = window.dataLayer || [];

function getUrlParams() {
    const params = new URLSearchParams(window.location.search);
    const paramObj = {};
    for (const [key, value] of params.entries()) {
        paramObj[key] = value;
    }
    return paramObj;
}

function buildCtaUrl() {
    const params = getUrlParams();
    const url = new URL(CTA_URL);

    Object.keys(params).forEach(key => {
        if (!url.searchParams.has(key)) {
            url.searchParams.append(key, params[key]);
        }
    });

    return url.toString();
}

function trackClick() {
    const params = getUrlParams();
    window.dataLayer.push({
        event: "lander_click",
        clickid: params.clickid || '',
        utm_source: params.utm_source || '',
        page_variant: PAGE_VARIANT
    });
}

function initializePage() {
    const logo = document.getElementById('logo');
    if (logo) {
        logo.src = LOGO_URL;
        logo.alt = BRAND_NAME;
    }

    const ctaButtons = document.querySelectorAll('.cta-button');
    const finalUrl = buildCtaUrl();

    ctaButtons.forEach(button => {
        button.textContent = CTA_TEXT;
        button.href = finalUrl;

        button.addEventListener('click', function(e) {
            trackClick();
        });
    });

    const brandElements = document.querySelectorAll('[data-brand]');
    brandElements.forEach(el => {
        el.textContent = el.textContent.replace(/Opera GX/g, BRAND_NAME);
    });
}

function initializeFaq() {
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const isActive = this.classList.contains('active');

            document.querySelectorAll('.faq-question').forEach(q => {
                q.classList.remove('active');
            });
            document.querySelectorAll('.faq-answer').forEach(a => {
                a.classList.remove('active');
            });

            if (!isActive) {
                this.classList.add('active');
                answer.classList.add('active');
            }
        });
    });
}

function initializeModals() {
    const modalLinks = document.querySelectorAll('.footer-link');
    const modalCloseButtons = document.querySelectorAll('.modal-close');
    const modalOverlays = document.querySelectorAll('.modal-overlay');

    modalLinks.forEach(link => {
        link.addEventListener('click', function() {
            const modalType = this.getAttribute('data-modal');
            const modal = document.getElementById(modalType + 'Modal');
            if (modal) {
                modal.classList.add('active');
            }
        });
    });

    modalCloseButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modalType = this.getAttribute('data-close');
            const modal = document.getElementById(modalType + 'Modal');
            if (modal) {
                modal.classList.remove('active');
            }
        });
    });

    modalOverlays.forEach(overlay => {
        overlay.addEventListener('click', function(e) {
            if (e.target === overlay) {
                overlay.classList.remove('active');
            }
        });
    });
}

function initializeStickyMobileCta() {
    const stickyCtaElement = document.getElementById('stickyMobileCta');
    let hasScrolledEnough = false;

    window.addEventListener('scroll', function() {
        const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;

        if (scrollPercentage >= 35 && !hasScrolledEnough) {
            hasScrolledEnough = true;
            stickyCtaElement.classList.add('visible');
        } else if (scrollPercentage < 35 && hasScrolledEnough) {
            hasScrolledEnough = false;
            stickyCtaElement.classList.remove('visible');
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    initializePage();
    initializeFaq();
    initializeModals();
    initializeStickyMobileCta();
});
