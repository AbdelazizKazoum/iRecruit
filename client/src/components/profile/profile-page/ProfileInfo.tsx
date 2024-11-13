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

type ProfileFormValues = z.infer<typeof profileFormSchema>;

function ProfileForm({ user }: { user: UserType | null }) {
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
          <div>
            <h3 className="text-lg font-medium text-black-600/85">Compte</h3>
            <p className="text-sm text-muted-foreground">
              C&apos;est ainsi que les autres vous verront sur le site.
            </p>
          </div>
          <Separator />
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                name="username"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom d&apos;utilisateur</FormLabel>
                    <FormControl>
                      <Input placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormDescription>
                      C&apos;est votre nom affiché publiquement. Il peut
                      s&apos;agir de votre vrai nom ou d&apos;un pseudonyme.
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
                  <Loader className="animate-spin mr-2 h-4 w-4" />
                ) : null}
                Mettre à jour le profil
              </Button>
            </form>
          </Form>
        </div>
      </main>
    </>
  );
}

export default ProfileForm;
