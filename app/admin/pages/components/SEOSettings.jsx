"use client";

import React, { useState, useEffect } from "react";
import {
  HiOutlineGlobe,
  HiOutlineSearch,
  HiOutlinePhotograph,
  HiOutlineTag,
	HiOutlineCog,
  HiOutlineLink,
  HiOutlineEye,
  HiOutlineCheckCircle,
  HiOutlineXCircle,
  HiOutlineInformationCircle,
} from "react-icons/hi";
import { HiOutlineExclamationTriangle } from "react-icons/hi2";



export default function SEOSettings({ seoData, pageTitle, onUpdate }) {
  const [seoScore, setSeoScore] = useState(0);
  const [suggestions, setSuggestions] = useState([]);

  // Auto-generate meta title from page title if empty
  useEffect(() => {
    if (!seoData.metaTitle && pageTitle) {
      onUpdate({ metaTitle: pageTitle });
    }
  }, [pageTitle, seoData.metaTitle, onUpdate]);

  // Calculate SEO score and suggestions
  useEffect(() => {
    const calculateSEO = () => {
      let score = 0;
      const newSuggestions = [];

      // Meta Title (25 points)
      if (seoData.metaTitle) {
        if (seoData.metaTitle.length >= 30 && seoData.metaTitle.length <= 60) {
          score += 25;
        } else if (seoData.metaTitle.length > 0) {
          score += 15;
          if (seoData.metaTitle.length < 30) {
            newSuggestions.push({
              type: "warning",
              message: "Meta title is too short. Aim for 30-60 characters.",
            });
          } else {
            newSuggestions.push({
              type: "warning",
              message: "Meta title is too long. Keep it under 60 characters.",
            });
          }
        }
      } else {
        newSuggestions.push({
          type: "error",
          message: "Meta title is required for good SEO.",
        });
      }

      // Meta Description (25 points)
      if (seoData.metaDescription) {
        if (seoData.metaDescription.length >= 120 && seoData.metaDescription.length <= 160) {
          score += 25;
        } else if (seoData.metaDescription.length > 0) {
          score += 15;
          if (seoData.metaDescription.length < 120) {
            newSuggestions.push({
              type: "warning",
              message: "Meta description is too short. Aim for 120-160 characters.",
            });
          } else {
            newSuggestions.push({
              type: "warning",
              message: "Meta description is too long. Keep it under 160 characters.",
            });
          }
        }
      } else {
        newSuggestions.push({
          type: "error",
          message: "Meta description is required for good SEO.",
        });
      }

      // Keywords (20 points)
      if (seoData.keywords && seoData.keywords.length > 0) {
        if (seoData.keywords.length >= 3 && seoData.keywords.length <= 10) {
          score += 20;
        } else if (seoData.keywords.length > 0) {
          score += 10;
          if (seoData.keywords.length < 3) {
            newSuggestions.push({
              type: "info",
              message: "Add more keywords (3-10 recommended) for better targeting.",
            });
          } else {
            newSuggestions.push({
              type: "warning",
              message: "Too many keywords might dilute your SEO focus.",
            });
          }
        }
      } else {
        newSuggestions.push({
          type: "warning",
          message: "Add relevant keywords to improve search visibility.",
        });
      }

      // OG Image (15 points)
      if (seoData.ogImage) {
        score += 15;
      } else {
        newSuggestions.push({
          type: "info",
          message: "Add an Open Graph image for better social media sharing.",
        });
      }

      // Canonical URL (15 points)
      if (seoData.canonical) {
        score += 15;
      } else {
        newSuggestions.push({
          type: "info",
          message: "Set a canonical URL to prevent duplicate content issues.",
        });
      }

      setSeoScore(score);
      setSuggestions(newSuggestions);
    };

    calculateSEO();
  }, [seoData]);

  const handleUpdate = (key, value) => {
    onUpdate({ [key]: value });
  };

  const addKeyword = (keyword) => {
    if (keyword.trim() && !seoData.keywords?.includes(keyword.trim())) {
      const newKeywords = [...(seoData.keywords || []), keyword.trim()];
      handleUpdate("keywords", newKeywords);
    }
  };

  const removeKeyword = (keywordToRemove) => {
    const newKeywords = seoData.keywords?.filter(k => k !== keywordToRemove) || [];
    handleUpdate("keywords", newKeywords);
  };

  const handleKeywordKeyPress = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addKeyword(e.target.value);
      e.target.value = "";
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-orange-600";
    return "text-red-600";
  };

  const getScoreLabel = (score) => {
    if (score >= 80) return "Good";
    if (score >= 60) return "Needs Improvement";
    return "Poor";
  };

  return (
    <div className="space-y-6">
      {/* SEO Score Card */}
      <div className="bg-[var(--surface)] rounded-lg border border-[var(--border)] p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-[var(--text)] flex items-center gap-2">
            <HiOutlineSearch className="w-5 h-5" />
            SEO Score
          </h3>
          <div className={`text-2xl font-bold ${getScoreColor(seoScore)}`}>
            {seoScore}/100
          </div>
        </div>
        
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-[var(--text-muted)]">Overall Score</span>
            <span className={`text-sm font-medium ${getScoreColor(seoScore)}`}>
              {getScoreLabel(seoScore)}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-300 ${
                seoScore >= 80 ? "bg-green-500" :
                seoScore >= 60 ? "bg-orange-500" : "bg-red-500"
              }`}
              style={{ width: `${seoScore}%` }}
            />
          </div>
        </div>

        {/* Suggestions */}
        {suggestions.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-[var(--text)]">Suggestions:</h4>
            {suggestions.map((suggestion, index) => (
              <div key={index} className="flex items-start gap-2 text-sm">
                {suggestion.type === "error" && (
                  <HiOutlineXCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                )}
                {suggestion.type === "warning" && (
                  <HiOutlineExclamationTriangle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                )}
                {suggestion.type === "info" && (
                  <HiOutlineInformationCircle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                )}
                <span className="text-[var(--text-muted)]">{suggestion.message}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Meta Tags */}
      <div className="bg-[var(--surface)] rounded-lg border border-[var(--border)] p-6">
        <h3 className="text-lg font-semibold text-[var(--text)] mb-4 flex items-center gap-2">
          <HiOutlineTag className="w-5 h-5" />
          Meta Tags
        </h3>
        
        <div className="space-y-4">
          {/* Meta Title */}
          <div>
            <label htmlFor="meta-title" className="block text-sm font-medium text-[var(--text)] mb-2">
              Meta Title *
            </label>
            <input
              id="meta-title"
              type="text"
              value={seoData.metaTitle || ""}
              onChange={(e) => handleUpdate("metaTitle", e.target.value)}
              placeholder="Enter meta title..."
              maxLength={60}
              className="w-full px-3 py-2 bg-[var(--bg)] border border-[var(--border)] rounded-lg text-[var(--text)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
            />
            <div className="flex justify-between items-center mt-2">
              <p className="text-xs text-[var(--text-muted)]">
                Optimal length: 30-60 characters
              </p>
              <span className={`text-xs ${
                (seoData.metaTitle?.length || 0) > 60 ? "text-red-600" : "text-[var(--text-muted)]"
              }`}>
                {seoData.metaTitle?.length || 0}/60
              </span>
            </div>
          </div>

          {/* Meta Description */}
          <div>
            <label htmlFor="meta-description" className="block text-sm font-medium text-[var(--text)] mb-2">
              Meta Description *
            </label>
            <textarea
              id="meta-description"
              value={seoData.metaDescription || ""}
              onChange={(e) => handleUpdate("metaDescription", e.target.value)}
              placeholder="Enter meta description..."
              maxLength={160}
              rows={3}
              className="w-full px-3 py-2 bg-[var(--bg)] border border-[var(--border)] rounded-lg text-[var(--text)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
            />
            <div className="flex justify-between items-center mt-2">
              <p className="text-xs text-[var(--text-muted)]">
                Optimal length: 120-160 characters
              </p>
              <span className={`text-xs ${
                (seoData.metaDescription?.length || 0) > 160 ? "text-red-600" : "text-[var(--text-muted)]"
              }`}>
                {seoData.metaDescription?.length || 0}/160
              </span>
            </div>
          </div>

          {/* Keywords */}
          <div>
            <label htmlFor="keywords-input" className="block text-sm font-medium text-[var(--text)] mb-2">
              Keywords
            </label>
            <input
              id="keywords-input"
              type="text"
              placeholder="Type keyword and press Enter or comma..."
              onKeyDown={handleKeywordKeyPress}
              className="w-full px-3 py-2 bg-[var(--bg)] border border-[var(--border)] rounded-lg text-[var(--text)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
            />
            
            {/* Keywords Display */}
            {seoData.keywords && seoData.keywords.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {seoData.keywords.map((keyword, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-[var(--primary)] text-[var(--primary-contrast)] rounded-full text-sm"
                  >
                    {keyword}
                    <button
                      onClick={() => removeKeyword(keyword)}
                      className="hover:bg-white/20 rounded-full p-0.5"
                    >
                      <HiOutlineXCircle className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
            
            <p className="text-xs text-[var(--text-muted)] mt-2">
              Press Enter or comma to add keywords. Recommended: 3-10 keywords.
            </p>
          </div>
        </div>
      </div>

      {/* Open Graph & Social */}
      <div className="bg-[var(--surface)] rounded-lg border border-[var(--border)] p-6">
        <h3 className="text-lg font-semibold text-[var(--text)] mb-4 flex items-center gap-2">
          <HiOutlineGlobe className="w-5 h-5" />
          Social Media (Open Graph)
        </h3>
        
        <div className="space-y-4">
          {/* OG Image */}
          <div>
            <label htmlFor="og-image" className="block text-sm font-medium text-[var(--text)] mb-2">
              Social Share Image (Open Graph)
            </label>
            <div className="flex items-center gap-3">
              <input
                id="og-image"
                type="url"
                value={seoData.ogImage || ""}
                onChange={(e) => handleUpdate("ogImage", e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="flex-1 px-3 py-2 bg-[var(--bg)] border border-[var(--border)] rounded-lg text-[var(--text)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
              />
              <button className="px-4 py-2 bg-[var(--primary)] text-[var(--primary-contrast)] rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2">
                <HiOutlinePhotograph className="w-4 h-4" />
                Upload
              </button>
            </div>
            <p className="text-xs text-[var(--text-muted)] mt-2">
              Recommended size: 1200×630 pixels. Will be shown when shared on social media.
            </p>
            
            {/* Image Preview */}
            {seoData.ogImage && (
              <div className="mt-3 p-3 bg-[var(--bg)] rounded-lg border border-[var(--border)]">
                <p className="text-sm font-medium text-[var(--text)] mb-2">Preview:</p>
                <img
                  src={seoData.ogImage}
                  alt="OG Image Preview"
                  className="w-full max-w-sm h-32 object-cover rounded border"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Technical SEO */}
      <div className="bg-[var(--surface)] rounded-lg border border-[var(--border)] p-6">
        <h3 className="text-lg font-semibold text-[var(--text)] mb-4 flex items-center gap-2">
          <HiOutlineCog className="w-5 h-5" />
          Technical SEO
        </h3>
        
        <div className="space-y-4">
          {/* Canonical URL */}
          <div>
            <label htmlFor="canonical-url" className="block text-sm font-medium text-[var(--text)] mb-2">
              Canonical URL
            </label>
            <input
              id="canonical-url"
              type="url"
              value={seoData.canonical || ""}
              onChange={(e) => handleUpdate("canonical", e.target.value)}
              placeholder="https://yoursite.com/page-url"
              className="w-full px-3 py-2 bg-[var(--bg)] border border-[var(--border)] rounded-lg text-[var(--text)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
            />
            <p className="text-xs text-[var(--text-muted)] mt-2">
              The preferred URL for this page. Helps prevent duplicate content issues.
            </p>
          </div>

          {/* Robots Meta */}
          <div>
            <label className="block text-sm font-medium text-[var(--text)] mb-3">
              Search Engine Instructions
            </label>
            <div className="grid grid-cols-2 gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={seoData.robotsIndex !== false}
                  onChange={(e) => handleUpdate("robotsIndex", e.target.checked)}
                  className="rounded border-[var(--border)] text-[var(--primary)] focus:ring-[var(--primary)]"
                />
                <span className="text-sm text-[var(--text)]">Allow indexing</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={seoData.robotsFollow !== false}
                  onChange={(e) => handleUpdate("robotsFollow", e.target.checked)}
                  className="rounded border-[var(--border)] text-[var(--primary)] focus:ring-[var(--primary)]"
                />
                <span className="text-sm text-[var(--text)]">Follow links</span>
              </label>
            </div>
            <p className="text-xs text-[var(--text-muted)] mt-2">
              Control how search engines crawl and index this page.
            </p>
          </div>
        </div>
      </div>

      {/* SEO Preview */}
      <div className="bg-[var(--surface)] rounded-lg border border-[var(--border)] p-6">
        <h3 className="text-lg font-semibold text-[var(--text)] mb-4 flex items-center gap-2">
          <HiOutlineEye className="w-5 h-5" />
          Search Result Preview
        </h3>
        
        <div className="bg-[var(--bg)] p-4 rounded-lg border border-[var(--border)]">
          <div className="max-w-2xl">
            <div className="text-sm text-green-700 mb-1">
              yoursite.com{seoData.canonical || "/page-url"}
            </div>
            <h4 className="text-lg text-blue-600 hover:underline cursor-pointer mb-1">
              {seoData.metaTitle || pageTitle || "Page Title"}
            </h4>
            <p className="text-sm text-gray-600 leading-relaxed">
              {seoData.metaDescription || "Meta description will appear here. This is what users see in search results."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
