/**
 * Utility function to get the correct asset path for both development and production (GitHub Pages)
 * @param path - The relative path to the asset (e.g., "/assets/album/foto1.jpg")
 * @returns The full path including the base URL
 */
export function getAssetPath(path: string): string {
  // Remove leading slash if present to avoid double slashes
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${import.meta.env.BASE_URL}${cleanPath}`;
}
