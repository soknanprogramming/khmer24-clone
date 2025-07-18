export const toSlug = (text : string) => {
  return text
    .toLowerCase()                     // lowercase
    .replace(/&/g, "and")              // replace & with "and"
    .replace(/%[0-9a-f]{2}/gi, '')     // remove URL encoded characters like %7D
    .replace(/\s+/g, "-")              // replace spaces with "-"
    .replace(/[^a-z0-9-]/g, '')        // remove special characters
    .replace(/-+/g, '-')               // collapse multiple dashes
    .replace(/^-|-$/g, '');            // trim starting/ending dashes
}