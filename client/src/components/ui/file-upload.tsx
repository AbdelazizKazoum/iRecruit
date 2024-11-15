import * as React from "react";
import { cn } from "@/libs/utils";
import { UploadIcon, CheckCircleIcon } from "lucide-react"; // Use a valid icon like CheckCircle
import { useFormContext } from "react-hook-form";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const FileUpload = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    const [fileName, setFileName] = React.useState<string | null>(null);

    // Hooks
    const { setValue } = useFormContext();

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      console.log("🚀 ~ handleFileChange ~ file:", file);
      setValue("test", file);
      setFileName(file ? file.name : null);
    };

    return (
      <label
        className={cn(
          "flex h-9 w-full items-center justify-between rounded-md border border-gray-400 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-within:outline-none focus-within:border-2 focus-within:border-primary focus-within:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
      >
        <div className="flex items-center gap-2">
          {fileName ? (
            <>
              <CheckCircleIcon className="h-4 w-4 text-green-500" />
              <span className="text-green-500">Fichier sélectionné: </span>
              <p className=" text-primary ">{fileName}</p>
            </>
          ) : (
            <>
              <UploadIcon className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Charger</span>
            </>
          )}
        </div>
        <input
          type="file"
          className="sr-only"
          ref={ref}
          {...props}
          onChange={(event) => {
            handleFileChange(event);
            props.onChange?.(event); // Call the provided onChange handler if it exists
          }}
        />
      </label>
    );
  }
);

FileUpload.displayName = "Input";

export { FileUpload };
