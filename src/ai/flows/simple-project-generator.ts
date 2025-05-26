'use server';
/**
 * @fileOverview An AI agent that generates code for simple web projects.
 *
 * - generateSimpleProjectCode - A function that handles the simple project code generation process.
 * - GenerateSimpleProjectInput - The input type for the generateSimpleProjectCode function.
 * - GenerateSimpleProjectOutput - The return type for the generateSimpleProjectCode function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateSimpleProjectInputSchema = z.object({
  projectType: z.string().describe('The type of simple project to generate, e.g., "Snake Game", "Calculator", "Todo List".'),
});
export type GenerateSimpleProjectInput = z.infer<typeof GenerateSimpleProjectInputSchema>;

const GenerateSimpleProjectOutputSchema = z.object({
  htmlCode: z.string().describe('The complete HTML code for the project. This should be a single, self-contained HTML structure. All JavaScript and CSS should be included directly in the HTML or clearly marked for separation.'),
  cssCode: z.string().describe('The complete CSS code for styling the project. If not embedded in HTML, provide it here.'),
  jsCode: z.string().describe('The complete JavaScript code for the project functionality. If not embedded in HTML, provide it here.'),
  notes: z.string().optional().describe('Optional notes or instructions on how to run or set up the generated code, or if any external libraries are assumed (though prefer self-contained code).'),
});
export type GenerateSimpleProjectOutput = z.infer<typeof GenerateSimpleProjectOutputSchema>;

export async function generateSimpleProjectCode(
  input: GenerateSimpleProjectInput
): Promise<GenerateSimpleProjectOutput> {
  return generateSimpleProjectFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateSimpleProjectPrompt',
  input: {schema: GenerateSimpleProjectInputSchema},
  output: {schema: GenerateSimpleProjectOutputSchema},
  prompt: `You are an expert web developer tasked with generating complete, standalone code for simple web projects.

Generate the HTML, CSS, and JavaScript for a "{{projectType}}".

Guidelines:
- The HTML should be a single, complete structure.
- CSS should be self-contained. You can include it within a <style> tag in the HTML, or provide it in the 'cssCode' field.
- JavaScript should be self-contained and handle all logic. You can include it within a <script> tag in the HTML (preferably at the end of the body), or provide it in the 'jsCode' field.
- Aim for modern, clean, and functional code.
- For styling, use simple CSS. Do not use Tailwind CSS or other utility-first frameworks in the generated code.
- The generated project should be runnable by simply saving the HTML (and potentially separate CSS/JS files) and opening the HTML file in a browser.

If "{{projectType}}" is "Snake Game", the game should include:
- A visible game board (e.g., using a <canvas> element or a grid of <div>s).
- A snake that the player can control using arrow keys.
- Food items that appear randomly on the board.
- Score tracking, displayed to the user.
- A game over condition (e.g., snake hits a wall or itself).
- A way to restart the game after a game over.

Please provide the generated code in the specified output fields: 'htmlCode', 'cssCode', and 'jsCode'. If CSS or JS is embedded in the HTML, the respective fields can be minimal or indicate that they are embedded. Provide any important setup notes in the 'notes' field.
`,
});

const generateSimpleProjectFlow = ai.defineFlow(
  {
    name: 'generateSimpleProjectFlow',
    inputSchema: GenerateSimpleProjectInputSchema,
    outputSchema: GenerateSimpleProjectOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    if (!output) {
      throw new Error('AI failed to generate project code.');
    }
    // Ensure all required fields are present, even if empty, if the AI doesn't provide them
    return {
      htmlCode: output.htmlCode || '',
      cssCode: output.cssCode || '',
      jsCode: output.jsCode || '',
      notes: output.notes || '',
    };
  }
);
