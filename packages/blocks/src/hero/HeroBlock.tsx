type HeroBlockProps = {
  props: Record<string, unknown>;
};

export function HeroBlock({ props }: HeroBlockProps) {
  const title = String(props.title ?? "");
  const subtitle = String(props.subtitle ?? "");

  return (
    <section className="ns-block ns-block--hero">
      <h1>{title}</h1>
      {subtitle ? <p>{subtitle}</p> : null}
    </section>
  );
}
