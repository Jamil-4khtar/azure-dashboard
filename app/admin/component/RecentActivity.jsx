"use client"

export default function RecentActivity({ activities }) {
  return (
    <div 
      className="rounded-lg p-6 border bg-[var(--surface)]/50 border-[var(--border)] shadow-[var(--shadow-sm)]"
     
    >
      <h3 
        className="text-lg font-semibold mb-4"
        style={{ color: 'var(--text)' }}
      >
        Recent Activity
      </h3>
      
      <div className="space-y-4">
        {activities.map((activity) => {
          const Icon = activity.icon;
          
          return (
            <div key={activity.id} className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <div 
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{
                    backgroundColor: 'var(--bg-muted)',
                    color: 'var(--primary)'
                  }}
                >
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p 
                  className="text-sm"
                  style={{ color: 'var(--text)' }}
                >
                  {activity.message}
                </p>
                <div 
                  className="flex items-center mt-1 text-xs"
                  style={{ color: 'var(--text-muted)' }}
                >
                  <span>{activity.user}</span>
                  <span className="mx-1">•</span>
                  <span>{activity.timestamp}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      <div 
        className="mt-6 pt-4 border-t"
        style={{ borderColor: 'var(--border)' }}
      >
        <button 
          className="text-sm transition-opacity hover:opacity-80"
          style={{ color: 'var(--primary)' }}
        >
          View all activity
        </button>
      </div>
    </div>
  );
}
