
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone, Send, Loader2 } from "lucide-react";
import { useState, type FormEvent } from "react"; // Added type FormEvent

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) { // Typed event
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage(null);

    const formData = new FormData(event.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const subject = formData.get('subject') as string;
    const message = formData.get('message') as string;

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, subject, message }),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitMessage({ type: 'success', text: result.message || 'Your message has been sent successfully! I will get back to you soon.' });
        (event.target as HTMLFormElement).reset();
      } else {
        setSubmitMessage({ type: 'error', text: result.error || 'Failed to send message. Please try again later.' });
      }
    } catch (error) {
      console.error('Contact form submission error:', error);
      setSubmitMessage({ type: 'error', text: 'An unexpected error occurred. Please try again later.' });
    } finally {
      setIsSubmitting(false);
    }
  }


  return (
    <div className="space-y-12">
      <header className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-primary">Get In Touch</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Have a project in mind, a question, or just want to say hi? I'd love to hear from you!
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-12 items-start">
        <Card className="shadow-lg">
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle>Send Me a Message</CardTitle>
              <CardDescription>Fill out the form below and I'll get back to you as soon as possible.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" name="name" placeholder="John Doe" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" name="email" type="email" placeholder="john.doe@example.com" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" name="subject" placeholder="Project Inquiry" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" name="message" placeholder="Your message here..." rows={5} required />
              </div>
            </CardContent>
            <CardFooter className="border-t pt-6">
              <Button type="submit" disabled={isSubmitting} className="w-full md:w-auto btn-glow btn-base-hover">
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Send Message
                  </>
                )}
              </Button>
            </CardFooter>
          </form>
          {submitMessage && (
            <div className={`p-4 mt-4 rounded-md text-sm ${submitMessage.type === 'success' ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200' : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200'}`}>
              {submitMessage.text}
            </div>
          )}
        </Card>

        <div className="space-y-6 pt-8 md:pt-0">
          <h2 className="text-2xl font-semibold text-primary">Contact Information</h2>
          <p className="text-muted-foreground">
            Alternatively, you can reach out to me through the following channels.
          </p>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="bg-primary/10 text-primary p-3 rounded-full">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold">Location</h3>
                <p className="text-muted-foreground">Cairo, Egypt</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-primary/10 text-primary p-3 rounded-full">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold">Email</h3>
                <a href="mailto:alialaa0101617720@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">alialaa0101617720@gmail.com</a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-primary/10 text-primary p-3 rounded-full">
                <Phone className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold">Phone</h3>
                <p className="text-muted-foreground">(+20) 1023783620</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
