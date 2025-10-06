"use client"

import { 
  HiOutlineCheckCircle, 
  HiOutlineExclamationCircle, 
  HiOutlineXCircle 
} from "react-icons/hi";

export default function SystemStatus({ services }) {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'healthy':
        return <HiOutlineCheckCircle className="w-5 h-5" style={{ color: 'var(--success)' }} />;
      case 'warning':
        return <HiOutlineExclamationCircle className="w-5 h-5" style={{ color: 'var(--warning)' }} />;
      case 'error':
        return <HiOutlineXCircle className="w-5 h-5" style={{ color: 'var(--error)' }} />;
      default:
        return <HiOutlineCheckCircle className="w-5 h-5" style={{ color: 'var(--text-muted)' }} />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'healthy':
        return 'var(--success)';
      case 'warning':
        return 'var(--warning)';
      case 'error':
        return 'var(--error)';
      default:
        return 'var(--text-muted)';
    }
  };

  return (
    <div 
      className="rounded-lg p-6 border bg-[var(--surface)]/50 border-[var(--border)] shadow-[var(--shadow-sm)]"
    >
      <h3 
        className="text-lg font-semibold mb-4"
        style={{ color: 'var(--text)' }}
      >
        System Status
      </h3>
      
      <div className="space-y-4">
        {services.map((service, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {getStatusIcon(service.status)}
              <div>
                <p 
                  className="text-sm font-medium"
                  style={{ color: 'var(--text)' }}
                >
                  {service.name}
                </p>
                <p 
                  className="text-xs"
                  style={{ color: 'var(--text-muted)' }}
                >
                  Response: {service.responseTime}
                </p>
              </div>
            </div>
            <span 
              className="text-sm font-medium capitalize"
              style={{ color: getStatusColor(service.status) }}
            >
              {service.status}
            </span>
          </div>
        ))}
      </div>
      
      <div 
        className="mt-6 pt-4 border-t"
        style={{ borderColor: 'var(--border)' }}
      >
        <div className="flex items-center justify-between text-sm">
          <span style={{ color: 'var(--text-muted)' }}>Last updated</span>
          <span style={{ color: 'var(--text)' }}>2 minutes ago</span>
        </div>
      </div>
    </div>
  );
}
