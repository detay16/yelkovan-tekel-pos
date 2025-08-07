import React from 'react';
import { Bell, Globe } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';

const Header: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const { user } = useAuth();

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">
            Hoş Geldiniz
          </h2>
          <p className="text-gray-600">
            Bugün, {new Date().toLocaleDateString('tr-TR', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="p-2 text-gray-400 hover:text-gray-600 relative">
            <Bell className="h-6 w-6" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              3
            </span>
          </button>
          
          <button
            onClick={() => setLanguage(language === 'tr' ? 'en' : 'tr')}
            className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-gray-900 rounded-md hover:bg-gray-100"
          >
            <Globe className="h-5 w-5" />
            <span className="text-sm font-medium">{language.toUpperCase()}</span>
          </button>
          
          <div className="flex items-center space-x-3">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">
                {user?.email || 'Admin User'}
              </p>
              <p className="text-xs text-gray-500">Yönetici</p>
            </div>
            <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">A</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
