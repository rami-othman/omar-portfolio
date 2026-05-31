import { contact } from "../../data/portfolioData";
import { BookSpread } from "../book/BookSpread";
import { BrandImage } from "../ui/BrandImage";
import { Divider } from "../ui/Divider";
import { SectionLabel } from "../ui/SectionLabel";

export function ContactSection() {
  return (
    <BookSpread
      id="contact"
      className="pb-14 lg:pb-24"
      left={
        <div className="flex h-full flex-col">
          <SectionLabel number="07" title="Contact" />
          <div className="my-auto py-16">
            <p className="font-display text-6xl leading-[0.88] sm:text-7xl">
              Let us make
              <br />
              something
              <br />
              <span className="italic text-graphite">considered.</span>
            </p>
          </div>
          <p className="max-w-xs text-xs leading-6 text-graphite">
            For collaborations, commissions, and architectural conversations.
          </p>
        </div>
      }
      right={
        <div className="flex h-full flex-col">
          <div className="flex justify-end">
            <BrandImage
              src="/brand/omar-logo.jpg"
              alt="Omar logo"
              fallback="O."
              className="max-h-20 max-w-24 text-5xl text-ink"
            />
          </div>
          <div className="mt-auto">
            <p className="font-mono text-[0.58rem] uppercase tracking-editorial text-graphite">
              Direct correspondence
            </p>
            <a
              className="mt-5 block break-all font-display text-3xl transition-opacity hover:opacity-55 sm:text-4xl"
              href={`mailto:${contact.email}`}
            >
              {contact.email}
            </a>
            <Divider className="my-7" />
            <div className="grid gap-8 text-xs leading-6 sm:grid-cols-2">
              <div>
                <p>{contact.phone}</p>
                <p>{contact.city}</p>
              </div>
              <div className="flex flex-col items-start">
                {contact.links.map((link) => (
                  <a
                    className="transition-opacity hover:opacity-55"
                    href={link.href}
                    key={link.label}
                    rel="noreferrer"
                    target="_blank"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <p className="mt-auto pt-14 text-right font-mono text-[0.55rem] uppercase tracking-editorial text-graphite">
            End / Volume 01
          </p>
        </div>
      }
    />
  );
}
