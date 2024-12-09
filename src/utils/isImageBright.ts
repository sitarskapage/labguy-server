import sharp from "sharp";

export default async function isImageBright(img: Buffer) {
  try {
    const image = sharp(img);

    // Convert image to grayscale (to focus on brightness)
    const { data, info } = await image
      .resize(100, 100) // Resize for faster processing (optional)
      .grayscale() // Convert to grayscale
      .raw() // Get raw pixel data
      .toBuffer({ resolveWithObject: true });

    // Calculate the average brightness
    let totalBrightness = 0;
    for (let i = 0; i < data.length; i++) {
      totalBrightness += data[i]; // Each pixel is a single value (grayscale)
    }
    const averageBrightness = totalBrightness / data.length;

    // Define threshold for brightness, 127 is the mid-point of 0-255 grayscale values
    const brightnessThreshold = 127;

    // Check if the image is bright or dark
    if (averageBrightness > brightnessThreshold) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error processing the image:", error);
    return false;
  }
}
