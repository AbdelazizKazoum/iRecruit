"use client";
import { contactSchema } from "@/schemas/contactSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { getDictionary } from "@/utils/getDictionary";

const ContactForm = ({
  dictionaty,
}: {
  dictionaty: Awaited<ReturnType<typeof getDictionary>>;
}) => {
  interface contactType {
    nom: string;
    email: string;
    mssg: string;
  }

  const form = useForm<contactType>({
    resolver: zodResolver(contactSchema),
    mode: "onChange",
  });

  //
  function onsubmit(data: { nom: string; email: string; mssg: string }) {
    console.log(data);
  }

  return (
    <div className="p-8">
      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(onsubmit)}>
          <FormField
            control={form.control}
            name="nom"
            render={({ field }) => (
              <FormItem>
                <FormLabel> {dictionaty["contact"].form.labels.name}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={dictionaty["contact"].form.placeholders.name}
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{dictionaty["contact"].form.labels.email}</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder={dictionaty["contact"].form.placeholders.email}
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="mssg"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {dictionaty["contact"].form.labels.message}
                </FormLabel>
                <FormControl>
                  <Textarea
                    rows={5}
                    placeholder={
                      dictionaty["contact"].form.placeholders.message
                    }
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full  py-3 rounded-md hover:bg-indigo-700 transition"
          >
            {dictionaty["contact"].form.button}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ContactForm;
