export const ADMIN_USERNAME = "admin";
export const ADMIN_PASSWORD = "admin123";

export const defaultSiteContent = {
  heroBadge: "Digital products for modern Indian businesses",
  heroTitle: "Flanca designs and builds scalable software products.",
  heroDescription:
    "We partner with ambitious teams to craft products that look premium, feel intuitive, and scale with confidence.",
  heroPrimaryCta: "Book a Strategy Call",
  heroSecondaryCta: "Explore Products",
  servicesIntro:
    "Our star services focus on CMS, LMS, and high-demand software products that modern Indian businesses adopt to scale faster.",
  services: [
    {
      title: "CMS Platforms",
      description:
        "Custom content management systems for media brands, agencies, and teams that need fast publishing, roles, approvals, and SEO-ready workflows.",
    },
    {
      title: "LMS Platforms",
      description:
        "Learning management solutions for coaching institutes, schools, and training companies with courses, assessments, certificates, and learner analytics.",
    },
    {
      title: "E-commerce Products",
      description:
        "Conversion-focused commerce products with catalog, cart, payments, promotions, and order flows optimized for mobile-first customers.",
    },
    {
      title: "CRM & ERP Systems",
      description:
        "Business software for sales, operations, and support with lead pipelines, automation, reporting, and integrations tailored to your process.",
    },
  ],
  whyChooseUsTitle: "Why fast-growing teams choose Flanca",
  whyChooseUsItems: [
    "Strategy-led execution from discovery through launch",
    "Senior-level design and engineering on every project",
    "Clear communication, fast iterations, and measurable outcomes",
  ],
  aboutTitle: "A focused product studio for founders, startups, and modern businesses",
  aboutDescription:
    "Flanca blends product thinking, visual refinement, and reliable engineering to help brands launch software that feels thoughtful on day one and flexible on day one hundred.",
  contactTitle: "Tell us what you're building",
  contactDescription:
    "Share your goals, timeline, and vision. We’ll come back with a practical next step.",
  contactEmail: "saurabh962003@gmail.com",
  contactPhone: "+91-9369308467",
  contactLocation: "Remote-first, serving clients worldwide",
};

