'use server';

import { generateProjectDescription, type GenerateProjectDescriptionInput } from '@/ai/flows/project-description-generator';
import { generateSimpleProjectCode, type GenerateSimpleProjectInput } from '@/ai/flows/simple-project-generator';
import { z } from 'zod';

// For Project Description Generation
const descriptionInputSchema = z.object({
  requirements: z.string().min(1, "Requirements are required."),
  technologies: z.string().min(1, "Technologies are required."),
  input: z.string().optional(),
});

export type DescriptionFormState = {
  message: string;
  description?: string;
  fields?: Record<string, string>;
  issues?: string[];
};

export async function generateDescriptionAction(
  prevState: DescriptionFormState,
  formData: FormData
): Promise<DescriptionFormState> {
  const rawFormData = {
    requirements: formData.get('requirements'),
    technologies: formData.get('technologies'),
    input: formData.get('input'),
  };

  const validatedFields = descriptionInputSchema.safeParse(rawFormData);

  if (!validatedFields.success) {
    const issues = validatedFields.error.issues.map((issue) => issue.message);
    return {
      message: 'Validation failed. Please check your input for project description.',
      issues,
      fields: {
        requirements: rawFormData.requirements as string || '',
        technologies: rawFormData.technologies as string || '',
        input: rawFormData.input as string || '',
      }
    };
  }

  try {
    const aiInput: GenerateProjectDescriptionInput = {
      requirements: validatedFields.data.requirements,
      technologies: validatedFields.data.technologies,
      input: validatedFields.data.input || '', 
    };
    
    const result = await generateProjectDescription(aiInput);
    
    if (result.description) {
      return {
        message: 'Description generated successfully!',
        description: result.description,
      };
    } else {
      return {
        message: 'AI could not generate a description. Please try again.',
      };
    }
  } catch (error) {
    console.error('Error generating project description:', error);
    return {
      message: 'An unexpected error occurred while generating description. Please try again later.',
    };
  }
}

// For Simple Project Code Generation
export type ProjectCodeFormState = {
  message: string;
  htmlCode?: string;
  cssCode?: string;
  jsCode?: string;
  notes?: string;
  error?: string;
};

// For now, projectType is fixed to "Snake Game". This action doesn't need form data yet.
export async function generateProjectCodeAction(
  prevState: ProjectCodeFormState
  // formData: FormData // formData is not used for now
): Promise<ProjectCodeFormState> {
  try {
    const aiInput: GenerateSimpleProjectInput = {
      projectType: "Snake Game", // Hardcoded for now
    };
    
    const result = await generateSimpleProjectCode(aiInput);
    
    if (result.htmlCode || result.cssCode || result.jsCode) {
      return {
        message: 'Project code generated successfully for Snake Game!',
        htmlCode: result.htmlCode,
        cssCode: result.cssCode,
        jsCode: result.jsCode,
        notes: result.notes,
      };
    } else {
      return {
        message: 'AI could not generate project code. Please try again.',
        error: 'No code was returned by the AI.',
      };
    }
  } catch (error) {
    console.error('Error generating project code:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    return {
      message: `An unexpected error occurred while generating project code: ${errorMessage}`,
      error: errorMessage,
    };
  }
}
