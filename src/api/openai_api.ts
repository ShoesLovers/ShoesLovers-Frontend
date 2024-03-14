import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});
export async function generateImageAPI(prompt: string) {
  try {
    const response = await openai.images.generate({
      prompt: prompt + 'sneakers shoes',
      n: 1,
      size: '512x512',
    });
    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
}
