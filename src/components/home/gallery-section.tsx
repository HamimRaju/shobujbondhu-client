import { Container } from "@/components/ui/container";
import { PhotoFrame } from "@/components/ui/photo-frame";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { galleryItems } from "@/config/home-media";

export function GallerySection() {
  return (
    <section
      id="gallery"
      aria-labelledby="gallery-title"
      className="scroll-mt-20 bg-surface-muted py-16 sm:py-24"
    >
      <Container>
        <SectionHeading
          id="gallery-title"
          eyebrow="Community gallery"
          title="The kind of work we are here to support"
          description="Tree planting, clean-ups, learning circles and more, all led by people in their own neighbourhoods."
        />

        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {galleryItems.map((item, index) => (
            <li key={item.id}>
              <Reveal delay={(index % 3) * 0.06}>
                <figure className="group">
                  <PhotoFrame
                    image={item.image}
                    icon={item.icon}
                    tone={item.tone}
                    sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw"
                    className="aspect-[4/3] w-full rounded-2xl border border-border/60 shadow-sm"
                    slotHint={`gallery-${item.id}.jpg`}
                  />
                  <figcaption className="mt-3 text-sm leading-6 text-muted">
                    <span className="font-semibold text-foreground transition-colors group-hover:text-muted">
                      {item.caption}
                    </span>
                    {item.image.credit ? (
                      <span className="block text-xs">
                        Photo:{" "}
                        {item.image.creditUrl ? (
                          <a
                            href={item.image.creditUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline decoration-border underline-offset-2 hover:text-foreground"
                          >
                            {item.image.credit}
                          </a>
                        ) : (
                          item.image.credit
                        )}
                        {item.image.license ? (
                          <>
                            {" · "}
                            {item.image.licenseUrl ? (
                              <a
                                href={item.image.licenseUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline decoration-border underline-offset-2 hover:text-foreground"
                              >
                                {item.image.license}
                              </a>
                            ) : (
                              item.image.license
                            )}
                          </>
                        ) : null}
                      </span>
                    ) : null}
                  </figcaption>
                </figure>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
