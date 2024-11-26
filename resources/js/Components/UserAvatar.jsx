// Components/UserAvatar.jsx
import React from 'react';
import { Badge } from '@/Components/ui/badge';
import { CheckCircleIcon, AlertCircleIcon, ClockIcon } from 'lucide-react';

const UserAvatar = ({ 
  user, 
  size = 'md', 
  showVerificationBadge = true 
}) => {
  const getVerificationIcon = (status) => {
    const icons = {
      verified: (
        <CheckCircleIcon 
          className="absolute bottom-0 right-0 text-green-500 bg-white rounded-full" 
          size={size === 'sm' ? 16 : 24} 
        />
      ),
      in_progress: (
        <ClockIcon 
          className="absolute bottom-0 right-0 text-yellow-500 bg-white rounded-full" 
          size={size === 'sm' ? 16 : 24} 
        />
      ),
      rejected: (
        <AlertCircleIcon 
          className="absolute bottom-0 right-0 text-red-500 bg-white rounded-full" 
          size={size === 'sm' ? 16 : 24} 
        />
      )
    };

    return icons[status] || null;
  };

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  };

  return (
    <div className="relative inline-block">
      <img
        src={user.avatar_url}
        alt={`${user.full_name}'s avatar`}
        className={`
          ${sizeClasses[size]} 
          rounded-full 
          object-cover 
          border-2 
          ${user.account_status === 'verified' 
            ? 'border-green-500' 
            : user.account_status === 'in_progress' 
            ? 'border-yellow-500' 
            : 'border-gray-300'
          }
        `}
      />
      {showVerificationBadge && getVerificationIcon(user.account_status)}
    </div>
  );
};

// Usage in various components
const ProfileHeader = ({ user }) => {
  return (
    <div className="flex items-center space-x-4">
      <UserAvatar user={user} size="lg" />
      <div>
        <h2 className="text-xl font-bold">{user.full_name}</h2>
        <Badge 
          variant={
            user.account_status === 'verified' ? 'success' :
            user.account_status === 'in_progress' ? 'warning' :
            'destructive'
          }
        >
          {user.account_status.replace('_', ' ')}
        </Badge>
      </div>
    </div>
  );
};

// In Dashboard or Profile
const Dashboard = () => {
  const { auth } = usePage().props;
  
  return (
    <AuthenticatedLayout>
      <div className="flex items-center">
        <UserAvatar 
          user={auth.user} 
          size="xl" 
          showVerificationBadge={true} 
        />
        <div className="ml-4">
          <h1>Verification Progress</h1>
          <VerificationProgressBar 
            progress={auth.user.verification_progress} 
          />
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

// Optional: Verification Progress Bar Component
const VerificationProgressBar = ({ progress }) => {
  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium">Profile Completion</span>
        <span className="text-sm font-medium">{progress.percentage}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className="bg-blue-600 h-2.5 rounded-full" 
          style={{ width: `${progress.percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default UserAvatar;