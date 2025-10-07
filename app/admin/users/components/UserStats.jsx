"use client";
import { HiOutlineUsers, HiOutlineUserGroup, HiOutlineUserAdd } from "react-icons/hi";

export default function UserStats({ stats }) {
  const statCards = [
    {
      title: 'Total Users',
      value: stats?.totalUsers || 0,
      icon: HiOutlineUsers,
      color: 'blue',
      change: stats?.totalUsersChange || 0,
    },
    {
      title: 'Active Users',
      value: stats?.activeUsers || 0,
      icon: HiOutlineUserGroup,
      color: 'green',
      change: stats?.activeUsersChange || 0,
    },
    {
      title: 'Inactive Users',
      value: stats?.inactiveUsers || 0,
      icon: HiOutlineUsers,
      color: 'red',
      change: stats?.inactiveUsersChange || 0,
    },
    {
      title: 'New Users (7 days)',
      value: stats?.recentUsers || 0,
      icon: HiOutlineUserAdd,
      color: 'purple',
      change: stats?.recentUsersChange || 0,
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: 'var(--primary)',
      green: 'var(--success)',
      red: 'var(--error)',
      purple: 'var(--warning)'
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {statCards.map((stat, index) => {
        const IconComponent = stat.icon;
        const iconColor = getColorClasses(stat.color);
        
        return (
          <div
            key={index}
            className="p-6 rounded-lg bg-[var(--surface)]/50 border transition-colors hover:shadow-md"
            style={{
              borderColor: "var(--border)",
            }}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p
                  className="text-sm font-medium mb-1"
                  style={{ color: "var(--text-muted)" }}
                >
                  {stat.title}
                </p>
                <p
                  className="text-2xl font-bold"
                  style={{ color: "var(--text)" }}
                >
                  {stat.value.toLocaleString()}
                </p>
                {stat.change !== 0 && (
                  <p
                    className={`text-xs ${
                      stat.change > 0 ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {stat.change > 0 ? '+' : ''}{stat.change} from last week
                  </p>
                )}
              </div>
              <div
                className="p-3 rounded-lg"
                style={{ backgroundColor: `${iconColor}20` }}
              >
                <IconComponent
                  className="w-6 h-6"
                  style={{ color: iconColor }}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
