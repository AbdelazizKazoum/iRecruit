import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import formSchema from "./formSchema.json";

const createValidationSchema = (fields) => {
  let shape = {};

  fields.forEach((field) => {
    let validator;
    switch (field.type) {
      case "text":
      case "email":
      case "password":
        validator = z.string();
        if (field.validation?.required)
          validator = validator.min(1, "Required");
        if (field.validation?.minLength)
          validator = validator.min(field.validation.minLength);
        if (field.validation?.maxLength)
          validator = validator.max(field.validation.maxLength);
        if (field.validation?.pattern)
          validator = validator.regex(new RegExp(field.validation.pattern));
        break;
      case "number":
        validator = z.number();
        if (field.validation?.required)
          validator = validator.min(1, "Required");
        if (field.validation?.min)
          validator = validator.min(field.validation.min);
        if (field.validation?.max)
          validator = validator.max(field.validation.max);
        break;
      case "file":
        validator = z
          .instanceof(FileList)
          .refine((files) => files.length > 0, "File is required")
          .refine(
            (files) => files[0]?.size <= field.validation.maxSize,
            "File must be less than 5MB"
          )
          .refine(
            (files) => field.validation.fileType.includes(files[0]?.type),
            "Invalid file type"
          );
        break;
      case "checkbox":
        validator = z.boolean();
        break;
      default:
        validator = z.any();
    }

    if (field.dependsOn) {
      shape[field.name] = z.optional(validator);
    } else {
      shape[field.name] = validator;
    }
  });

  return z.object(shape);
};

export default function DynamicForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createValidationSchema(formSchema.fields)),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {formSchema.fields.map((field) => {
        if (field.dependsOn && !watch(field.dependsOn)) return null;

        if (field.type === "file") {
          return (
            <div key={field.name}>
              <label>{field.label}</label>
              <input type="file" {...register(field.name)} />
              {errors[field.name] && <p>{errors[field.name]?.message}</p>}
            </div>
          );
        }

        if (field.type === "checkbox") {
          return (
            <div key={field.name}>
              <label>
                <input type="checkbox" {...register(field.name)} />{" "}
                {field.label}
              </label>
            </div>
          );
        }

        return (
          <div key={field.name}>
            <label>{field.label}</label>
            <input type={field.type} {...register(field.name)} />
            {errors[field.name] && <p>{errors[field.name]?.message}</p>}
          </div>
        );
      })}

      <button type="submit">Submit</button>
    </form>
  );
}
