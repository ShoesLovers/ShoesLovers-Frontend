import apiClient from './apiClient';

export async function generateImageAPI(prompt: string) {
  try {
    const response = await apiClient.post(
      '/openai',
      { prompt },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
}
