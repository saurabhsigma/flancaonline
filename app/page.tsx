import { HomePage } from "@/components/home-page";
import { getFeaturedProjects, getSiteContent } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [content, products] = await Promise.all([getSiteContent(), getFeaturedProjects()]);

  return <HomePage content={content} projects={products} />;
}
