"use client";

import type { ResumeData } from "@/types/resume.types";

interface ResumeTemplateProps {
  resumeData: ResumeData;
}

export default function ResumeTemplate({ resumeData }: ResumeTemplateProps) {
  return (
    <div className="w-full bg-white text-black">
      {/* Header Section - ATS Optimized */}
      <section className="mb-6 border-b-2 border-slate-900 pb-4">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-slate-900">
            {resumeData.fullName}
          </h1>

          {/* Contact Information - Semantic HTML for ATS */}
          <div className="flex flex-wrap gap-3 text-sm text-slate-700">
            {resumeData.email && <span>{resumeData.email}</span>}
            {resumeData.phone && <span>•</span>}
            {resumeData.phone && <span>{resumeData.phone}</span>}
            {resumeData.location && <span>•</span>}
            {resumeData.location && <span>{resumeData.location}</span>}
          </div>
        </div>
      </section>

      {/* Professional Summary */}
      {resumeData.summary && (
        <section className="mb-6">
          <h2 className="mb-2 text-sm font-bold tracking-wide text-slate-900">
            PROFESSIONAL SUMMARY
          </h2>
          <p className="text-sm leading-relaxed text-justify text-slate-800">
            {resumeData.summary}
          </p>
        </section>
      )}

      {/* Experience Section */}
      {resumeData.experience.length > 0 && (
        <section className="mb-6">
          <h2 className="mb-4 text-sm font-bold tracking-wide text-slate-900">
            EXPERIENCE
          </h2>
          <div className="space-y-5">
            {resumeData.experience.map((exp, index) => (
              <div key={index} className="space-y-1">
                {/* Position and Dates */}
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="text-sm font-semibold text-slate-900">
                    {exp.position}
                  </h3>
                  <span className="flex-shrink-0 whitespace-nowrap text-xs text-slate-600">
                    {exp.startDate}
                    {exp.endDate && !exp.currentlyWorking
                      ? ` – ${exp.endDate}`
                      : exp.currentlyWorking
                        ? " – Present"
                        : ""}
                  </span>
                </div>

                {/* Company Name */}
                <p className="text-sm font-medium text-slate-700">
                  {exp.company}
                </p>

                {/* Description */}
                {exp.description && (
                  <p className="pt-1 text-sm leading-relaxed text-slate-800">
                    {exp.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education Section */}
      {resumeData.education.length > 0 && (
        <section className="mb-6">
          <h2 className="mb-4 text-sm font-bold tracking-wide text-slate-900">
            EDUCATION
          </h2>
          <div className="space-y-4">
            {resumeData.education.map((edu, index) => (
              <div key={index} className="space-y-1">
                {/* Degree and Date */}
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="text-sm font-semibold text-slate-900">
                    {edu.degree}
                    {edu.fieldOfStudy && ` in ${edu.fieldOfStudy}`}
                  </h3>
                  {edu.endDate && (
                    <span className="flex-shrink-0 whitespace-nowrap text-xs text-slate-600">
                      {edu.endDate}
                    </span>
                  )}
                </div>

                {/* School Name */}
                <p className="text-sm font-medium text-slate-700">
                  {edu.school}
                </p>

                {/* Description if provided */}
                {edu.description && (
                  <p className="pt-1 text-sm leading-relaxed text-slate-800">
                    {edu.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills Section */}
      {resumeData.skills.length > 0 && (
        <section>
          <h2 className="mb-3 text-sm font-bold tracking-wide text-slate-900">
            SKILLS
          </h2>
          <div className="space-y-2">
            {resumeData.skills.map((skillGroup, index) => (
              <div key={index} className="flex gap-3">
                <span className="flex-shrink-0 text-sm font-semibold text-slate-900">
                  {skillGroup.category}:
                </span>
                <span className="text-sm text-slate-800">
                  {skillGroup.skills.join(", ")}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
