'use server';

import { generateProjectDescription, type GenerateProjectDescriptionInput } from '@/ai/flows/project-description-generator';
import { z } from 'zod';

const inputSchema = z.object({
  requirements: z.string().min(1, "Requirements are required."),
  technologies: z.string().min(1, "Technologies are required."),
  input: z.string().optional(),
});

export type FormState = {
  message: string;
  description?: string;
  fields?: Record<string, string>;
  issues?: string[];
};

export async function generateDescriptionAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const rawFormData = {
    requirements: formData.get('requirements'),
    technologies: formData.get('technologies'),
    input: formData.get('input'),
  };

  const validatedFields = inputSchema.safeParse(rawFormData);

  if (!validatedFields.success) {
    const issues = validatedFields.error.issues.map((issue) => issue.message);
    return {
      message: 'Validation failed. Please check your input.',
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
      input: validatedFields.data.input || '', // Ensure input is always a string
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
      message: 'An unexpected error occurred. Please try again later.',
    };
  }
}
