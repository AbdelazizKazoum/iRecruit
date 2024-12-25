"use client";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { defineStepper } from "@stepperize/react";
import { JobDescription } from "./JobDescription";
import Attachment from "./Attachment";
import VerifyInformation from "./VerifyInformation";

const { useStepper, steps } = defineStepper(
  {
    id: "description",
    title: "Offer Decription",
    description: "Enter your shipping details",
  },
  {
    id: "attachment",
    title: "Attachment",
    description: "Enter your payment details",
  },
  {
    id: "verification",
    title: "Verification",
    description: "Checkout complete",
  }
);

function Index() {
  const stepper = useStepper();

  return (
    <div className="space-y-6 p-6 border rounded-lg">
      <div className="flex justify-between">
        <h2 className="text-lg font-medium">Checkout</h2>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            Step {stepper.current.index + 1} of {steps.length}
          </span>
          <div />
        </div>
      </div>
      <nav aria-label="Checkout Steps" className="group my-4">
        <ol
          className="flex items-center justify-between gap-2"
          aria-orientation="horizontal"
        >
          {stepper.all.map((step, index, array) => (
            <React.Fragment key={step.id}>
              <li className="flex items-center gap-4 flex-shrink-0">
                <Button
                  type="button"
                  role="tab"
                  variant={
                    index <= stepper.current.index ? "default" : "secondary"
                  }
                  aria-current={
                    stepper.current.id === step.id ? "step" : undefined
                  }
                  aria-posinset={index + 1}
                  aria-setsize={steps.length}
                  aria-selected={stepper.current.id === step.id}
                  className="flex size-10 items-center justify-center rounded-full"
                  onClick={() => stepper.goTo(step.id)}
                >
                  {index + 1}
                </Button>
                <span className="text-sm font-medium">{step.title}</span>
              </li>
              {index < array.length - 1 && (
                <Separator
                  className={`flex-1 ${
                    index < stepper.current.index ? "bg-primary" : "bg-muted"
                  }`}
                />
              )}
            </React.Fragment>
          ))}
        </ol>
      </nav>
      <div className="container mx-auto p-6 ">
        {stepper.switch({
          description: () => <JobDescription />,
          attachment: () => <Attachment />,
          verification: () => <VerifyInformation />,
        })}
        {!stepper.isLast ? (
          <div className="flex justify-end gap-4">
            <Button
              variant="secondary"
              onClick={stepper.prev}
              disabled={stepper.isFirst}
            >
              Back
            </Button>
            <Button onClick={stepper.next}>
              {stepper.isLast ? "Complete" : "Next"}
            </Button>
          </div>
        ) : (
          <Button onClick={stepper.reset}>Reset</Button>
        )}
      </div>
    </div>
  );
}

export default Index;
