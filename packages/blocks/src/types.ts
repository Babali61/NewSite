import type { BlockType } from "@newsite/document";
import type { ComponentType } from "react";

export type BlockPropField = {
  key: string;
  label: string;
  kind: "text" | "textarea" | "list";
};

export type BlockPropSchema = BlockPropField[];

export type BlockDefinition = {
  type: BlockType;
  label: string;
  schema: BlockPropSchema;
  component: ComponentType<{ props: Record<string, unknown> }>;
};
