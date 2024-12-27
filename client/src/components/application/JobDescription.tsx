import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const JobOfferCard = ({ job }) => {
  return (
    <div className="p-4 flex justify-center items-center w-full">
      <Card className="w-full  border border-gray-200 shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">{job.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
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
        </CardContent>
      </Card>
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
