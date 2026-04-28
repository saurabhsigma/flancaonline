import "server-only";

import { defaultProjects, defaultSiteContent } from "@/lib/constants";
import { connectToDatabase } from "@/lib/db";
import { ContactMessageModel } from "@/models/contact-message";
import { ProjectModel } from "@/models/project";
import { SiteContentModel } from "@/models/site-content";
import { slugify } from "@/lib/utils";

const LEGACY_HERO_BADGE = "Digital products that move business forward";
const LEGACY_PROJECT_TITLES = ["Northstar Ventures", "PulseFlow Dashboard"];
const LEGACY_CONTACT_EMAIL = "hello@flanca.studio";
const LEGACY_CONTACT_PHONE = "+91 98765 43210";

function isDatabaseUnavailable(error: unknown) {
  return error instanceof Error && /ECONNREFUSED|MongooseServerSelectionError/i.test(error.message);
}

function getDefaultProjects() {
  return defaultProjects.map((project) => ({
    _id: slugify(project.title),
    ...project,
  }));
}

export async function ensureSiteContent() {
  try {
    await connectToDatabase();
    const existing = await SiteContentModel.findOne();

    if (existing) {
      // One-time migration for legacy seeded content.
      if (existing.heroBadge === LEGACY_HERO_BADGE) {
        Object.assign(existing, defaultSiteContent);
        await existing.save();
      } else if (
        existing.contactEmail === LEGACY_CONTACT_EMAIL ||
        existing.contactPhone === LEGACY_CONTACT_PHONE
      ) {
        existing.contactEmail = defaultSiteContent.contactEmail;
        existing.contactPhone = defaultSiteContent.contactPhone;
        await existing.save();
      }

      return existing;
    }

    return SiteContentModel.create(defaultSiteContent);
  } catch (error) {
    if (isDatabaseUnavailable(error)) {
      return defaultSiteContent;
    }

    throw error;
  }
}

export async function getSiteContent() {
  const content = await ensureSiteContent();
  return JSON.parse(JSON.stringify(content));
}

export async function getFeaturedProjects() {
  try {
    await connectToDatabase();

    const projectCount = await ProjectModel.countDocuments();
    if (projectCount === 0) {
      await ProjectModel.insertMany(defaultProjects);
    } else {
      const legacyProjectCount = await ProjectModel.countDocuments({
        title: { $in: LEGACY_PROJECT_TITLES },
      });

      // Replace only the old two-item starter dataset, keep all custom user data intact.
      if (projectCount <= 2 && legacyProjectCount === projectCount) {
        await ProjectModel.deleteMany({});
        await ProjectModel.insertMany(defaultProjects);
      }
    }

    const projects = await ProjectModel.find().sort({ createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(projects));
  } catch (error) {
    if (isDatabaseUnavailable(error)) {
      return getDefaultProjects();
    }

    throw error;
  }
}

export async function getAdminDashboardData() {
  try {
    await connectToDatabase();

    const [content, projects, messages] = await Promise.all([
      getSiteContent(),
      getFeaturedProjects(),
      ContactMessageModel.find().sort({ createdAt: -1 }).limit(10).lean(),
    ]);

    return {
      content,
      projects: JSON.parse(JSON.stringify(projects)),
      messages: JSON.parse(JSON.stringify(messages)),
    };
  } catch (error) {
    if (isDatabaseUnavailable(error)) {
      return {
        content: defaultSiteContent,
        projects: getDefaultProjects(),
        messages: [],
      };
    }

    throw error;
  }
}
