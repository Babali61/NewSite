import type { ReactNode } from "react";

type EditorShellProps = {
  children: ReactNode;
};

export function EditorShell({ children }: EditorShellProps) {
  return <div className="editor-shell">{children}</div>;
}
