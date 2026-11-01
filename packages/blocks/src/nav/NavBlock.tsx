type NavBlockProps = {
  props: Record<string, unknown>;
};

export function NavBlock({ props }: NavBlockProps) {
  const brand = String(props.brand ?? "Mon site");
  const links = Array.isArray(props.links) ? props.links.map(String) : [];

  return (
    <nav className="ns-block ns-block--nav" aria-label="Navigation">
      <strong className="ns-block__brand">{brand}</strong>
      <ul className="ns-block__links">
        {links.map((link) => (
          <li key={link}>{link}</li>
        ))}
      </ul>
    </nav>
  );
}
