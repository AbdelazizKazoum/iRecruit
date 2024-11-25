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

const ContactForm = () => {
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
                <FormLabel>Nom d&apos;utilisateur</FormLabel>
                <FormControl>
                  <Input placeholder="Entrez votre nom" {...field} />
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
                <FormLabel>Adresse e-mail</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Entrez votre email"
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
                <FormLabel>Message</FormLabel>
                <FormControl>
                  <Textarea
                    rows={5}
                    placeholder="Entrez votre message"
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
            Envoyer
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ContactForm;
