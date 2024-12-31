/* eslint-disable jsx-a11y/role-supports-aria-props */
"use client";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { defineStepper } from "@stepperize/react";
import VerifyInformation from "./VerifyInformation";
import JobOfferPage from "./JobDescription";
import AttachmentForm from "./AttachmentForm";
import { Locale } from "@/configs/i18n";
import { useCandidatureStore } from "@/stores/candidature.store";
import { useApplicationStore } from "@/stores/useApplication.store";

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

function Stepper({ locale }: { locale: Locale }) {
  // Use state
  const [loading, setLoading] = React.useState(true);
  // Hooks
  const stepper = useStepper();
  const { fetchCandidatureData } = useCandidatureStore();
  const { applicationData } = useApplicationStore();

  React.useEffect(() => {
    (async () => {
      await fetchCandidatureData();
      setLoading(false);
    })();
  }, [fetchCandidatureData]);

  const submitData = () => {
    console.log(applicationData);
  };

  if (loading) return <>loading ...</>;

  return (
    <div className="space-y-6 p-6 border rounded-lg">
      <div className="flex justify-between">
        {/* <h2 className="text-lg font-medium">Checkout</h2>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            Step {stepper.current.index + 1} of {steps.length}
          </span>
          <div />
        </div> */}
      </div>
      <div className="flex justify-center">
        <nav
          aria-label="Checkout Steps"
          className="group my-4 w-[70%] max-w-[70%]"
        >
          <ol
            className="flex items-center justify-between gap-2 flex-wrap"
            aria-orientation="horizontal"
          >
            {stepper.all.map((step, index, array) => (
              <React.Fragment key={step.id}>
                <li className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
                  <Button
                    type="button"
                    role="tab"
                    size="sm" // Smaller button for mobile
                    variant={
                      index <= stepper.current.index ? "default" : "secondary"
                    }
                    aria-current={
                      stepper.current.id === step.id ? "step" : undefined
                    }
                    aria-posinset={index + 1}
                    aria-setsize={steps.length}
                    aria-selected={stepper.current.id === step.id}
                    className="flex size-8 sm:size-10 items-center justify-center rounded-full"
                    onClick={() => stepper.goTo(step.id)}
                  >
                    {index + 1}
                  </Button>
                  <span className="text-xs sm:text-sm font-medium text-black-600/80">
                    {step.title}
                  </span>
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
      </div>

      <div className="container mx-auto">
        <div className="w-full  border border-gray-200 p-5 ">
          {stepper.switch({
            description: () => <JobOfferPage />,
            attachment: () => <AttachmentForm locale={locale} />,
            verification: () => <VerifyInformation locale={locale} />,
          })}
        </div>

        {!stepper.isLast ? (
          <div className="flex justify-end gap-4 mt-10 ">
            <Button size="lg" onClick={stepper.next}>
              {stepper.isLast ? "Terminer" : "Continuer"}
            </Button>
            <Button
              variant="secondary"
              onClick={stepper.prev}
              disabled={stepper.isFirst}
              size="lg"
            >
              Retour
            </Button>
          </div>
        ) : (
          <div className="flex justify-end gap-4 mt-10 ">
            <Button size="lg" onClick={submitData}>
              Soumettre la candidature
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Stepper;
