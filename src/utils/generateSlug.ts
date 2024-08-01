export async function generateSlug(title: string, client: any) {
  try {
    const count = await client.count();
    const uniqueId = count < 1 ? null : count + 1;

    const formattedTitle = title
      .toLowerCase()
      .split(" ")
      .join("-")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    const slug = uniqueId ? `${formattedTitle}-${uniqueId}` : formattedTitle;

    return slug;
  } catch (error) {
    throw error;
  }
}
