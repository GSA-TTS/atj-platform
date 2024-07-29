import { p as createAstro, q as createComponent, s as renderTemplate, w as renderComponent, x as renderSlot } from './astro/server_BE6ZA1CH.mjs';
import { $ as $$Layout } from './Layout_BqhNZuKg.mjs';

const $$Astro = createAstro();
const $$ContentLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$ContentLayout;
  const { title } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": title }, { "default": ($$result2) => renderTemplate` ${renderSlot($$result2, $$slots["default"])} ` })}`;
}, "/Users/jamesdmoffet/atj-platform/apps/doj-demo/src/layouts/ContentLayout.astro", void 0);

export { $$ContentLayout as $ };
