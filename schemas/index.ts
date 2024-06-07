import { z } from 'zod';

export const IconSchema = z.object({
  type: z.string(),
  link: z.string().optional(),
  alt: z.string().optional(),
  size: z.number().optional(),
  color: z.string().optional(),
});

export const TranslationSchema = z.object({
  title: z.string(),
  projectType: z.string(),
  slide_description: z.string().optional(),
});
export const ProjectInfoSchema = z.object({
  category: z.string(),
  client: z.string(),
  location: z.string(),
  date: z.string(),
});
export const ProjectPageSchema = z.object({
  project_id: z.string(),
  lang: z.string(),
  title2: z.string(),
  description: z.string(),
  description2: z.string(),
  techDescription: z.string(),
  ticks: z.array(z.string()),
  project_info: ProjectInfoSchema,
});

export const PortfolioItemSchema = z.object({
  id: z.number(),
  _id: z.string(),
  translations: z.record(TranslationSchema),
  icons: z.record(IconSchema).optional(),
  tech: z.array(z.string()),
  catalogue: z
    .object({
      folderPath: z.string(),
      pageNumber: z.number(),
    })
    .nullable(),
  date: z.string(),
  project_page: z.array(ProjectPageSchema).optional(),
});

export type IconProps = z.infer<typeof IconSchema>;
export type PortfolioItemProps = z.infer<typeof PortfolioItemSchema>;
export type ProjectPageProps = z.infer<typeof ProjectPageSchema>;
export type ProjectInfoProps = z.infer<typeof ProjectInfoSchema>;
