import React from 'react';
import classNames from 'classnames';

const PlatformSelector = ({ platforms, selectedPlatforms, onChange }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {platforms.map(platform => (
        <button
          key={platform.id}
          onClick={() => onChange(platform.id)}
          className={classNames(
            "px-3 py-1 rounded-full text-sm font-medium transition-colors",
            selectedPlatforms.includes(platform.id)
              ? `bg-${platform.color}-100 text-${platform.color}-800 border border-${platform.color}-300`
              : "bg-gray-100 text-gray-500 border border-gray-200 hover:bg-gray-200"
          )}
        >
          <div className="flex items-center space-x-1">
            <span className={classNames(
              "inline-block w-2 h-2 rounded-full",
              selectedPlatforms.includes(platform.id) ? `bg-${platform.color}-500` : "bg-gray-400"
            )}></span>
            <span>{platform.name}</span>
          </div>
        </button>
      ))}
    </div>
  );
};

export default PlatformSelector;