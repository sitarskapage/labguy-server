export async function generateSlug(title: string, service: any) {
  const count = await service.count();
  const uniqueId = count < 1 ? null : count + 1;

  const formattedTitle = title
    .toLowerCase()
    .split(" ")
    .join("-")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return uniqueId ? `${formattedTitle}-${uniqueId}` : formattedTitle;
}
