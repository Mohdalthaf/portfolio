"use client";

import { Icon } from "@iconify/react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { education } from "@/lib/data";
import { cn } from "@/lib/utils";

const educationItems = [
  {
    title: "MCA",
    subtitle: education[0].school,
    period: education[0].period,
    location: education[0].location,
    detail: education[0].detail,
    cardIcon: "solar:square-academic-cap-line-duotone",
    badgeColor: "bg-accent/15 text-accent",
    statusIcon: "solar:medal-ribbons-star-line-duotone",
  },
  {
    title: "BCA",
    subtitle: education[1].school,
    period: education[1].period,
    location: education[1].location,
    detail: education[1].detail,
    cardIcon: "solar:book-2-line-duotone",
    badgeColor: "bg-accent/15 text-accent",
    statusIcon: "solar:medal-ribbons-star-line-duotone",
  },
];

export default function EducationStatisticsCard({
  className,
}: {
  className?: string;
}) {
  return (
    <div className={cn("w-full", className)}>
      <Card className="gap-0 border-white/10 bg-white/5 p-0! py-0 shadow-none backdrop-blur-sm">
        <CardContent className="flex w-full flex-wrap items-stretch px-0 lg:flex-nowrap">
          {educationItems.map((item) => (
            <div
              className="w-full border-e border-white/10 last:border-e-0 md:w-6/12"
              key={item.title}
            >
              <div className="p-5 md:p-6">
                <div className="flex flex-col gap-1">
                  <div className="flex items-start justify-between gap-3">
                    <h5 className="text-sm font-medium text-white/70 md:text-base">
                      {item.title}
                    </h5>
                    <div className="rounded-full p-2.5 text-accent outline outline-white/15 md:p-3">
                      <Icon icon={item.cardIcon} width={16} height={16} />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <h5 className="text-lg font-semibold leading-snug text-white md:text-xl">
                      {item.subtitle}
                    </h5>
                    <p className="text-xs text-white/40">{item.location}</p>
                    <div className="mt-1 flex flex-wrap items-center gap-2">
                      <p className="text-xs text-white/45">{item.period}</p>
                      {item.detail ? (
                        <Badge
                          variant="outline"
                          className={cn("border-transparent", item.badgeColor)}
                        >
                          <div className="flex items-center gap-1">
                            {item.detail}
                            <Icon
                              icon={item.statusIcon}
                              width={14}
                              height={14}
                            />
                          </div>
                        </Badge>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
