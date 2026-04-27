import { inspectorMetadata } from "../../shared/inspectorMetadata";
import { TOUR_HREF, TOUR_ORDER } from "../../shared/nav";
import { frameworkLabel } from "../inspector/renderInspectorMarkup";
const escape = (input) => input.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
export const TOUR_FOOTER_PLACEHOLDER = "<!--ABSOLUTEOPS_TOUR_FOOTER-->";
const TOUR_INLINE_CSS = `
.ao-tour{position:sticky;bottom:0;left:0;right:0;z-index:90;display:flex;align-items:center;gap:12px;padding:10px 16px;margin:32px auto 0;max-width:1200px;background:rgba(12,16,24,.86);border-top:1px solid rgba(160,180,240,.18);border-left:1px solid rgba(160,180,240,.10);border-right:1px solid rgba(160,180,240,.10);border-radius:14px 14px 0 0;backdrop-filter:blur(14px) saturate(140%);-webkit-backdrop-filter:blur(14px) saturate(140%);font-family:ui-sans-serif,system-ui,-apple-system,'Inter','Segoe UI',Roboto,sans-serif;color:#e6ecf5;box-shadow:0 -8px 24px rgba(2,4,10,.4)}
.ao-tour__step{flex:0 0 auto;font-size:11px;color:#6c7892;text-transform:uppercase;letter-spacing:.08em;font-weight:600}
.ao-tour__spacer{flex:1 1 auto}
.ao-tour__btn{display:inline-flex;align-items:center;gap:8px;padding:8px 14px;border-radius:10px;border:1px solid rgba(160,180,240,.22);background:rgba(20,26,42,.55);color:#e6ecf5;text-decoration:none;font-size:13px;font-weight:500;line-height:1.2;transition:transform .18s,border-color .18s,background .18s;max-width:48%}
.ao-tour__btn:hover{transform:translateY(-1px);border-color:rgba(160,180,240,.45);background:rgba(20,26,42,.85)}
.ao-tour__btn--prev{padding-left:10px}
.ao-tour__btn--next{padding-right:10px;background:rgba(124,92,255,.18);border-color:rgba(124,92,255,.40)}
.ao-tour__btn--next:hover{background:rgba(124,92,255,.28);border-color:rgba(124,92,255,.60)}
.ao-tour__arrow{font-size:14px;line-height:1;flex:0 0 auto;color:#98a4be}
.ao-tour__btn--next .ao-tour__arrow{color:#e6ecf5}
.ao-tour__txt{display:flex;flex-direction:column;align-items:flex-start;gap:1px;min-width:0;line-height:1.2}
.ao-tour__btn--next .ao-tour__txt{align-items:flex-end}
.ao-tour__caption{font-size:10px;color:#6c7892;text-transform:uppercase;letter-spacing:.08em;font-weight:600;line-height:1}
.ao-tour__label{font-size:13px;color:#e6ecf5;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:100%}
.ao-tour__fw{display:inline-flex;align-items:center;gap:6px;font-size:11px;color:#98a4be;margin-top:2px;line-height:1}
.ao-tour__fw-dot{width:7px;height:7px;border-radius:50%;background:#98a4be;flex:0 0 auto}
.ao-tour__btn[data-framework="html"] .ao-tour__fw-dot{background:#e34c26}
.ao-tour__btn[data-framework="htmx"] .ao-tour__fw-dot{background:#3d72d7}
.ao-tour__btn[data-framework="react"] .ao-tour__fw-dot{background:#61dafb}
.ao-tour__btn[data-framework="svelte"] .ao-tour__fw-dot{background:#ff3e00}
.ao-tour__btn[data-framework="vue"] .ao-tour__fw-dot{background:#4fc08d}
.ao-tour__btn[data-framework="angular"] .ao-tour__fw-dot{background:#dd0031}
.ao-tour__btn[data-framework="islands"] .ao-tour__fw-dot{background:linear-gradient(90deg,#3d72d7,#ff3e00)}
.ao-tour__placeholder{flex:0 0 auto;width:1px;height:1px}
@media (max-width:560px){.ao-tour{flex-wrap:wrap;gap:8px;padding:10px}.ao-tour__step{flex-basis:100%;text-align:center}.ao-tour__btn{flex:1 1 0;max-width:none;font-size:12px;padding:7px 10px}.ao-tour__label{font-size:12px}}
`;
const surfaceLabelFor = (key) => {
  const meta = inspectorMetadata[key];
  const map = {
    admin: "Enterprise admin",
    aiBriefing: "AI briefing",
    architecture: "Architecture",
    dashboard: "Executive dashboard",
    field: "Mobile field app",
    industry: "Industry landings",
    landing: "Landing",
    track: "Customer tracking",
    workspace: "Operator workspace"
  };
  return { framework: meta.framework, label: map[key] };
};
const renderBtn = (key, direction) => {
  const { label, framework } = surfaceLabelFor(key);
  const href = TOUR_HREF[key];
  const arrow = direction === "prev" ? "←" : "→";
  const caption = direction === "prev" ? "Previous" : "Next";
  const fw = frameworkLabel(framework);
  const txt = `<span class="ao-tour__txt"><span class="ao-tour__caption">${escape(caption)}</span><span class="ao-tour__label">${escape(label)}</span><span class="ao-tour__fw"><span class="ao-tour__fw-dot" aria-hidden="true"></span>${escape(fw)}</span></span>`;
  const arrowSpan = `<span class="ao-tour__arrow" aria-hidden="true">${arrow}</span>`;
  const inner = direction === "prev" ? `${arrowSpan}${txt}` : `${txt}${arrowSpan}`;
  return `<a class="ao-tour__btn ao-tour__btn--${direction}" data-framework="${escape(framework)}" href="${escape(href)}">${inner}</a>`;
};
export const renderTourFooter = (current) => {
  if (!TOUR_ORDER.includes(current))
    return "";
  const idx = TOUR_ORDER.indexOf(current);
  const total = TOUR_ORDER.length;
  const prev = idx > 0 ? TOUR_ORDER[idx - 1] : null;
  const next = idx < total - 1 ? TOUR_ORDER[idx + 1] : null;
  const stepText = `Demo tour · Step ${idx + 1} of ${total}`;
  const prevBtn = prev ? renderBtn(prev, "prev") : '<span class="ao-tour__placeholder" aria-hidden="true"></span>';
  const nextBtn = next ? renderBtn(next, "next") : '<span class="ao-tour__placeholder" aria-hidden="true"></span>';
  return `<style>${TOUR_INLINE_CSS}</style>
<nav class="ao-tour" aria-label="Demo tour navigation">
${prevBtn}
<div class="ao-tour__spacer"></div>
<span class="ao-tour__step">${escape(stepText)}</span>
<div class="ao-tour__spacer"></div>
${nextBtn}
</nav>`;
};
