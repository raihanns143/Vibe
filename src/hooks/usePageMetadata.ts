import { useEffect } from 'react';

interface PageMetadata {
  title: string;
  description: string;
}

export const usePageMetadata = ({ title, description }: PageMetadata): void => {
  useEffect(() => {
    document.title = `${title} · Vibe Demo`;
    const descriptionElement = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (descriptionElement) descriptionElement.content = description;
  }, [description, title]);
};
