/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/form/DynamicForm.tsx

import React from "react";
import useDynamicForm from "@/hooks/useDynamicForm";
import { Button } from "../ui/button";
import FieldRenderer from "./FieldRenderer";

const DynamicForm = ({ config, schema }: any) => {
  const { control, handleSubmit, errors } = useDynamicForm(
    schema,
    config.category
  );

  return (
    <form onSubmit={handleSubmit}>
      {config.fields.map((fieldConfig: any) => (
        <div key={fieldConfig.name}>
          <label>{fieldConfig.label}</label>
          <FieldRenderer
            fieldConfig={fieldConfig}
            control={control}
            errors={errors}
          />
        </div>
      ))}
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default DynamicForm;
