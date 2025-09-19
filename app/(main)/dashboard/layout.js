
import React from 'react';

export const metadata = {
  title: "Prana - Student dashboard",
  description: "counsellor",
};

const DashboardLayout = ({children}) => {
  return (
      <div className="container mx-auto my-20">{children}</div>
  )
}

export default DashboardLayout;
