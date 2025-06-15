import React from 'react';

const SettingsSection = ({ title, children }) => (
  <section 
    className="w-full bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden"
    aria-label={title}  // For screen readers
  >
    <header className="border-b border-gray-100 p-4">
      <h2 className="font-semibold text-gray-700 text-lg">{title}</h2>
    </header>
    <div>
      {children}
    </div>
  </section>
);

export default SettingsSection;
