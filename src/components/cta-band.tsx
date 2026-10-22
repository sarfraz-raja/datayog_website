import { ConsultButton } from "@/components/forms/consult-dialog";
import { Container, sectionY } from "@/components/ui";

export function CtaBand({
  heading = "Would you consider becoming a part of this journey?",
  subheading = "Let's take your network to the next level!",
  button = "Request a call-back",
}: {
  heading?: string;
  subheading?: string;
  button?: string;
}) {
  return (
    <section data-tone="white" className={`bg-white ${sectionY}`}>
      <Container>
        <div className="relative overflow-hidden rounded-3xl bg-navy-900 px-6 py-10 sm:px-12 sm:py-14">
          <div
            aria-hidden="true"
            className="absolute -right-24 -top-24 size-80 rounded-full bg-brand-500/25 blur-3xl"
          />
          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-brand-500 font-medium">{heading}</p>
              <h2 className="mt-2 text-3xl text-white sm:text-4xl">{subheading}</h2>
            </div>
            <ConsultButton title={button} className="shrink-0 self-start lg:self-auto">
              {button}
            </ConsultButton>
          </div>
        </div>
      </Container>
    </section>
  );
}