export const defaultProjects = [
  {
    title: "NewsFlow CMS",
    description:
      "A content management system for new-age publishing agencies to draft, edit, schedule, and publish articles faster while keeping SEO, editorial workflows, and approvals in one place.",
    techStack: ["Next.js", "MongoDB", "Tailwind CSS", "Cloudinary"],
    images: [
      {
        url: "https://res.cloudinary.com/demo/image/upload/sample.jpg",
        publicId: "newsflow-cms",
        alt: "NewsFlow CMS dashboard preview",
      },
    ],
    featured: true,
  },
  {
    title: "CampusLearn LMS",
    description:
      "A learning management system for coaching institutes, schools, and training companies with courses, quizzes, certificates, and student progress tracking.",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "MongoDB"],
    images: [
      {
        url: "https://res.cloudinary.com/demo/image/upload/samples/landscapes/girl-urban-view.jpg",
        publicId: "campuslearn-lms",
        alt: "CampusLearn LMS preview",
      },
    ],
    featured: true,
  },
  {
    title: "TestAce AI",
    description:
      "An AI-powered test series platform for competitive exam prep with mock tests, instant analytics, adaptive practice, and student performance insights.",
    techStack: ["Next.js", "OpenAI", "PostgreSQL", "Tailwind CSS"],
    images: [
      {
        url: "https://res.cloudinary.com/demo/image/upload/samples/landscapes/beach-boat.jpg",
        publicId: "testace-ai",
        alt: "TestAce AI preview",
      },
    ],
    featured: true,
  },
  {
    title: "RetailKart Commerce Suite",
    description:
      "A D2C and retail commerce platform for Indian sellers with catalog management, offers, payments, and order tracking built to convert on mobile-first traffic.",
    techStack: ["Next.js", "Stripe", "MongoDB", "Cloudinary"],
    images: [
      {
        url: "https://res.cloudinary.com/demo/image/upload/samples/ecommerce/leather_bag.jpg",
        publicId: "retailkart-commerce-suite",
        alt: "RetailKart commerce suite preview",
      },
    ],
    featured: true,
  },
  {
    title: "ClinicDesk",
    description:
      "A clinic management platform for doctors and diagnostic centers with appointments, patient records, billing, and follow-ups in one dashboard.",
    techStack: ["Next.js", "MongoDB", "Twilio", "Tailwind CSS"],
    images: [
      {
        url: "https://res.cloudinary.com/demo/image/upload/samples/food/dessert.jpg",
        publicId: "clinicdesk",
        alt: "ClinicDesk dashboard preview",
      },
    ],
    featured: true,
  },
  {
    title: "HireSphere HRMS",
    description:
      "A modern HR and payroll product for startups and SMEs covering onboarding, attendance, leave, payroll, and employee self-service.",
    techStack: ["Next.js", "TypeScript", "MongoDB", "PDF Generation"],
    images: [
      {
        url: "https://res.cloudinary.com/demo/image/upload/samples/people/kitchen-bar.jpg",
        publicId: "hiresphere-hrms",
        alt: "HireSphere HRMS preview",
      },
    ],
    featured: true,
  },
  {
    title: "FleetPilot Logistics",
    description:
      "A logistics and fleet management platform for transport businesses to track vehicles, shipments, routes, and delivery performance.",
    techStack: ["Next.js", "Maps API", "MongoDB", "Node.js"],
    images: [
      {
        url: "https://res.cloudinary.com/demo/image/upload/samples/people/bicycle.jpg",
        publicId: "fleetpilot-logistics",
        alt: "FleetPilot logistics preview",
      },
    ],
    featured: true,
  },
  {
    title: "PropertyPulse CRM",
    description:
      "A real-estate CRM for builders and brokers to capture leads, manage site visits, and follow up faster across WhatsApp, email, and calls.",
    techStack: ["Next.js", "WhatsApp API", "MongoDB", "Tailwind CSS"],
    images: [
      {
        url: "https://res.cloudinary.com/demo/image/upload/samples/landscapes/architecture-signs.jpg",
        publicId: "propertypulse-crm",
        alt: "PropertyPulse CRM preview",
      },
    ],
    featured: true,
  },
  {
    title: "FoodLane POS",
    description:
      "A restaurant ordering and point-of-sale product for dine-in, takeaway, and online orders with menu control, table management, and reports.",
    techStack: ["Next.js", "MongoDB", "Payments", "Cloudinary"],
    images: [
      {
        url: "https://res.cloudinary.com/demo/image/upload/samples/food/pot.jpg",
        publicId: "foodlane-pos",
        alt: "FoodLane POS preview",
      },
    ],
    featured: true,
  },
  {
    title: "SchoolBridge ERP",
    description:
      "A school ERP for admissions, attendance, homework, fees, notices, and parent communication, designed for institutions of every size.",
    techStack: ["Next.js", "MongoDB", "SMS", "PDF Generation"],
    images: [
      {
        url: "https://res.cloudinary.com/demo/image/upload/samples/landscapes/girl-urban-view.jpg",
        publicId: "schoolbridge-erp",
        alt: "SchoolBridge ERP preview",
      },
    ],
    featured: true,
  },
  {
    title: "BizBook Inventory",
    description:
      "An inventory and billing platform for distributors and retailers with stock alerts, GST-ready invoices, and branch-wise reporting.",
    techStack: ["Next.js", "PostgreSQL", "Tailwind CSS", "QR Codes"],
    images: [
      {
        url: "https://res.cloudinary.com/demo/image/upload/samples/landscapes/nature-mountains.jpg",
        publicId: "bizbook-inventory",
        alt: "BizBook inventory preview",
      },
    ],
    featured: true,
  },
];
