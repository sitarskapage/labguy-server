export async function generateSlug(title: string, client: any) {
  try {
    // Format the title into a slug
    const formattedTitle = title
      .toLowerCase()
      .split(" ")
      .join("-")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    // Check how many records already exist with the same slug (or a similar one)
    const existingRecords = await client.count({
      where: {
        general: {
          slug: {
            startsWith: formattedTitle, // Find slugs that start with the same base title
          },
        },
      },
    });

    // If there are existing records, append the count to make the slug unique
    const slug =
      existingRecords > 0
        ? `${formattedTitle}-${existingRecords + 1}`
        : formattedTitle;

    return slug;
  } catch (error) {
    throw error;
  }
}
