"use client"

import Link from "next/link";

export default function QuickActions({ actions }) {
  const colorClasses = {
    blue: "text-blue-600",
    green: "text-green-600",
    purple: "text-purple-600", 
    orange: "text-orange-600",
    gray: "text-gray-600"
  };

  return (
    <div 
      className="rounded-lg p-6 border bg-[var(--surface)]/50 border-[var(--border)] shadow-[var(--shadow-sm)]"
    >
      <h3 
        className="text-lg font-semibold mb-4"
        style={{ color: 'var(--text)' }}
      >
        Quick Actions
      </h3>
      <div className="space-y-3">
        {actions.map((action, index) => {
          const Icon = action.icon;
          const colorClass = colorClasses[action.color] || colorClasses.blue;
          
          return (
            <Link
              key={index}
              href={action.href}
              className="flex items-center p-3 rounded-lg border transition-all duration-200 hover:scale-[1.02]"
              style={{
                borderColor: 'var(--border)',
                '--hover-bg': 'var(--hover)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--hover)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <div 
                className={`p-2 rounded-lg border mr-3 ${colorClass}`}
                style={{
                  backgroundColor: 'var(--bg-muted)',
                  borderColor: 'var(--border)'
                }}
              >
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h4 
                  className="text-sm font-medium"
                  style={{ color: 'var(--text)' }}
                >
                  {action.title}
                </h4>
                <p 
                  className="text-sm"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {action.description}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
