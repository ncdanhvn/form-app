const thumbnailGeneratorUrl = import.meta.env
  .VITE_THUMBNAIL_GENERATOR_SERVER_URL;

export async function thumbnailGenerateRequest(
  formUid: string
): Promise<Response> {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  const url = thumbnailGeneratorUrl;
  const body = JSON.stringify({ formUid });

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: body,
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    return response;
  } catch (error) {
    // Handle or rethrow the error as needed
    throw error;
  }
}
