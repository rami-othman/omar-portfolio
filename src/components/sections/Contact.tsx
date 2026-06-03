import { contact } from "../../data/portfolioData";
import { BrandImage } from "../ui/BrandImage";
import { SectionTitle } from "./SectionTitle";

const hasRealEmail = !contact.email.includes("example.com");
const hasRealPhone = !contact.phone.includes("000 000");

export function Contact() {
  return (
    <section
      id="contact"
      className="scroll-mt-24 px-4 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-24"
    >
      <div className="mx-auto max-w-7xl">
        <SectionTitle
          number="03"
          eyebrow="Contact"
          title="Available for selected architecture and visualization work."
        >
          For collaborations, portfolio requests, or project inquiries, send a
          concise note and project context.
        </SectionTitle>

        <div className="mt-12 grid gap-10 border-t border-ink/15 pt-8 lg:grid-cols-[16rem_minmax(0,1fr)]">
          <div className="flex items-start gap-4 lg:block">
            <BrandImage
              sources={["/brand/logo_deflated.png", "/brand/omar-logo.png"]}
              alt="Omar architecture mark"
              fallback="O"
              className="h-20 w-20 shrink-0 lg:h-28 lg:w-28"
            />
            <p className="max-w-xs text-sm leading-6 text-ink/58 lg:mt-6">
              Contact details are ready to be replaced with Omar's preferred
              email, phone, and portfolio links.
            </p>
          </div>

          <div className="grid min-w-0 gap-7 md:grid-cols-2">
            <div className="min-w-0">
              <p className="font-mono text-[0.62rem] uppercase tracking-editorial text-ink/45">
                Email
              </p>
              {hasRealEmail ? (
                <a
                  className="mt-3 block min-w-0 break-words text-2xl leading-tight text-ink underline decoration-ink/20 underline-offset-8 transition hover:decoration-ink"
                  href={`mailto:${contact.email}`}
                >
                  {contact.email}
                </a>
              ) : (
                <p className="mt-3 text-xl leading-tight text-ink">
                  Contact details to be added
                </p>
              )}
            </div>
            <div className="min-w-0">
              <p className="font-mono text-[0.62rem] uppercase tracking-editorial text-ink/45">
                Details
              </p>
              <div className="mt-3 space-y-2 text-sm leading-6 text-ink/65">
                <p>{hasRealPhone ? contact.phone : "Phone to be added"}</p>
                <p>{contact.city}</p>
              </div>
            </div>
            <div className="min-w-0 md:col-span-2">
              <p className="font-mono text-[0.62rem] uppercase tracking-editorial text-ink/45">
                Links
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                {contact.links.map((link) => (
                  <a
                    key={link.label}
                    className="border border-ink/15 px-4 py-3 font-mono text-[0.62rem] uppercase tracking-editorial text-ink/65 transition hover:border-ink hover:text-ink focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-ink"
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
