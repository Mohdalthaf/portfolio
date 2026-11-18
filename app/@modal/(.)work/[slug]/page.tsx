import { notFound } from "next/navigation";
import { CaseStudyModal } from "@/components/case-study/case-study-modal";
import { getCaseStudy, getNextCaseStudy } from "@/lib/case-studies";

/** Intercepts /work/[slug] during in-app navigation and shows it as an overlay. */
export default async function CaseStudyModalRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  return <CaseStudyModal study={study} next={getNextCaseStudy(study.slug)} />;
}
