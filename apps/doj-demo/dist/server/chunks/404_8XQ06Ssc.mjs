import { q as createComponent, s as renderTemplate, w as renderComponent, t as maybeRenderHead } from './astro/server_BE6ZA1CH.mjs';
import { $ as $$ContentLayout } from './ContentLayout_B8UnbtS8.mjs';

const $$404 = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "ContentLayout", $$ContentLayout, { "title": "Path not found" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<h1>404: Not Found</h1> ` })}`;
}, "/Users/jamesdmoffet/atj-platform/apps/doj-demo/src/pages/404.astro", void 0);

const $$file = "/Users/jamesdmoffet/atj-platform/apps/doj-demo/src/pages/404.astro";
const $$url = "/404";

export { $$404 as default, $$file as file, $$url as url };
