type TextBlockProps = {
  props: Record<string, unknown>;
};

export function TextBlock({ props }: TextBlockProps) {
  const body = String(props.body ?? "");

  return (
    <section className="ns-block ns-block--text">
      <p>{body}</p>
    </section>
  );
}
