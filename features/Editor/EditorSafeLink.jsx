"use client";
import React from "react";
import Link from "next/link";

/** Shared: Editor-safe link (defaults included) */
export function EditorSafeLink({
  isEditor = false,
  href = "#",
  className,
  children,
  editorProps = (id) => (isEditor ? { "data-editor-id": id } : {}),
  editorId,
  ...rest
}) {
  if (isEditor) {
    return (
      <a
        href={typeof href === "string" ? href : "#"}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        role="link"
        aria-disabled="true"
        tabIndex={0}
        className={`${className ?? ""} cursor-text`}
        {...editorProps(editorId)}
        {...rest}
      >
        {children}
      </a>
    );
  }

  // Internal routes -> Next Link, otherwise plain <a>
  const isInternal = typeof href === "string" && href.startsWith("/");
  return isInternal ? (
    <Link
      href={href}
      className={className}
      {...editorProps(editorId)}
      {...rest}
    >
      {children}
    </Link>
  ) : (
    <a
      href={typeof href === "string" ? href : "#"}
      className={className}
      {...editorProps(editorId)}
      {...rest}
    >
      {children}
    </a>
  );
}
