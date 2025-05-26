
'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { generateDescriptionAction, type FormState } from './actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, Sparkles, Terminal } from 'lucide-react';
import { useEffect, useRef } from 'react';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full md:w-auto btn-glow btn-base-hover">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Generating...
        </>
      ) : (
        <>
          <Sparkles className="mr-2 h-4 w-4" />
          Generate Description
        </>
      )}
    </Button>
  );
}

export default function AiProjectDescriptionPage() {
  const initialState: FormState = { message: '' };
  const [state, formAction] = useFormState(generateDescriptionAction, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.message && state.message.includes('successfully') && formRef.current) {
      // Optionally reset form or keep fields based on UX preference
      // formRef.current.reset();
    }
  }, [state]);

  return (
    <div className="flex flex-col flex-grow items-center justify-center p-4"> {/* Centering and padding */}
      <div className="w-full max-w-2xl space-y-8 bg-ai-tool-gradient p-6 md:p-8 rounded-lg"> {/* Gradient background and padding */}
        <header className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-primary-foreground">AI Project Description Generator</h1>
          <p className="mt-2 text-primary-foreground/80">
            Craft compelling descriptions for your projects effortlessly. Fill in the details below and let our AI assist you.
          </p>
        </header>

        <Card className="shadow-lg bg-card/80 backdrop-blur-sm"> {/* Semi-transparent card for better readability on gradient */}
          <form action={formAction} ref={formRef}>
            <CardHeader>
              <CardTitle>Project Details</CardTitle>
              <CardDescription>Provide information about your project to generate a description.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="requirements">Requirements</Label>
                <Textarea
                  id="requirements"
                  name="requirements"
                  placeholder="e.g., User authentication, real-time chat, data visualization"
                  rows={4}
                  defaultValue={state.fields?.requirements}
                  aria-describedby="requirements-error"
                />
                {state.issues?.find(issue => issue.toLowerCase().includes('requirements')) && (
                  <p id="requirements-error" className="text-sm text-destructive">{state.issues.find(issue => issue.toLowerCase().includes('requirements'))}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="technologies">Technologies Used</Label>
                <Input
                  id="technologies"
                  name="technologies"
                  placeholder="e.g., React, Node.js, Firebase, Tailwind CSS"
                  defaultValue={state.fields?.technologies}
                  aria-describedby="technologies-error"
                />
                {state.issues?.find(issue => issue.toLowerCase().includes('technologies')) && (
                  <p id="technologies-error" className="text-sm text-destructive">{state.issues.find(issue => issue.toLowerCase().includes('technologies'))}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="input">Additional Input (Optional)</Label>
                <Textarea
                  id="input"
                  name="input"
                  placeholder="Any other key features, challenges, or unique aspects"
                  rows={3}
                  defaultValue={state.fields?.input}
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row justify-end items-center gap-4 border-t pt-6">
              <SubmitButton />
            </CardFooter>
          </form>
        </Card>

        {state.message && (
          <Alert variant={state.description ? 'default' : 'destructive'} className="shadow-md bg-card/80 backdrop-blur-sm">
            <Terminal className="h-4 w-4" />
            <AlertTitle>{state.description ? 'Generation Result' : 'Error'}</AlertTitle>
            <AlertDescription>{state.message}</AlertDescription>
          </Alert>
        )}

        {state.description && (
          <Card className="shadow-lg bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <Sparkles className="h-5 w-5" />
                Generated Project Description
              </CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="whitespace-pre-wrap bg-muted/50 p-4 rounded-md text-sm font-mono leading-relaxed text-foreground">
                {state.description}
              </pre>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
