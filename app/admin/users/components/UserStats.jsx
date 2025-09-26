"use client";
export default function UserStats({ stats }) {
  const statCards = [
    {
      title: 'Total Users',
      value: stats?.totalUsers || 0,
      icon: '👥',
      color: 'blue'
    },
    {
      title: 'Active Users',
      value: stats?.activeUsers || 0,
      icon: '✅',
      color: 'green'
    },
    {
      title: 'Inactive Users',
      value: stats?.inactiveUsers || 0,
      icon: '❌',
      color: 'red'
    },
    {
      title: 'New Users (7 days)',
      value: stats?.recentUsers || 0,
      icon: '🆕',
      color: 'purple'
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
      green: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
      red: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
      purple: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300'
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {statCards.map((stat, index) => (
        <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                {stat.title}
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {stat.value}
              </p>
            </div>
            <div className={`p-3 rounded-full ${getColorClasses(stat.color)}`}>
              <span className="text-lg">{stat.icon}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
