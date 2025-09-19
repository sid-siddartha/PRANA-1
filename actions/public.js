"use server"

export async function getPixabayImage(query) {
  try {
    const res = await fetch(
      `https://pixabay.com/api/?q=${query}&key=${process.env.PIXABAY_API_KEY}&min_width=1280&min_height=720&image_type=illustration&category=feelings`
    );
    const data = await res.json();
    return data.hits[0]?.largeImageURL || null;
  } catch (error) {
    console.error("Pixabay API Error:", error);
    return null;
  }
}