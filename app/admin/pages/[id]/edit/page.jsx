import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/db";
import VisualEditor from "@/app/(dashboard)/components/Editor/VisualEditor";
import { getPageById } from "@/lib/cms-db";

export default async function EditPage({ params }) {
  const session = await auth();
  if (!session) redirect(`/login?callbackUrl=/admin/pages/${params.id}/edit`);
  const page = await getPageById(params.id);
  if (!page) redirect("/admin/pages");

  // We pass initialPage to your editor so it iframes `${slug}?editor=true`
  return (
    <main className="min-h-screen">
      <VisualEditor initialPage={page.slug} />
    </main>
  );
}
