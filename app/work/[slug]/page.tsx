import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { BrandLogo } from "@/components/brand-logo";
import { CaseStudyView } from "@/components/case-study/case-study-view";
import {
  caseStudies,
  getCaseStudy,
  getNextCaseStudy,
} from "@/lib/case-studies";
import { siteConfig } from "@/lib/site";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return caseStudies.map(({ slug }) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};

  const url = `${siteConfig.url}/work/${study.slug}`;
  return {
    title: `${study.title} — Case Study`,
    description: study.summary,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: `${study.title} — Case Study`,
      description: study.summary,
      images: [{ url: study.preview, alt: study.title }],
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  return (
    <div className="min-h-dvh bg-[#050505]">
      <header className="sticky top-0 z-40 border-b border-white/5 bg-[#050505]/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 md:px-10">
          <Link
            href="/"
            className="text-lg leading-none transition-opacity hover:opacity-90 md:text-xl"
          >
            <BrandLogo />
          </Link>
          <Link
            href="/#work"
            className="group inline-flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            Back to work
          </Link>
        </div>
      </header>

      <main className="pt-10 md:pt-16">
        <CaseStudyView study={study} next={getNextCaseStudy(study.slug)} />
      </main>
    </div>
  );
}
