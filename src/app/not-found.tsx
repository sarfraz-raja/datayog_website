import { ButtonLink, Container } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="py-20 sm:py-28">
      <Container className="max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-600">404</p>
        <h1 className="mt-3 text-4xl sm:text-5xl">Page not found</h1>
        <p className="mt-5 text-lg">The page you are looking for doesn&apos;t exist or has been moved.</p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <ButtonLink href="/">Back to home</ButtonLink>
          <ButtonLink href="/contact" variant="secondary">
            Contact us
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
