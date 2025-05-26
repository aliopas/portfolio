
'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { generateDescriptionAction, type DescriptionFormState, generateProjectCodeAction, type ProjectCodeFormState } from './actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, Sparkles, Terminal, Code, Gamepad2 } from 'lucide-react';
import { useEffect, useRef } from 'react';

function SubmitDescriptionButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full md:w-auto btn-glow btn-base-hover">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Generating Description...
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

function SubmitProjectCodeButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full md:w-auto btn-glow btn-base-hover">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Generating Code...
        </>
      ) : (
        <>
          <Gamepad2 className="mr-2 h-4 w-4" />
          Generate Snake Game Code
        </>
      )}
    </Button>
  );
}

export default function AiProjectDescriptionPage() {
  const initialDescriptionState: DescriptionFormState = { message: '' };
  const [descriptionState, descriptionFormAction] = useFormState(generateDescriptionAction, initialDescriptionState);
  const descriptionFormRef = useRef<HTMLFormElement>(null);

  const initialProjectCodeState: ProjectCodeFormState = { message: '' };
  const [projectCodeState, projectCodeFormAction] = useFormState(generateProjectCodeAction, initialProjectCodeState);


  useEffect(() => {
    if (descriptionState.message && descriptionState.message.includes('successfully') && descriptionFormRef.current) {
      // Optionally reset form or keep fields based on UX preference
      // descriptionFormRef.current.reset();
    }
  }, [descriptionState]);

  const CodeDisplay = ({ title, code }: { title: string; code?: string }) => {
    if (!code || code.trim() === '') return null;
    return (
      <div className="space-y-2">
        <h4 className="font-semibold text-lg text-primary-foreground/90">{title}</h4>
        <pre className="whitespace-pre-wrap bg-muted/30 p-4 rounded-md text-sm font-mono leading-relaxed text-primary-foreground/80 max-h-96 overflow-y-auto">
          {code}
        </pre>
      </div>
    );
  };

  return (
    <div className="flex flex-col flex-grow items-center justify-center p-4 space-y-8"> {/* Centering and padding */}
      {/* Project Description Generator Section */}
      <div className="w-full max-w-2xl space-y-8 bg-ai-tool-gradient p-6 md:p-8 rounded-lg">
        <header className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-primary-foreground">AI Project Description Generator</h1>
          <p className="mt-2 text-primary-foreground/80">
            Craft compelling descriptions for your projects effortlessly. Fill in the details below and let our AI assist you.
          </p>
        </header>

        <Card className="shadow-lg bg-card/80 backdrop-blur-sm">
          <form action={descriptionFormAction} ref={descriptionFormRef}>
            <CardHeader>
              <CardTitle>Project Details for Description</CardTitle>
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
                  defaultValue={descriptionState.fields?.requirements}
                  aria-describedby="requirements-error"
                />
                {descriptionState.issues?.find(issue => issue.toLowerCase().includes('requirements')) && (
                  <p id="requirements-error" className="text-sm text-destructive">{descriptionState.issues.find(issue => issue.toLowerCase().includes('requirements'))}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="technologies">Technologies Used</Label>
                <Input
                  id="technologies"
                  name="technologies"
                  placeholder="e.g., React, Node.js, Firebase, Tailwind CSS"
                  defaultValue={descriptionState.fields?.technologies}
                  aria-describedby="technologies-error"
                />
                {descriptionState.issues?.find(issue => issue.toLowerCase().includes('technologies')) && (
                  <p id="technologies-error" className="text-sm text-destructive">{descriptionState.issues.find(issue => issue.toLowerCase().includes('technologies'))}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="input">Additional Input (Optional)</Label>
                <Textarea
                  id="input"
                  name="input"
                  placeholder="Any other key features, challenges, or unique aspects"
                  rows={3}
                  defaultValue={descriptionState.fields?.input}
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row justify-end items-center gap-4 border-t pt-6">
              <SubmitDescriptionButton />
            </CardFooter>
          </form>
        </Card>

        {descriptionState.message && (
          <Alert variant={descriptionState.description ? 'default' : 'destructive'} className="shadow-md bg-card/80 backdrop-blur-sm">
            <Terminal className="h-4 w-4" />
            <AlertTitle>{descriptionState.description ? 'Description Generation Result' : 'Error'}</AlertTitle>
            <AlertDescription>{descriptionState.message}</AlertDescription>
          </Alert>
        )}

        {descriptionState.description && (
          <Card className="shadow-lg bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <Sparkles className="h-5 w-5" />
                Generated Project Description
              </CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="whitespace-pre-wrap bg-muted/50 p-4 rounded-md text-sm font-mono leading-relaxed text-foreground">
                {descriptionState.description}
              </pre>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Simple Project Code Generator Section */}
      <div className="w-full max-w-2xl space-y-8 bg-ai-tool-gradient p-6 md:p-8 rounded-lg">
        <header className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-primary-foreground">AI Simple Project Code Generator</h1>
          <p className="mt-2 text-primary-foreground/80">
            Let AI generate the HTML, CSS, and JavaScript for a simple "Snake Game".
          </p>
        </header>
        
        <Card className="shadow-lg bg-card/80 backdrop-blur-sm">
           <form action={projectCodeFormAction}>
            <CardHeader>
                <CardTitle>Generate Snake Game</CardTitle>
                <CardDescription>Click the button to generate the code for a basic Snake game.</CardDescription>
            </CardHeader>
            <CardContent>
                {/* Future: Add input for project type if not hardcoded */}
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row justify-end items-center gap-4 border-t pt-6">
                <SubmitProjectCodeButton />
            </CardFooter>
           </form>
        </Card>

        {projectCodeState.message && (
          <Alert variant={projectCodeState.htmlCode ? 'default' : 'destructive'} className="shadow-md bg-card/80 backdrop-blur-sm">
            <Code className="h-4 w-4" />
            <AlertTitle>{projectCodeState.htmlCode ? 'Code Generation Result' : 'Status'}</AlertTitle>
            <AlertDescription>{projectCodeState.message}</AlertDescription>
          </Alert>
        )}

        {(projectCodeState.htmlCode || projectCodeState.cssCode || projectCodeState.jsCode || projectCodeState.notes) && (
          <Card className="shadow-lg bg-card/80 backdrop-blur-sm text-primary-foreground">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <Gamepad2 className="h-5 w-5" />
                Generated Snake Game Code
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <CodeDisplay title="HTML Code" code={projectCodeState.htmlCode} />
              <CodeDisplay title="CSS Code" code={projectCodeState.cssCode} />
              <CodeDisplay title="JavaScript Code" code={projectCodeState.jsCode} />
              {projectCodeState.notes && (
                <div className="space-y-2">
                  <h4 className="font-semibold text-lg">Notes from AI:</h4>
                  <p className="text-sm whitespace-pre-wrap bg-muted/30 p-3 rounded-md">{projectCodeState.notes}</p>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
