"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
    if (res.success) toast.success("succefully updated");
    else toast.error(res.error);

    // toast({
    //   title: "Vous avez soumis les valeurs suivantes :",
    //   description: (
    //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   ),
    // });
  }

  return (
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
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom d&apos;utilisateur</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormDescription>
                  C&apos;est votre nom affiché publiquement. Il peut s&apos;agir
                  de votre vrai nom ou d&apos;un pseudonyme.
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
                <FormLabel>Email</FormLabel>
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
                    {/* <SelectItem value={user?.email || ""}>
                      {user?.email}
                    </SelectItem> */}
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
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Parlez-nous un peu de vous"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Vous pouvez partager quelques informations sur vous-même,
                  comme vos intérêts.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button size="lg" type="submit">
            Mettre à jour le profil
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default ProfileForm;
