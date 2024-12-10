/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFormStore } from "@/stores/useFormStore";

const useDynamicForm = (schema: any, category: string) => {
  const form = useForm<any>({
    resolver: zodResolver(schema),
  });

  const setFormData = useFormStore((state: any) => state.setFormData);

  const onSubmit = (data: any) => {
    console.log("🚀 ~ onSubmit ~ data:", data);

    const formData = new FormData();

    // Append each field in 'data' dynamically to formData
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (value instanceof File || value instanceof Blob) {
          // If the field is a file or Blob, append it directly
          formData.append(key, value);
        } else if (typeof value === "object") {
          // Convert objects to JSON strings
          formData.append(key, JSON.stringify(value));
        } else {
          // Append other values as they are (ensure they are strings)
          formData.append(key, String(value));
        }
      }
    });

    setFormData(category, data); // Assuming setFormData accepts formData
  };

  return {
    onSubmit,
    form,
  };
};

export default useDynamicForm;
