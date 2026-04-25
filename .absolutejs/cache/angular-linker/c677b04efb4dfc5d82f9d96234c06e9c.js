/**
 * @license Angular v21.0.0
 * (c) 2010-2025 Google LLC. https://angular.dev/
 * License: MIT
 */

export { BrowserModule, bootstrapApplication, createApplication, platformBrowser, provideProtractorTestingSupport, BrowserDomAdapter as ɵBrowserDomAdapter, BrowserGetTestability as ɵBrowserGetTestability, KeyEventsPlugin as ɵKeyEventsPlugin } from './_browser-chunk.mjs';
import { ɵgetDOM as _getDOM, DOCUMENT } from '@angular/common';
export { ɵgetDOM } from '@angular/common';
import * as i0 from '@angular/core';
import { Injectable, Inject, ɵglobal as _global, ApplicationRef, InjectionToken, ɵConsole as _Console, Optional, Injector, NgModule, forwardRef, ɵRuntimeError as _RuntimeError, ɵXSS_SECURITY_URL as _XSS_SECURITY_URL, SecurityContext, ɵallowSanitizationBypassAndThrow as _allowSanitizationBypassAndThrow, ɵunwrapSafeValue as _unwrapSafeValue, ɵ_sanitizeUrl as __sanitizeUrl, ɵ_sanitizeHtml as __sanitizeHtml, ɵbypassSanitizationTrustHtml as _bypassSanitizationTrustHtml, ɵbypassSanitizationTrustStyle as _bypassSanitizationTrustStyle, ɵbypassSanitizationTrustScript as _bypassSanitizationTrustScript, ɵbypassSanitizationTrustUrl as _bypassSanitizationTrustUrl, ɵbypassSanitizationTrustResourceUrl as _bypassSanitizationTrustResourceUrl, ɵwithI18nSupport as _withI18nSupport, ɵwithEventReplay as _withEventReplay, ɵwithIncrementalHydration as _withIncrementalHydration, makeEnvironmentProviders, ɵwithDomHydration as _withDomHydration, ENVIRONMENT_INITIALIZER, inject, ɵIS_ENABLED_BLOCKING_INITIAL_NAVIGATION as _IS_ENABLED_BLOCKING_INITIAL_NAVIGATION, ɵformatRuntimeError as _formatRuntimeError, Version } from '@angular/core';
import { EventManagerPlugin, EVENT_MANAGER_PLUGINS } from './_dom_renderer-chunk.mjs';
export { EventManager, REMOVE_STYLES_ON_COMPONENT_DESTROY, DomEventsPlugin as ɵDomEventsPlugin, DomRendererFactory2 as ɵDomRendererFactory2, SharedStylesHost as ɵSharedStylesHost } from './_dom_renderer-chunk.mjs';
import { ɵwithHttpTransferCache as _withHttpTransferCache } from '@angular/common/http';
class Meta {
  _doc;
  _dom;
  constructor(_doc) {
    this._doc = _doc;
    this._dom = _getDOM();
  }
  addTag(tag, forceCreation = false) {
    if (!tag) return null;
    return this._getOrCreateElement(tag, forceCreation);
  }
  addTags(tags, forceCreation = false) {
    if (!tags) return [];
    return tags.reduce((result, tag) => {
      if (tag) {
        result.push(this._getOrCreateElement(tag, forceCreation));
      }
      return result;
    }, []);
  }
  getTag(attrSelector) {
    if (!attrSelector) return null;
    return this._doc.querySelector(`meta[${attrSelector}]`) || null;
  }
  getTags(attrSelector) {
    if (!attrSelector) return [];
    const list = this._doc.querySelectorAll(`meta[${attrSelector}]`);
    return list ? [].slice.call(list) : [];
  }
  updateTag(tag, selector) {
    if (!tag) return null;
    selector = selector || this._parseSelector(tag);
    const meta = this.getTag(selector);
    if (meta) {
      return this._setMetaElementAttributes(tag, meta);
    }
    return this._getOrCreateElement(tag, true);
  }
  removeTag(attrSelector) {
    this.removeTagElement(this.getTag(attrSelector));
  }
  removeTagElement(meta) {
    if (meta) {
      this._dom.remove(meta);
    }
  }
  _getOrCreateElement(meta, forceCreation = false) {
    if (!forceCreation) {
      const selector = this._parseSelector(meta);
      const elem = this.getTags(selector).filter(elem => this._containsAttributes(meta, elem))[0];
      if (elem !== undefined) return elem;
    }
    const element = this._dom.createElement('meta');
    this._setMetaElementAttributes(meta, element);
    const head = this._doc.getElementsByTagName('head')[0];
    head.appendChild(element);
    return element;
  }
  _setMetaElementAttributes(tag, el) {
    Object.keys(tag).forEach(prop => el.setAttribute(this._getMetaKeyMap(prop), tag[prop]));
    return el;
  }
  _parseSelector(tag) {
    const attr = tag.name ? 'name' : 'property';
    return `${attr}="${tag[attr]}"`;
  }
  _containsAttributes(tag, elem) {
    return Object.keys(tag).every(key => elem.getAttribute(this._getMetaKeyMap(key)) === tag[key]);
  }
  _getMetaKeyMap(prop) {
    return META_KEYS_MAP[prop] || prop;
  }
  static ɵfac = function Meta_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || Meta)(i0.ɵɵinject(DOCUMENT));
  };
  static ɵprov = /* @__PURE__ */i0.ɵɵdefineInjectable({
    token: Meta,
    factory: Meta.ɵfac,
    providedIn: 'root'
  });
}
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(Meta, [{
    type: Injectable,
    args: [{
      providedIn: 'root'
    }]
  }], () => [{
    type: undefined,
    decorators: [{
      type: Inject,
      args: [DOCUMENT]
    }]
  }], null);
})();
const META_KEYS_MAP = {
  httpEquiv: 'http-equiv'
};
class Title {
  _doc;
  constructor(_doc) {
    this._doc = _doc;
  }
  getTitle() {
    return this._doc.title;
  }
  setTitle(newTitle) {
    this._doc.title = newTitle || '';
  }
  static ɵfac = function Title_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || Title)(i0.ɵɵinject(DOCUMENT));
  };
  static ɵprov = /* @__PURE__ */i0.ɵɵdefineInjectable({
    token: Title,
    factory: Title.ɵfac,
    providedIn: 'root'
  });
}
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(Title, [{
    type: Injectable,
    args: [{
      providedIn: 'root'
    }]
  }], () => [{
    type: undefined,
    decorators: [{
      type: Inject,
      args: [DOCUMENT]
    }]
  }], null);
})();
function exportNgVar(name, value) {
  if (typeof COMPILED === 'undefined' || !COMPILED) {
    const ng = _global['ng'] = _global['ng'] || {};
    ng[name] = value;
  }
}
class ChangeDetectionPerfRecord {
  msPerTick;
  numTicks;
  constructor(msPerTick, numTicks) {
    this.msPerTick = msPerTick;
    this.numTicks = numTicks;
  }
}
class AngularProfiler {
  appRef;
  constructor(ref) {
    this.appRef = ref.injector.get(ApplicationRef);
  }
  timeChangeDetection(config) {
    const record = config && config['record'];
    const profileName = 'Change Detection';
    if (record && 'profile' in console && typeof console.profile === 'function') {
      console.profile(profileName);
    }
    const start = performance.now();
    let numTicks = 0;
    while (numTicks < 5 || performance.now() - start < 500) {
      this.appRef.tick();
      numTicks++;
    }
    const end = performance.now();
    if (record && 'profileEnd' in console && typeof console.profileEnd === 'function') {
      console.profileEnd(profileName);
    }
    const msPerTick = (end - start) / numTicks;
    console.log(`ran ${numTicks} change detection cycles`);
    console.log(`${msPerTick.toFixed(2)} ms per check`);
    return new ChangeDetectionPerfRecord(msPerTick, numTicks);
  }
}
const PROFILER_GLOBAL_NAME = 'profiler';
function enableDebugTools(ref) {
  exportNgVar(PROFILER_GLOBAL_NAME, new AngularProfiler(ref));
  return ref;
}
function disableDebugTools() {
  exportNgVar(PROFILER_GLOBAL_NAME, null);
}
class By {
  static all() {
    return () => true;
  }
  static css(selector) {
    return debugElement => {
      return debugElement.nativeElement != null ? elementMatches(debugElement.nativeElement, selector) : false;
    };
  }
  static directive(type) {
    return debugNode => debugNode.providerTokens.indexOf(type) !== -1;
  }
}
function elementMatches(n, selector) {
  if (_getDOM().isElementNode(n)) {
    return n.matches && n.matches(selector) || n.msMatchesSelector && n.msMatchesSelector(selector) || n.webkitMatchesSelector && n.webkitMatchesSelector(selector);
  }
  return false;
}
const EVENT_NAMES = {
  'pan': true,
  'panstart': true,
  'panmove': true,
  'panend': true,
  'pancancel': true,
  'panleft': true,
  'panright': true,
  'panup': true,
  'pandown': true,
  'pinch': true,
  'pinchstart': true,
  'pinchmove': true,
  'pinchend': true,
  'pinchcancel': true,
  'pinchin': true,
  'pinchout': true,
  'press': true,
  'pressup': true,
  'rotate': true,
  'rotatestart': true,
  'rotatemove': true,
  'rotateend': true,
  'rotatecancel': true,
  'swipe': true,
  'swipeleft': true,
  'swiperight': true,
  'swipeup': true,
  'swipedown': true,
  'tap': true,
  'doubletap': true
};
const HAMMER_GESTURE_CONFIG = new InjectionToken(typeof ngDevMode === 'undefined' || ngDevMode ? 'HammerGestureConfig' : '');
const HAMMER_LOADER = new InjectionToken(typeof ngDevMode === 'undefined' || ngDevMode ? 'HammerLoader' : '');
class HammerGestureConfig {
  events = [];
  overrides = {};
  options;
  buildHammer(element) {
    const mc = new Hammer(element, this.options);
    mc.get('pinch').set({
      enable: true
    });
    mc.get('rotate').set({
      enable: true
    });
    for (const eventName in this.overrides) {
      mc.get(eventName).set(this.overrides[eventName]);
    }
    return mc;
  }
  static ɵfac = function HammerGestureConfig_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || HammerGestureConfig)();
  };
  static ɵprov = /* @__PURE__ */i0.ɵɵdefineInjectable({
    token: HammerGestureConfig,
    factory: HammerGestureConfig.ɵfac
  });
}
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(HammerGestureConfig, [{
    type: Injectable
  }], null, null);
})();
class HammerGesturesPlugin extends EventManagerPlugin {
  _config;
  _injector;
  loader;
  _loaderPromise = null;
  constructor(doc, _config, _injector, loader) {
    super(doc);
    this._config = _config;
    this._injector = _injector;
    this.loader = loader;
  }
  supports(eventName) {
    if (!EVENT_NAMES.hasOwnProperty(eventName.toLowerCase()) && !this.isCustomEvent(eventName)) {
      return false;
    }
    if (!window.Hammer && !this.loader) {
      if (typeof ngDevMode === 'undefined' || ngDevMode) {
        const _console = this._injector.get(_Console);
        _console.warn(`The "${eventName}" event cannot be bound because Hammer.JS is not ` + `loaded and no custom loader has been specified.`);
      }
      return false;
    }
    return true;
  }
  addEventListener(element, eventName, handler) {
    const zone = this.manager.getZone();
    eventName = eventName.toLowerCase();
    if (!window.Hammer && this.loader) {
      this._loaderPromise = this._loaderPromise || zone.runOutsideAngular(() => this.loader());
      let cancelRegistration = false;
      let deregister = () => {
        cancelRegistration = true;
      };
      zone.runOutsideAngular(() => this._loaderPromise.then(() => {
        if (!window.Hammer) {
          if (typeof ngDevMode === 'undefined' || ngDevMode) {
            const _console = this._injector.get(_Console);
            _console.warn(`The custom HAMMER_LOADER completed, but Hammer.JS is not present.`);
          }
          deregister = () => {};
          return;
        }
        if (!cancelRegistration) {
          deregister = this.addEventListener(element, eventName, handler);
        }
      }).catch(() => {
        if (typeof ngDevMode === 'undefined' || ngDevMode) {
          const _console = this._injector.get(_Console);
          _console.warn(`The "${eventName}" event cannot be bound because the custom ` + `Hammer.JS loader failed.`);
        }
        deregister = () => {};
      }));
      return () => {
        deregister();
      };
    }
    return zone.runOutsideAngular(() => {
      const mc = this._config.buildHammer(element);
      const callback = function (eventObj) {
        zone.runGuarded(function () {
          handler(eventObj);
        });
      };
      mc.on(eventName, callback);
      return () => {
        mc.off(eventName, callback);
        if (typeof mc.destroy === 'function') {
          mc.destroy();
        }
      };
    });
  }
  isCustomEvent(eventName) {
    return this._config.events.indexOf(eventName) > -1;
  }
  static ɵfac = function HammerGesturesPlugin_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || HammerGesturesPlugin)(i0.ɵɵinject(DOCUMENT), i0.ɵɵinject(HAMMER_GESTURE_CONFIG), i0.ɵɵinject(i0.Injector), i0.ɵɵinject(HAMMER_LOADER, 8));
  };
  static ɵprov = /* @__PURE__ */i0.ɵɵdefineInjectable({
    token: HammerGesturesPlugin,
    factory: HammerGesturesPlugin.ɵfac
  });
}
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(HammerGesturesPlugin, [{
    type: Injectable
  }], () => [{
    type: undefined,
    decorators: [{
      type: Inject,
      args: [DOCUMENT]
    }]
  }, {
    type: HammerGestureConfig,
    decorators: [{
      type: Inject,
      args: [HAMMER_GESTURE_CONFIG]
    }]
  }, {
    type: i0.Injector
  }, {
    type: undefined,
    decorators: [{
      type: Optional
    }, {
      type: Inject,
      args: [HAMMER_LOADER]
    }]
  }], null);
})();
class HammerModule {
  static ɵfac = function HammerModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || HammerModule)();
  };
  static ɵmod = /* @__PURE__ */i0.ɵɵdefineNgModule({
    type: HammerModule
  });
  static ɵinj = /* @__PURE__ */i0.ɵɵdefineInjector({
    providers: [{
      provide: EVENT_MANAGER_PLUGINS,
      useClass: HammerGesturesPlugin,
      multi: true,
      deps: [DOCUMENT, HAMMER_GESTURE_CONFIG, Injector, [new Optional(), HAMMER_LOADER]]
    }, {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: HammerGestureConfig
    }]
  });
}
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(HammerModule, [{
    type: NgModule,
    args: [{
      providers: [{
        provide: EVENT_MANAGER_PLUGINS,
        useClass: HammerGesturesPlugin,
        multi: true,
        deps: [DOCUMENT, HAMMER_GESTURE_CONFIG, Injector, [new Optional(), HAMMER_LOADER]]
      }, {
        provide: HAMMER_GESTURE_CONFIG,
        useClass: HammerGestureConfig
      }]
    }]
  }], null, null);
})();
class DomSanitizer {
  static ɵfac = function DomSanitizer_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || DomSanitizer)();
  };
  static ɵprov = /* @__PURE__ */i0.ɵɵdefineInjectable({
    token: DomSanitizer,
    factory: function DomSanitizer_Factory(__ngFactoryType__) {
      let __ngConditionalFactory__ = null;
      if (__ngFactoryType__) {
        __ngConditionalFactory__ = new (__ngFactoryType__ || DomSanitizer)();
      } else {
        __ngConditionalFactory__ = i0.ɵɵinject(DomSanitizerImpl);
      }
      return __ngConditionalFactory__;
    },
    providedIn: 'root'
  });
}
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(DomSanitizer, [{
    type: Injectable,
    args: [{
      providedIn: 'root',
      useExisting: forwardRef(() => DomSanitizerImpl)
    }]
  }], null, null);
})();
class DomSanitizerImpl extends DomSanitizer {
  _doc;
  constructor(_doc) {
    super();
    this._doc = _doc;
  }
  sanitize(ctx, value) {
    if (value == null) return null;
    switch (ctx) {
      case SecurityContext.NONE:
        return value;
      case SecurityContext.HTML:
        if (_allowSanitizationBypassAndThrow(value, "HTML")) {
          return _unwrapSafeValue(value);
        }
        return __sanitizeHtml(this._doc, String(value)).toString();
      case SecurityContext.STYLE:
        if (_allowSanitizationBypassAndThrow(value, "Style")) {
          return _unwrapSafeValue(value);
        }
        return value;
      case SecurityContext.SCRIPT:
        if (_allowSanitizationBypassAndThrow(value, "Script")) {
          return _unwrapSafeValue(value);
        }
        throw new _RuntimeError(5200, (typeof ngDevMode === 'undefined' || ngDevMode) && 'unsafe value used in a script context');
      case SecurityContext.URL:
        if (_allowSanitizationBypassAndThrow(value, "URL")) {
          return _unwrapSafeValue(value);
        }
        return __sanitizeUrl(String(value));
      case SecurityContext.RESOURCE_URL:
        if (_allowSanitizationBypassAndThrow(value, "ResourceURL")) {
          return _unwrapSafeValue(value);
        }
        throw new _RuntimeError(5201, (typeof ngDevMode === 'undefined' || ngDevMode) && `unsafe value used in a resource URL context (see ${_XSS_SECURITY_URL})`);
      default:
        throw new _RuntimeError(5202, (typeof ngDevMode === 'undefined' || ngDevMode) && `Unexpected SecurityContext ${ctx} (see ${_XSS_SECURITY_URL})`);
    }
  }
  bypassSecurityTrustHtml(value) {
    return _bypassSanitizationTrustHtml(value);
  }
  bypassSecurityTrustStyle(value) {
    return _bypassSanitizationTrustStyle(value);
  }
  bypassSecurityTrustScript(value) {
    return _bypassSanitizationTrustScript(value);
  }
  bypassSecurityTrustUrl(value) {
    return _bypassSanitizationTrustUrl(value);
  }
  bypassSecurityTrustResourceUrl(value) {
    return _bypassSanitizationTrustResourceUrl(value);
  }
  static ɵfac = function DomSanitizerImpl_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || DomSanitizerImpl)(i0.ɵɵinject(DOCUMENT));
  };
  static ɵprov = /* @__PURE__ */i0.ɵɵdefineInjectable({
    token: DomSanitizerImpl,
    factory: DomSanitizerImpl.ɵfac,
    providedIn: 'root'
  });
}
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(DomSanitizerImpl, [{
    type: Injectable,
    args: [{
      providedIn: 'root'
    }]
  }], () => [{
    type: undefined,
    decorators: [{
      type: Inject,
      args: [DOCUMENT]
    }]
  }], null);
})();
var HydrationFeatureKind;
(function (HydrationFeatureKind) {
  HydrationFeatureKind[HydrationFeatureKind["NoHttpTransferCache"] = 0] = "NoHttpTransferCache";
  HydrationFeatureKind[HydrationFeatureKind["HttpTransferCacheOptions"] = 1] = "HttpTransferCacheOptions";
  HydrationFeatureKind[HydrationFeatureKind["I18nSupport"] = 2] = "I18nSupport";
  HydrationFeatureKind[HydrationFeatureKind["EventReplay"] = 3] = "EventReplay";
  HydrationFeatureKind[HydrationFeatureKind["IncrementalHydration"] = 4] = "IncrementalHydration";
})(HydrationFeatureKind || (HydrationFeatureKind = {}));
function hydrationFeature(ɵkind, ɵproviders = [], ɵoptions = {}) {
  return {
    ɵkind,
    ɵproviders
  };
}
function withNoHttpTransferCache() {
  return hydrationFeature(HydrationFeatureKind.NoHttpTransferCache);
}
function withHttpTransferCacheOptions(options) {
  return hydrationFeature(HydrationFeatureKind.HttpTransferCacheOptions, _withHttpTransferCache(options));
}
function withI18nSupport() {
  return hydrationFeature(HydrationFeatureKind.I18nSupport, _withI18nSupport());
}
function withEventReplay() {
  return hydrationFeature(HydrationFeatureKind.EventReplay, _withEventReplay());
}
function withIncrementalHydration() {
  return hydrationFeature(HydrationFeatureKind.IncrementalHydration, _withIncrementalHydration());
}
function provideEnabledBlockingInitialNavigationDetector() {
  return [{
    provide: ENVIRONMENT_INITIALIZER,
    useValue: () => {
      const isEnabledBlockingInitialNavigation = inject(_IS_ENABLED_BLOCKING_INITIAL_NAVIGATION, {
        optional: true
      });
      if (isEnabledBlockingInitialNavigation) {
        const console = inject(_Console);
        const message = _formatRuntimeError(5001, 'Configuration error: found both hydration and enabledBlocking initial navigation ' + 'in the same application, which is a contradiction.');
        console.warn(message);
      }
    },
    multi: true
  }];
}
function provideClientHydration(...features) {
  const providers = [];
  const featuresKind = new Set();
  for (const {
    ɵproviders,
    ɵkind
  } of features) {
    featuresKind.add(ɵkind);
    if (ɵproviders.length) {
      providers.push(ɵproviders);
    }
  }
  const hasHttpTransferCacheOptions = featuresKind.has(HydrationFeatureKind.HttpTransferCacheOptions);
  if (typeof ngDevMode !== 'undefined' && ngDevMode && featuresKind.has(HydrationFeatureKind.NoHttpTransferCache) && hasHttpTransferCacheOptions) {
    throw new _RuntimeError(5001, 'Configuration error: found both withHttpTransferCacheOptions() and withNoHttpTransferCache() in the same call to provideClientHydration(), which is a contradiction.');
  }
  return makeEnvironmentProviders([typeof ngDevMode !== 'undefined' && ngDevMode ? provideEnabledBlockingInitialNavigationDetector() : [], _withDomHydration(), featuresKind.has(HydrationFeatureKind.NoHttpTransferCache) || hasHttpTransferCacheOptions ? [] : _withHttpTransferCache({}), providers]);
}
const VERSION = /* @__PURE__ */new Version('21.0.0');
export { By, DomSanitizer, EVENT_MANAGER_PLUGINS, EventManagerPlugin, HAMMER_GESTURE_CONFIG, HAMMER_LOADER, HammerGestureConfig, HammerModule, HydrationFeatureKind, Meta, Title, VERSION, disableDebugTools, enableDebugTools, provideClientHydration, withEventReplay, withHttpTransferCacheOptions, withI18nSupport, withIncrementalHydration, withNoHttpTransferCache, DomSanitizerImpl as ɵDomSanitizerImpl, HammerGesturesPlugin as ɵHammerGesturesPlugin };