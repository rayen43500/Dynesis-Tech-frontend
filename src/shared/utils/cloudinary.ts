const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
export const DEFAULT_LOGO_PUBLIC_ID = 'ca08b53a-5b28-4a95-9d02-2e5bbba26bee';

export function getCloudinaryImageUrl(publicId: string) {
  if (!CLOUDINARY_CLOUD_NAME || !publicId) return '';
  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/f_auto,q_auto/${publicId}`;
}