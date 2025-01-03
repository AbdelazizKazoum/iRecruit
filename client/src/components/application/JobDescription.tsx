/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

const JobOfferCard = ({ job }: { job: any }) => {
  return (
    <div className=" ">
      <div className="bg-gray-200 py-4 rounded-t-lg">
        <h2 className="text-lg font-semibold text-primary">{job.title}</h2>
      </div>
      <div className="space-y-4">
        <div className="flex justify-between text-sm text-gray-600">
          <span className="text-muted-foreground">
            <strong className=" mr-3 text-black-600/70 ">Ville:</strong>{" "}
            {job.city}
          </span>
          <span className="text-muted-foreground">
            <strong className=" mr-3 text-black-600/70 ">Département:</strong>{" "}
            {job.department}
          </span>
        </div>
        <div className="text-sm text-muted-foreground">
          <strong className=" mr-3 text-black-600/70">
            Nombre de candidats demandés:
          </strong>{" "}
          {job.candidatesNumber}
        </div>
        <div className="text-sm text-muted-foreground">
          <strong className=" mr-3 text-black-600/70">Description:</strong>
          <p className="mt-1 text-gray-700">{job.description}</p>
        </div>
      </div>
    </div>
  );
};

export default function JobOfferPage() {
  const job = {
    title: "Développeur Web",
    city: "Casablanca",
    department: "Informatique",
    candidatesNumber: 5,
    description:
      "Nous recherchons un développeur web pour rejoindre notre équipe dynamique. Vous serez responsable du développement et de la maintenance des applications web.",
  };

  return <JobOfferCard job={job} />;
}
