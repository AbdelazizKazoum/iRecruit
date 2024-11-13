/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFormStore } from "@/stores/useFormStore";

const useDynamicForm = (schema: any, category: string) => {
  const form = useForm<any>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const { handleSubmit } = form;
  const setFormData = useFormStore((state: any) => state.setFormData);

  const onSubmit = (data: any) => {
    console.log("🚀 ~ onSubmit ~ data:", data);

    setFormData(category, data);
  };

  return {
    handleSubmit: handleSubmit(onSubmit),
    form,
  };
};

export default useDynamicForm;
