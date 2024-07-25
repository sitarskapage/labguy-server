export async function generateSlug(title: string, client: any) {
  const count = await client.count();
  const uniqueId = count < 1 ? null : count + 1;

  const formattedTitle = title
    .toLowerCase()
    .split(" ")
    .join("-")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return uniqueId ? `${formattedTitle}-${uniqueId}` : formattedTitle;
}
