interface ListLinkProps {
  children: React.ReactNode;
  link?: string;
}

function ListLink({ children, link = "#" }: ListLinkProps) {
  return (
    <li>
      <a href={link}>{children}</a>
    </li>
  );
}

export { ListLink };
