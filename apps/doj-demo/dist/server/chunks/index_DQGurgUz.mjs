import { q as createComponent, s as renderTemplate, w as renderComponent } from './astro/server_BE6ZA1CH.mjs';
import { $ as $$ContentLayout } from './ContentLayout_B8UnbtS8.mjs';

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "ContentLayout", $$ContentLayout, { "title": "10x Access to Justice Spotlight" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "AppFormRouter", null, { "client:only": true, "client:component-hydration": "only", "client:component-path": "/Users/jamesdmoffet/atj-platform/apps/doj-demo/src/components/AppFormRouter", "client:component-export": "default" })} ` })}`;
}, "/Users/jamesdmoffet/atj-platform/apps/doj-demo/src/pages/forms/index.astro", void 0);

const $$file = "/Users/jamesdmoffet/atj-platform/apps/doj-demo/src/pages/forms/index.astro";
const $$url = "/forms";

export { $$Index as default, $$file as file, $$url as url };
