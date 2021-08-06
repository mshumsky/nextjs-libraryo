import Link from "next/link";
import {useRouter} from "next/router";

export default function NavLink({ href, children }) {
  const { asPath } = useRouter();

  const baseClass = "nav-link";
  const activeClass = "active";

  const className = baseClass + (asPath === href ? " " + activeClass : "");

  return (
    <Link href={href}>
      <a className={className}>{children}</a>
    </Link>
  );
}
