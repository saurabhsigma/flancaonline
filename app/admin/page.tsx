import { AdminDashboard } from "@/components/admin/admin-dashboard";
import { LoginForm } from "@/components/admin/login-form";
import { getAdminDashboardData } from "@/lib/data";
import { getAuthSession } from "@/lib/session";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const session = await getAuthSession();

  if (!session?.user) {
    return (
      <main className="container-max flex min-h-screen items-center justify-center py-16">
        <LoginForm />
      </main>
    );
  }

  const data = await getAdminDashboardData();

  return (
    <main className="min-h-screen">
      <AdminDashboard
        content={data.content}
        projects={data.projects}
        messages={data.messages}
      />
    </main>
  );
}
