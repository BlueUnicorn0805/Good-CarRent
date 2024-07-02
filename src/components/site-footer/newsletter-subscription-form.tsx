"use client";

import { CheckCircle } from "lucide-react";
import { useFormState, useFormStatus } from "react-dom";

import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

type Form = {
  errors?: string[];
  message: string | null;
  subscribed: boolean;
};

export function NewsletterSubscriptionForm() {
  const initialState: Form = {
    errors: [],
    message: null,
    subscribed: false,
  };

  async function subscribeToNewsletter(_: Form, _formData: FormData) {
    return {
      errors: [],
      message: null,
      subscribed: true,
    };
  }

  const [state, formAction] = useFormState(subscribeToNewsletter, initialState);

  return (
    <form action={formAction}>
      <div className={cn("relative", state?.subscribed && "hidden")}>
        <Input
          name="email"
          placeholder="you@domain.com"
          type="email"
          required
          aria-describedby="email-validation"
          className="pr-[100px] transition-shadow duration-200 hover:shadow"
        />

        <SubmitButton />
      </div>

      <div id="email-validation" aria-live="polite">
        {state?.errors?.map((error: string) => (
          <p key={error} className="text-destructive ml-1 mt-1 text-sm">
            {error}
          </p>
        ))}

        {state?.message && (
          <p className="text-destructive ml-1 mt-1 text-sm">{state.message}</p>
        )}

        {state?.subscribed && (
          <p className="animate-in slide-in-from-right-full mt-2 flex flex-row items-center gap-1.5 text-sm duration-300">
            <CheckCircle className="h-5 text-green-600" aria-hidden="true" />
            Thanks for subscribing!
          </p>
        )}
      </div>
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      variant="secondary"
      size="sm"
      className="absolute inset-y-1 right-1 h-8 border text-xs"
      aria-disabled={pending}
      disabled={pending}
    >
      {pending ? "Subscribing..." : "Subscribe"}
    </Button>
  );
}
