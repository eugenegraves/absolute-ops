import { inspectorMetadata } from "../../shared/inspectorMetadata";
const escape = (input) => input.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const row = (key, value) => `<div class="ao-inspector__row"><div class="ao-inspector__key">${escape(key)}</div><div class="ao-inspector__val">${escape(value)}</div></div>`;
const panelMarkup = (m) => `<div class="ao-inspector__panel" role="dialog" aria-label="Framework Inspector">
<p class="ao-inspector__title">Framework Inspector</p>
${row("Route", m.route)}
${row("Surface", m.surface)}
${row("UI Model", m.uiModel)}
${row("Render", m.render)}
${row("Server", m.server)}
${row("State", m.state)}
${row("Payload", m.payload)}
<p class="ao-inspector__shortcut">Toggle with <span class="ao-inspector__kbd">\\</span></p>
</div>`;
export const INSPECTOR_INLINE_CSS = `
.ao-inspector{position:fixed;right:16px;bottom:16px;z-index:9999;font-family:ui-sans-serif,system-ui,-apple-system,'Inter','Segoe UI',Roboto,sans-serif;color:#e6ecf5;pointer-events:auto}
.ao-inspector__pill{display:inline-flex;align-items:center;gap:8px;padding:8px 14px;border-radius:999px;background:rgba(20,26,42,.92);border:1px solid rgba(160,180,240,.28);box-shadow:0 12px 32px rgba(2,4,10,.5),0 1px 0 rgba(255,255,255,.06) inset;font-size:12px;cursor:pointer;color:#e6ecf5;backdrop-filter:blur(10px) saturate(140%);-webkit-backdrop-filter:blur(10px) saturate(140%);user-select:none;line-height:1}
.ao-inspector__pill:hover{border-color:rgba(160,180,240,.5)}
.ao-inspector__dot{width:8px;height:8px;border-radius:50%;background:linear-gradient(135deg,#7c5cff,#4cc6f5);box-shadow:0 0 0 2px rgba(124,92,255,.18)}
.ao-inspector__panel{position:absolute;right:0;bottom:44px;min-width:320px;max-width:380px;background:rgba(12,16,24,.96);border:1px solid rgba(160,180,240,.28);border-radius:14px;padding:14px 16px 16px;box-shadow:0 24px 64px rgba(2,4,10,.7),0 1px 0 rgba(255,255,255,.06) inset;font-size:12px;line-height:1.5;display:none}
.ao-inspector[data-open="1"] .ao-inspector__panel{display:block}
.ao-inspector__title{font-size:11px;font-weight:600;color:#98a4be;letter-spacing:.08em;text-transform:uppercase;margin:0 0 8px}
.ao-inspector__row{display:flex;gap:10px;padding:5px 0;border-bottom:1px dashed rgba(160,180,240,.12)}
.ao-inspector__row:last-of-type{border-bottom:none}
.ao-inspector__key{flex:0 0 88px;color:#6c7892;font-size:11px;text-transform:uppercase;letter-spacing:.06em}
.ao-inspector__val{flex:1;color:#e6ecf5}
.ao-inspector__shortcut{margin-top:10px;font-size:10.5px;color:#6c7892;letter-spacing:.04em}
.ao-inspector__kbd{display:inline-block;padding:1px 6px;border-radius:5px;background:rgba(160,180,240,.1);border:1px solid rgba(160,180,240,.24);font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:10.5px;color:#c2cce0}
`;
export const INSPECTOR_INLINE_SCRIPT = `(function(){
function init(){
var root=document.getElementById('ao-inspector');
if(!root)return;
if(root.getAttribute('data-bound')==='1')return;
root.setAttribute('data-bound','1');
var pill=root.querySelector('.ao-inspector__pill');
function toggle(force){
var open=root.getAttribute('data-open')==='1';
var next=typeof force==='boolean'?force:!open;
root.setAttribute('data-open',next?'1':'0');
}
pill && pill.addEventListener('click',function(){toggle();});
document.addEventListener('keydown',function(e){
if(e.key==='\\\\'){
var t=e.target;
if(t && (t.tagName==='INPUT'||t.tagName==='TEXTAREA'||t.isContentEditable))return;
toggle();
}
});
}
if(document.readyState==='loading'){
document.addEventListener('DOMContentLoaded',init);
}else{
init();
}
})();`;
export const inspectorPillLabel = (m) => `${m.uiModel} · ${m.render.split(" ")[0] ?? m.render}`;
export const inspectorHeadScriptTag = () => `<script>${INSPECTOR_INLINE_SCRIPT}</script>`;
export const renderInspectorMarkup = (key) => {
  const m = inspectorMetadata[key];
  return `<style>${INSPECTOR_INLINE_CSS}</style>
<aside id="ao-inspector" class="ao-inspector" data-open="0">
<button type="button" class="ao-inspector__pill" aria-label="Toggle Framework Inspector">
<span class="ao-inspector__dot"></span>
<span>${escape(inspectorPillLabel(m))}</span>
</button>
${panelMarkup(m)}
</aside>
<script>${INSPECTOR_INLINE_SCRIPT}</script>`;
};
