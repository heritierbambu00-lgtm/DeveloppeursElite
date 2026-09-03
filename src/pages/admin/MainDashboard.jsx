import React from 'react';
import { useOutletContext } from 'react-router-dom';
import CEODashboard from './CEODashboard';
import CTODashboard from './CTODashboard';
import COODashboard from './COODashboard';
import MemberDashboard from './MemberDashboard';

const MainDashboard = () => {
  const { profile } = useOutletContext();

  if (!profile) return (
    <div className="flex items-center justify-center py-20 text-white/20">
      <i className="fa-solid fa-circle-notch fa-spin text-3xl"></i>
    </div>
  );

  // Router logic based on role
  if (profile.user_role === 'CEO') {
    return <CEODashboard profile={profile} />;
  }

  if (profile.user_role === 'COO') {
    return <COODashboard profile={profile} />;
  }

  if (profile.user_role === 'member') {
    return <MemberDashboard profile={profile} />;
  }

  // Default to CTO/Admin view
  return <CTODashboard profile={profile} />;
};

export default MainDashboard;
