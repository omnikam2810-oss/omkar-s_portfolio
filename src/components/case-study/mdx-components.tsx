import type { MDXComponents } from "mdx/types";
import { Decision, HardestPart, Learnings, ModuleCard } from "./blocks";
import { A, CodeBlock, InlineCode, Li, Ol, P, Strong, Ul } from "./mdx-elements";
import { ScatterToHub } from "./scatter-to-hub";
import { Section } from "./section";
import { SystemDiagram } from "./system-diagram";

/**
 * Everything a case study's MDX can use. The components are generic (props, not hard-coded
 * content), so a new case study is just a new file in content/work/.
 */
export const mdxComponents: MDXComponents = {
  // the case study building blocks
  Section,
  ScatterToHub,
  ModuleCard,
  SystemDiagram,
  Decision,
  HardestPart,
  Learnings,
  // plain markdown
  p: P,
  strong: Strong,
  a: A,
  ul: Ul,
  ol: Ol,
  li: Li,
  pre: CodeBlock,
  code: InlineCode,
};
