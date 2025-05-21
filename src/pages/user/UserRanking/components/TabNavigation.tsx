import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Flame } from 'lucide-react';
import React from 'react';
import { useTranslation } from 'react-i18next';

interface TabNavigationProps {
  activeTab: string;
}

export const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab }) => {
  const { t } = useTranslation();
  
  return (
    <div className="flex justify-center mb-12">
      <TabsList className="grid grid-cols-2 w-full h-14 bg-white border border-gray-200">
        <TabsTrigger 
          value="streak" 
          className="flex items-center justify-center gap-2 py-3"
        >
          <Flame className={`w-5 h-5 ${activeTab === 'streak' ? 'text-red-500' : ''}`} />
          <span>{t('userRanking.streak')}</span>
        </TabsTrigger>
        <TabsTrigger 
          value="cards" 
          className="flex items-center justify-center gap-2 py-3"
        >
          <BookOpen className={`w-5 h-5 ${activeTab === 'cards' ? 'text-blue-500' : ''}`} />
          <span>{t('userRanking.cards')}</span>
        </TabsTrigger>
      </TabsList>
    </div>
  );
};