'use client';

import dynamic from 'next/dynamic';
import { type ComponentPropsWithoutRef, type FC } from 'react';

import { useTheme } from 'next-themes';
import { NotionRenderer as Renderer } from 'react-notion-x';

import Client from '@/components/client';
import Toggle from '@/components/notion/toggle';

const mapPageUrl = (id: string) =>
  `https://www.notion.so/${id.replace(/-/g, '')}`;

const NotionRenderer: FC<
  Omit<ComponentPropsWithoutRef<typeof Renderer>, 'components' | 'mapPageUrl'>
> = (props) => {
  const { theme, resolvedTheme } = useTheme();

  const isDark = theme === 'dark' || resolvedTheme === 'dark';

  if (props.recordMap) {
    for (const { value: block } of Object.values(props.recordMap.block)) {
      switch (block?.type) {
        case 'toggle':
          block.type += '_custom';
          break;
      }
    }
  }

  return (
    <Client
      fallback={
        <Renderer components={components} mapPageUrl={mapPageUrl} {...props} />
      }
    >
      <Renderer
        components={components}
        mapPageUrl={mapPageUrl}
        darkMode={isDark}
        {...props}
      />
    </Client>
  );
};

export default NotionRenderer;

const Code = dynamic(() =>
  import('@/components/notion/code').then(async (m) => {
    await Promise.allSettled([
      import('prismjs/components/prism-markup-templating.min.js'),
      import('prismjs/components/prism-abap.min.js'),
      import('prismjs/components/prism-agda.min.js'),
      import('prismjs/components/prism-arduino.min.js'),
      import('prismjs/components/prism-armasm.min.js'),
      import('prismjs/components/prism-bash.min.js'),
      import('prismjs/components/prism-basic.min.js'),
      import('prismjs/components/prism-bnf.min.js'),
      import('prismjs/components/prism-c.min.js'),
      import('prismjs/components/prism-clojure.min.js'),
      import('prismjs/components/prism-coffeescript.min.js'),
      import('prismjs/components/prism-coq.min.js'),
      import('prismjs/components/prism-cpp.min.js'),
      import('prismjs/components/prism-csharp.min.js'),
      import('prismjs/components/prism-css.min.js'),
      import('prismjs/components/prism-dart.min.js'),
      import('prismjs/components/prism-dhall.min.js'),
      import('prismjs/components/prism-diff.min.js'),
      import('prismjs/components/prism-docker.min.js'),
      import('prismjs/components/prism-ebnf.min.js'),
      import('prismjs/components/prism-elixir.min.js'),
      import('prismjs/components/prism-elm.min.js'),
      import('prismjs/components/prism-erlang.min.js'),
      import('prismjs/components/prism-flow.min.js'),
      import('prismjs/components/prism-fortran.min.js'),
      import('prismjs/components/prism-fsharp.min.js'),
      import('prismjs/components/prism-gherkin.min.js'),
      import('prismjs/components/prism-glsl.min.js'),
      import('prismjs/components/prism-go.min.js'),
      import('prismjs/components/prism-graphql.min.js'),
      import('prismjs/components/prism-groovy.min.js'),
      import('prismjs/components/prism-haskell.min.js'),
      import('prismjs/components/prism-idris.min.js'),
      import('prismjs/components/prism-java.min.js'),
      import('prismjs/components/prism-javascript.min.js'),
      import('prismjs/components/prism-json.min.js'),
      import('prismjs/components/prism-julia.min.js'),
      import('prismjs/components/prism-kotlin.min.js'),
      import('prismjs/components/prism-latex.min.js'),
      import('prismjs/components/prism-less.min.js'),
      import('prismjs/components/prism-lisp.min.js'),
      import('prismjs/components/prism-livescript.min.js'),
      import('prismjs/components/prism-llvm.min.js'),
      import('prismjs/components/prism-lua.min.js'),
      import('prismjs/components/prism-makefile.min.js'),
      import('prismjs/components/prism-markdown.min.js'),
      import('prismjs/components/prism-markup.min.js'),
      import('prismjs/components/prism-matlab.min.js'),
      import('prismjs/components/prism-mermaid.min.js'),
      import('prismjs/components/prism-nix.min.js'),
      import('prismjs/components/prism-objectivec.min.js'),
      import('prismjs/components/prism-ocaml.min.js'),
      import('prismjs/components/prism-pascal.min.js'),
      import('prismjs/components/prism-perl.min.js'),
      import('prismjs/components/prism-php.min.js'),
      import('prismjs/components/prism-powershell.min.js'),
      import('prismjs/components/prism-prolog.min.js'),
      import('prismjs/components/prism-protobuf.min.js'),
      import('prismjs/components/prism-purescript.min.js'),
      import('prismjs/components/prism-python.min.js'),
      import('prismjs/components/prism-r.min.js'),
      import('prismjs/components/prism-racket.min.js'),
      import('prismjs/components/prism-reason.min.js'),
      import('prismjs/components/prism-ruby.min.js'),
      import('prismjs/components/prism-rust.min.js'),
      import('prismjs/components/prism-sass.min.js'),
      import('prismjs/components/prism-scala.min.js'),
      import('prismjs/components/prism-scheme.min.js'),
      import('prismjs/components/prism-scss.min.js'),
      import('prismjs/components/prism-shell-session.min.js'),
      import('prismjs/components/prism-solidity.min.js'),
      import('prismjs/components/prism-sql.min.js'),
      import('prismjs/components/prism-swift.min.js'),
      import('prismjs/components/prism-toml.min.js'),
      import('prismjs/components/prism-typescript.min.js'),
      import('prismjs/components/prism-vbnet.min.js'),
      import('prismjs/components/prism-verilog.min.js'),
      import('prismjs/components/prism-vhdl.min.js'),
      import('prismjs/components/prism-visual-basic.min.js'),
      import('prismjs/components/prism-wasm.min.js'),
      import('prismjs/components/prism-xml-doc.min.js'),
      import('prismjs/components/prism-yaml.min.js'),
    ]);
    return m;
  }),
);

const Collection = dynamic(() =>
  import('react-notion-x/build/third-party/collection').then(
    (m) => m.Collection,
  ),
);

const Equation = dynamic(() =>
  import('react-notion-x/build/third-party/equation').then((m) => m.Equation),
);

const Pdf = dynamic(
  () => import('react-notion-x/build/third-party/pdf').then((m) => m.Pdf),
  { ssr: false },
);

const Tweet = dynamic(() => import('react-tweet').then((m) => m.Tweet));

const components = {
  Code,
  Collection,
  Equation,
  Pdf,
  Tweet,
  toggle_custom: Toggle,
};
