/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFormStore } from "@/stores/useFormStore";

const useDynamicForm = (schema: any, category: string) => {
  const { control, handleSubmit, reset, formState } = useForm({
    resolver: zodResolver(schema),
  });
  const { errors } = formState;
  const setFormData = useFormStore((state: any) => state.updateFormData);

  const onSubmit = (data: any) => {
    setFormData(category, data);
  };

  return {
    control,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    reset,
  };
};

export default useDynamicForm;
