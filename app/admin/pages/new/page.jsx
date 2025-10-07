"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  HiOutlineArrowLeft,
  HiOutlineEye,
  HiOutlineDocument,
  HiOutlineSave,
  HiOutlineGlobe,
  HiOutlineCog,
  HiOutlinePhotograph,
  HiOutlineCode,
  HiOutlineTemplate,
} from "react-icons/hi";
import DashboardHeader from "../../component/DashboardHeader";
import PageEditor from "../components/PageEditor";
import SEOSettings from "../components/SEOSettings";
import PageSettings from "../components/PageSettings";

export default function CreatePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("content");
  const [saving, setSaving] = useState(false);
  
  const [pageData, setPageData] = useState({
    title: "",
    slug: "",
    content: "",
    status: "draft",
    featured: false,
    publishAt: null,
    template: "default",
    seo: {
      metaTitle: "",
      metaDescription: "",
      keywords: [],
      ogImage: "",
      canonical: "",
    },
    settings: {
      comments: true,
      searchable: true,
      password: "",
      visibility: "public",
    },
  });

  const tabs = [
    {
      id: "content",
      label: "Content",
      icon: HiOutlineDocument,
      description: "Page content and basic settings",
    },
    {
      id: "seo",
      label: "SEO",
      icon: HiOutlineGlobe,
      description: "Search engine optimization",
    },
    {
      id: "settings",
      label: "Settings",
      icon: HiOutlineCog,
      description: "Advanced page settings",
    },
  ];

  const handleSave = async (status = "draft") => {
    setSaving(true);
    try {
      const dataToSave = {
        ...pageData,
        status,
        updatedAt: new Date().toISOString(),
      };
      
      if (status === "published") {
        dataToSave.publishedAt = new Date().toISOString();
      }
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      console.log("Saving page:", dataToSave);
      
      // Redirect to pages list after successful save
      router.push("/admin/pages");
    } catch (error) {
      console.error("Failed to save page:", error);
    } finally {
      setSaving(false);
    }
  };

  const handlePreview = () => {
    // Open preview in new tab
    const previewData = encodeURIComponent(JSON.stringify(pageData));
    window.open(`/preview?data=${previewData}`, "_blank");
  };

  const updatePageData = (updates) => {
    setPageData(prev => ({ ...prev, ...updates }));
  };

  const updateSEOData = (seoUpdates) => {
    setPageData(prev => ({
      ...prev,
      seo: { ...prev.seo, ...seoUpdates }
    }));
  };

  const updateSettingsData = (settingsUpdates) => {
    setPageData(prev => ({
      ...prev,
      settings: { ...prev.settings, ...settingsUpdates }
    }));
  };

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <DashboardHeader />
      
      {/* Sticky Header */}
      <div className="sticky top-16 z-30 bg-[var(--surface)]/80 backdrop-blur-lg border-b border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left side */}
            <div className="flex items-center gap-4">
              <Link
                href="/admin/pages"
                className="p-2 text-[var(--text-muted)] hover:text-[var(--text)] rounded-lg transition-colors"
                title="Back to pages"
              >
                <HiOutlineArrowLeft className="w-5 h-5" />
              </Link>
              
              <div>
                <h1 className="text-lg font-semibold text-[var(--text)]">
                  Create New Page
                </h1>
                <p className="text-sm text-[var(--text-muted)]">
                  {pageData.title || "Untitled Page"}
                </p>
              </div>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-3">
              <button
                onClick={handlePreview}
                className="inline-flex items-center gap-2 px-4 py-2 text-[var(--text)] bg-[var(--bg)] border border-[var(--border)] rounded-lg hover:bg-[var(--hover)] transition-colors"
              >
                <HiOutlineEye className="w-4 h-4" />
                Preview
              </button>
              
              <button
                onClick={() => handleSave("draft")}
                disabled={saving}
                className="inline-flex items-center gap-2 px-4 py-2 text-[var(--text)] bg-[var(--bg)] border border-[var(--border)] rounded-lg hover:bg-[var(--hover)] transition-colors disabled:opacity-50"
              >
                <HiOutlineSave className="w-4 h-4" />
                {saving ? "Saving..." : "Save Draft"}
              </button>
              
              <button
                onClick={() => handleSave("published")}
                disabled={saving || !pageData.title || !pageData.content}
                className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--primary)] text-[var(--primary-contrast)] rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                <HiOutlineGlobe className="w-4 h-4" />
                {saving ? "Publishing..." : "Publish"}
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-1 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? "text-[var(--primary)] border-[var(--primary)]"
                    : "text-[var(--text-muted)] border-transparent hover:text-[var(--text)] hover:border-[var(--border)]"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content Area */}
          <div className="lg:col-span-2">
            {activeTab === "content" && (
              <PageEditor
                pageData={pageData}
                onUpdate={updatePageData}
              />
            )}
            
            {activeTab === "seo" && (
              <SEOSettings
                seoData={pageData.seo}
                pageTitle={pageData.title}
                onUpdate={updateSEOData}
              />
            )}
            
            {activeTab === "settings" && (
              <PageSettings
                settingsData={pageData.settings}
                onUpdate={updateSettingsData}
              />
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-[var(--surface)] rounded-lg border border-[var(--border)] p-6">
              <h3 className="text-lg font-semibold text-[var(--text)] mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button
                  onClick={() => setActiveTab("content")}
                  className="flex items-center gap-3 w-full p-3 text-left bg-[var(--bg)] rounded-lg hover:bg-[var(--hover)] transition-colors"
                >
                  <HiOutlineTemplate className="w-5 h-5 text-[var(--primary)]" />
                  <div>
                    <div className="font-medium text-[var(--text)]">Choose Template</div>
                    <div className="text-sm text-[var(--text-muted)]">Select page layout</div>
                  </div>
                </button>
                
                <button
                  onClick={() => console.log("Add media")}
                  className="flex items-center gap-3 w-full p-3 text-left bg-[var(--bg)] rounded-lg hover:bg-[var(--hover)] transition-colors"
                >
                  <HiOutlinePhotograph className="w-5 h-5 text-[var(--primary)]" />
                  <div>
                    <div className="font-medium text-[var(--text)]">Add Media</div>
                    <div className="text-sm text-[var(--text-muted)]">Insert images or files</div>
                  </div>
                </button>
                
                <button
                  onClick={() => console.log("View source")}
                  className="flex items-center gap-3 w-full p-3 text-left bg-[var(--bg)] rounded-lg hover:bg-[var(--hover)] transition-colors"
                >
                  <HiOutlineCode className="w-5 h-5 text-[var(--primary)]" />
                  <div>
                    <div className="font-medium text-[var(--text)]">HTML Source</div>
                    <div className="text-sm text-[var(--text-muted)]">Edit raw HTML</div>
                  </div>
                </button>
              </div>
            </div>

            {/* Page Info */}
            <div className="bg-[var(--surface)] rounded-lg border border-[var(--border)] p-6">
              <h3 className="text-lg font-semibold text-[var(--text)] mb-4">
                Page Info
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-[var(--text-muted)]">Status:</span>
                  <span className="text-[var(--text)] capitalize">{pageData.status}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--text-muted)]">Word count:</span>
                  <span className="text-[var(--text)]">
                    {pageData.content.split(/\s+/).filter(word => word.length > 0).length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--text-muted)]">Template:</span>
                  <span className="text-[var(--text)] capitalize">{pageData.template}</span>
                </div>
                {pageData.publishAt && (
                  <div className="flex justify-between">
                    <span className="text-[var(--text-muted)]">Scheduled:</span>
                    <span className="text-[var(--text)]">
                      {new Date(pageData.publishAt).toLocaleDateString()}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
