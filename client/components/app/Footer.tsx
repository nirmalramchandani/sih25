import React from "react";

export const Footer: React.FC = () => {
  return (
    <footer className="border-t bg-muted/40 py-10 text-sm text-muted-foreground dark:bg-background/60">
      <div className="mx-auto grid max-w-6xl gap-6 px-6 md:grid-cols-3">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-foreground">
            <div className="h-6 w-6 rounded-md bg-slate-900" />
            <span className="font-semibold">AyurWell</span>
          </div>
          <p className="max-w-sm">Premium fitness and wellness for modern life. Simple, mindful, effective.</p>
        </div>
        <div className="grid grid-cols-2 gap-6 md:col-span-2 md:grid-cols-4">
          <LinkList title="Product" links={["Features", "Plans", "Download", "Security"]} />
          <LinkList title="Company" links={["About", "Careers", "Press", "Contact"]} />
          <LinkList title="Resources" links={["Blog", "Guides", "Support", "API"]} />
          <LinkList title="Legal" links={["Privacy", "Terms", "Cookies", "Licenses"]} />
        </div>
      </div>
      <div className="mx-auto mt-8 max-w-6xl px-6 text-xs text-muted-foreground/80">© {new Date().getFullYear()} AyurWell. All rights reserved.</div>
    </footer>
  );
};

const LinkList: React.FC<{ title: string; links: string[] }> = ({ title, links }) => (
  <div>
    <div className="mb-3 text-foreground/80">{title}</div>
    <ul className="space-y-2">
      {links.map((l) => (
        <li key={l}>
          <a className="hover:text-foreground transition-colors" href="#">{l}</a>
        </li>
      ))}
    </ul>
  </div>
);

export default Footer;
