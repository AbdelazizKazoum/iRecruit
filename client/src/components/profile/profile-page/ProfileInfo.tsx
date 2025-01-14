"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Loader } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { profileFormSchema } from "@/libs/validation/profile-form";
import { UserType } from "@/types/user.types";
import { updateProfile } from "@/libs/actions/candidateActions";
import { toast } from "react-toastify";
import { getDictionary } from "@/utils/getDictionary";
import PageHeader from "@/components/PageHeader";

type ProfileFormValues = z.infer<typeof profileFormSchema>;

function ProfileForm({
  user,
  dictionary,
}: {
  user: UserType | null;
  dictionary: Awaited<ReturnType<typeof getDictionary>>;
}) {
  const defaultValues: Partial<ProfileFormValues> = {
    bio: user?.bio,
    username: user?.username,
    email: user?.email,
  };

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  });

  async function onSubmit(data: UserType) {
    const res = await updateProfile(user?._id, data);
    if (res.success) toast.success("Successfully updated");
    else toast.error("Somthing wrong, try again later");
  }

  return (
    <>
      <main className="flex-1 lg:max-w-2xl">
        <div className="space-y-6">
          <PageHeader
            size="sm"
            title={dictionary.profilePage.sections.compte.title}
            description={dictionary.profilePage.sections.compte.subtitle}
          />
          <Separator />
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {
                        dictionary.profilePage.sections.compte.form.fields
                          .username.label
                      }{" "}
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormDescription>
                      {
                        dictionary.profilePage.sections.compte.form.fields
                          .username.description
                      }
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {
                        dictionary.profilePage.sections.compte.form.fields.email
                          .label
                      }{" "}
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez un email vérifié à afficher" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={user?.email || ""}>
                          {user?.email}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {
                        dictionary.profilePage.sections.compte.form.fields.bio
                          .label
                      }
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Parlez-nous un peu de vous"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      {
                        dictionary.profilePage.sections.compte.form.fields.bio
                          .description
                      }
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                size="lg"
                type="submit"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? (
                  <>
                    <Loader className="animate-spin mr-2 h-4 w-4" />
                    {
                      dictionary.profilePage.sections.compte.form.button.loading
                    }{" "}
                  </>
                ) : (
                  dictionary.profilePage.sections.compte.form.button.submit
                )}
              </Button>
            </form>
          </Form>
        </div>
      </main>
    </>
  );
}

export default ProfileForm;
