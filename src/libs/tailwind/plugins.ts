// ref: https://github.com/tailwindlabs/tailwindcss/discussions/3105#discussioncomment-248885
import plugin from 'tailwindcss/plugin';

export const convertRemToEm = plugin(({ addVariant }) => {
  // @ts-expect-error no type
  addVariant('em', ({ container }) => {
    // @ts-expect-error no type
    container.walkRules((rule) => {
      rule.selector = `.em\\:${rule.selector.slice(1)}`;
      // @ts-expect-error no type
      rule.walkDecls((decl) => {
        decl.value = decl.value.replace('rem', 'em');
      });
    });
  });
});
