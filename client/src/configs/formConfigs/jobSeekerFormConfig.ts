// src/formConfigs/jobSeekerFormConfig.ts

export const jobSeekerFormConfig = {
  category: "jobSeeker",
  fields: [
    {
      type: "text",
      name: "resumeLink",
      label: "Resume Link",
      placeholder: "Enter a link to your resume",
    },
    {
      type: "text",
      name: "portfolioLink",
      label: "Portfolio Link",
      placeholder: "Enter a link to your portfolio",
    },
    {
      type: "checkbox",
      name: "lookingForRemote",
      label: "Are you looking for remote opportunities?",
    },
    {
      type: "select",
      name: "preferredLocation",
      label: "Preferred Work Location",
      options: [
        { value: "onsite", label: "On-site" },
        { value: "remote", label: "Remote" },
      ],
    },
  ],
};
