import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 py-8">
      <div className="container-max flex flex-col gap-4 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Flanca. Crafted for ambitious brands.</p>
        <div className="flex items-center gap-4">
          <a href="#products" className="hover:text-foreground">
            Products
          </a>
          <a href="#contact" className="hover:text-foreground">
            Contact
          </a>
          <Link href="/admin" className="hover:text-foreground">
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}
