"use client";

import React, { useState, useEffect } from "react";
import {
  HiOutlineEye,
  HiOutlineCode,
  HiOutlinePhotograph,
  HiOutlineLink,
  HiOutlineBold,
  HiOutlineItalic,
  HiOutlineListBullet,
  HiOutlineListNumber,
  HiOutlineQuote,
  HiOutlineH1,
  HiOutlineH2,
  HiOutlineH3,
  HiOutlineTemplate,
  HiOutlineGlobe,
} from "react-icons/hi";

import { IoArrowUndoOutline, IoArrowRedoOutline } from "react-icons/io5";

export default function PageEditor({ pageData, onUpdate }) {
  const [editorMode, setEditorMode] = useState("visual"); // visual, code, preview
  const [content, setContent] = useState(pageData.content || "");
  const [title, setTitle] = useState(pageData.title || "");
  const [slug, setSlug] = useState(pageData.slug || "");
  const [autoGenerateSlug, setAutoGenerateSlug] = useState(true);

  // Auto-generate slug from title
  useEffect(() => {
    if (autoGenerateSlug && title) {
      const generatedSlug =
        "/" +
        title
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, "")
          .replace(/\s+/g, "-")
          .replace(/-+/g, "-")
          .trim();
      setSlug(generatedSlug);
    }
  }, [title, autoGenerateSlug]);

  // Update parent component when data changes
  useEffect(() => {
    // Only call onUpdate if local state differs from pageData props
    if (
      title !== pageData.title ||
      slug !== pageData.slug ||
      content !== pageData.content
    ) {
      onUpdate({ title, slug, content });
    }
  }, [title, slug, content, onUpdate, pageData]);

  const templates = [
    { id: "default", name: "Default", description: "Standard page layout" },
    {
      id: "landing",
      name: "Landing Page",
      description: "Hero section with CTA",
    },
    { id: "blog", name: "Blog Post", description: "Article with sidebar" },
    { id: "contact", name: "Contact", description: "Contact form layout" },
    { id: "about", name: "About", description: "Team and company info" },
  ];

  const formatButtons = [
    { id: "bold", icon: HiOutlineBold, title: "Bold", shortcut: "Ctrl+B" },
    {
      id: "italic",
      icon: HiOutlineItalic,
      title: "Italic",
      shortcut: "Ctrl+I",
    },
    { id: "h1", icon: HiOutlineH1, title: "Heading 1" },
    { id: "h2", icon: HiOutlineH2, title: "Heading 2" },
    { id: "h3", icon: HiOutlineH3, title: "Heading 3" },
    { id: "ul", icon: HiOutlineListBullet, title: "Bullet List" },
    { id: "ol", icon: HiOutlineListNumber, title: "Numbered List" },
    { id: "quote", icon: HiOutlineQuote, title: "Quote" },
    { id: "link", icon: HiOutlineLink, title: "Insert Link" },
    { id: "image", icon: HiOutlinePhotograph, title: "Insert Image" },
  ];

  const handleFormat = (format) => {
    const textarea = document.getElementById("content-editor");
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    let newText = "";
    let newContent = "";

    switch (format) {
      case "bold":
        newText = `**${selectedText || "bold text"}**`;
        break;
      case "italic":
        newText = `*${selectedText || "italic text"}*`;
        break;
      case "h1":
        newText = `# ${selectedText || "Heading 1"}`;
        break;
      case "h2":
        newText = `## ${selectedText || "Heading 2"}`;
        break;
      case "h3":
        newText = `### ${selectedText || "Heading 3"}`;
        break;
      case "ul":
        newText = `- ${selectedText || "List item"}`;
        break;
      case "ol":
        newText = `1. ${selectedText || "List item"}`;
        break;
      case "quote":
        newText = `> ${selectedText || "Quote text"}`;
        break;
      case "link":
        newText = `[${selectedText || "link text"}](url)`;
        break;
      case "image":
        newText = `![${selectedText || "alt text"}](image-url)`;
        break;
      default:
        return;
    }

    newContent = content.substring(0, start) + newText + content.substring(end);
    setContent(newContent);

    // Restore focus and set cursor position
    setTimeout(() => {
      textarea.focus();
      const newPosition = start + newText.length;
      textarea.setSelectionRange(newPosition, newPosition);
    }, 0);
  };

  const handleImageUpload = () => {
    // Simulate image upload dialog
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        // In real app, upload to server and get URL
        const imageUrl = URL.createObjectURL(file);
        const imageMarkdown = `![${file.name}](${imageUrl})`;
        setContent((prev) => `${prev}\n\n${imageMarkdown}\n\n`);
      }
    };
    input.click();
  };

  const renderPreview = () => {
    // Simple markdown-to-HTML converter for preview
    let html = content
      .replace(/^### (.*$)/gim, "<h3>$1</h3>")
      .replace(/^## (.*$)/gim, "<h2>$1</h2>")
      .replace(/^# (.*$)/gim, "<h1>$1</h1>")
      .replace(/\*\*(.*)\*\*/gim, "<strong>$1</strong>")
      .replace(/\*(.*)\*/gim, "<em>$1</em>")
      .replace(
        /!\[([^\]]*)\]\(([^\)]*)\)/gim,
        '<img alt="$1" src="$2" style="max-width: 100%; height: auto;" />'
      )
      .replace(/\[([^\]]*)\]\(([^\)]*)\)/gim, '<a href="$2">$1</a>')
      .replace(/^> (.*$)/gim, "<blockquote>$1</blockquote>")
      .replace(/^\- (.*$)/gim, "<li>$1</li>")
      .replace(/^1\. (.*$)/gim, "<li>$1</li>")
      .replace(/\n/gim, "<br />");

    return { __html: html };
  };

  return (
    <div className="space-y-6">
      {/* Page Title and Slug */}
      <div className="bg-[var(--surface)] rounded-lg border border-[var(--border)] p-6">
        <div className="space-y-4">
          <div>
            <label
              htmlFor="page-title"
              className="block text-sm font-medium text-[var(--text)] mb-2"
            >
              Page Title *
            </label>
            <input
              id="page-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter page title..."
              className="w-full px-4 py-3 bg-[var(--bg)] border border-[var(--border)] rounded-lg text-[var(--text)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent text-lg font-semibold"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label
                htmlFor="page-slug"
                className="block text-sm font-medium text-[var(--text)]"
              >
                URL Slug
              </label>
              <label className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
                <input
                  type="checkbox"
                  checked={autoGenerateSlug}
                  onChange={(e) => setAutoGenerateSlug(e.target.checked)}
                  className="rounded border-[var(--border)] text-[var(--primary)] focus:ring-[var(--primary)]"
                />
                Auto-generate
              </label>
            </div>
            <div className="flex items-center">
              <span className="px-3 py-3 bg-[var(--bg-muted)] border border-r-0 border-[var(--border)] rounded-l-lg text-[var(--text-muted)] text-sm">
                yoursite.com
              </span>
              <input
                id="page-slug"
                type="text"
                value={slug}
                onChange={(e) => {
                  setSlug(e.target.value);
                  setAutoGenerateSlug(false);
                }}
                placeholder="/page-url"
                className="flex-1 px-4 py-3 bg-[var(--bg)] border border-[var(--border)] rounded-r-lg text-[var(--text)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent font-mono text-sm"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Template Selection */}
      <div className="bg-[var(--surface)] rounded-lg border border-[var(--border)] p-6">
        <h3 className="text-lg font-semibold text-[var(--text)] mb-4 flex items-center gap-2">
          <HiOutlineTemplate className="w-5 h-5" />
          Page Template
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {templates.map((template) => (
            <button
              key={template.id}
              onClick={() => onUpdate({ template: template.id })}
              className={`p-4 text-left border rounded-lg transition-colors ${
                pageData.template === template.id
                  ? "border-[var(--primary)] bg-blue-50 text-[var(--primary)]"
                  : "border-[var(--border)] hover:border-[var(--primary)] hover:bg-[var(--hover)]"
              }`}
            >
              <div className="font-medium text-[var(--text)]">
                {template.name}
              </div>
              <div className="text-sm text-[var(--text-muted)] mt-1">
                {template.description}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Content Editor */}
      <div className="bg-[var(--surface)] rounded-lg border border-[var(--border)] overflow-hidden">
        {/* Editor Header */}
        <div className="border-b border-[var(--border)] p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-[var(--text)]">
              Content
            </h3>

            {/* Editor Mode Tabs */}
            <div className="flex bg-[var(--bg)] rounded-lg p-1 border border-[var(--border)]">
              <button
                onClick={() => setEditorMode("visual")}
                className={`px-3 py-1 text-sm rounded transition-colors ${
                  editorMode === "visual"
                    ? "bg-[var(--primary)] text-[var(--primary-contrast)]"
                    : "text-[var(--text-muted)] hover:text-[var(--text)]"
                }`}
              >
                Visual
              </button>
              <button
                onClick={() => setEditorMode("code")}
                className={`px-3 py-1 text-sm rounded transition-colors ${
                  editorMode === "code"
                    ? "bg-[var(--primary)] text-[var(--primary-contrast)]"
                    : "text-[var(--text-muted)] hover:text-[var(--text)]"
                }`}
              >
                <HiOutlineCode className="w-4 h-4 inline mr-1" />
                Code
              </button>
              <button
                onClick={() => setEditorMode("preview")}
                className={`px-3 py-1 text-sm rounded transition-colors ${
                  editorMode === "preview"
                    ? "bg-[var(--primary)] text-[var(--primary-contrast)]"
                    : "text-[var(--text-muted)] hover:text-[var(--text)]"
                }`}
              >
                <HiOutlineEye className="w-4 h-4 inline mr-1" />
                Preview
              </button>
            </div>
          </div>

          {/* Formatting Toolbar */}
          {(editorMode === "visual" || editorMode === "code") && (
            <div className="flex flex-wrap items-center gap-1">
              {formatButtons.map((button) => {
                {
                  console.log(button.id, button.icon);
                }
                return (
                  <button
                    key={button.id}
                    onClick={() =>
                      button.id === "image"
                        ? handleImageUpload()
                        : handleFormat(button.id)
                    }
                    title={`${button.title}${
                      button.shortcut ? ` (${button.shortcut})` : ""
                    }`}
                    className="p-2 text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--hover)] rounded transition-colors"
                  >
                    {button.icon ? (
                      <button.icon className="w-4 h-4" />
                    ) : (
                      <span>?</span>
                    )}
                  </button>
                );
              })}

              <div className="w-px h-6 bg-[var(--border)] mx-2" />

              <button
                onClick={() => console.log("Undo")}
                title="Undo (Ctrl+Z)"
                className="p-2 text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--hover)] rounded transition-colors"
              >
                <IoArrowUndoOutline className="w-4 h-4" />
              </button>
              <button
                onClick={() => console.log("Redo")}
                title="Redo (Ctrl+Y)"
                className="p-2 text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--hover)] rounded transition-colors"
              >
                <IoArrowRedoOutline className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Editor Content */}
        <div className="min-h-[400px]">
          {editorMode === "preview" ? (
            <div className="p-6 prose prose-slate max-w-none">
              <h1 className="text-3xl font-bold text-[var(--text)] mb-6">
                {title || "Untitled Page"}
              </h1>
              <div
                className="text-[var(--text)] leading-relaxed"
                dangerouslySetInnerHTML={renderPreview()}
              />
              {!content && (
                <div className="text-center py-12 text-[var(--text-muted)]">
                  <HiOutlineEye className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No content to preview yet.</p>
                  <p className="text-sm mt-2">
                    Switch to Visual or Code mode to start writing.
                  </p>
                </div>
              )}
            </div>
          ) : (
            <textarea
              id="content-editor"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={
                editorMode === "code"
                  ? "Write your content in Markdown or HTML..."
                  : "Start writing your page content..."
              }
              className="w-full min-h-[400px] p-6 bg-transparent border-none text-[var(--text)] placeholder-[var(--text-muted)] focus:outline-none resize-none font-mono text-sm leading-relaxed"
              style={{
                fontFamily:
                  editorMode === "code"
                    ? "Monaco, 'Courier New', monospace"
                    : "inherit",
              }}
            />
          )}
        </div>

        {/* Editor Footer */}
        <div className="border-t border-[var(--border)] px-6 py-3 bg-[var(--bg-muted)] text-sm text-[var(--text-muted)]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span>
                Words:{" "}
                {content.split(/\s+/).filter((word) => word.length > 0).length}
              </span>
              <span>Characters: {content.length}</span>
            </div>

            {editorMode !== "preview" && (
              <div className="flex items-center gap-2">
                <span>Markdown supported</span>
                <button
                  onClick={() =>
                    window.open(
                      "https://www.markdownguide.org/basic-syntax/",
                      "_blank"
                    )
                  }
                  className="text-[var(--primary)] hover:underline"
                >
                  Learn syntax
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
