import { PageType } from '@/dataHelper/study.dataHelper';
import { useGrammarByLevel } from '@/hooks/useGrammar';
import { useVocabularyByLevel } from '@/hooks/useVocabulary';
import { useEffect, useMemo, useState } from 'react';
import WelcomeBackCard from '../Learn/components/WelcomeBackCard';
import GrammarHeader from './components/GrammarHeader';
import { LearningResourcesContent } from './components/LearningResourcesContent';
import { LearningResourcesSidebar } from './components/LearningResourcesSidebar';

const LearningResources: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageType>('vocabulary');
  const [selectedLevel, setSelectedLevel] = useState('N3');
  const [selectedChapter, setSelectedChapter] = useState('');
  const [selectedSection, setSelectedSection] = useState('');

  const { data: grammarData, isLoading: isLoadingGrammar, error: grammarError } = useGrammarByLevel(selectedLevel);
  const { data: vocabularyData, isLoading: isLoadingVocabulary, error: vocabularyError } = useVocabularyByLevel(selectedLevel);

  const grammarItems = grammarData?.data || [];
  const vocabularyItems = vocabularyData?.data || [];
  
  useEffect(() => {
    setSelectedChapter('all');
    setSelectedSection('all');
  }, [currentPage]);

  const chapters = useMemo(() => {
    const chapterSet = new Set(vocabularyItems.map(item => item.chapter));
    return Array.from(chapterSet).sort();
  }, [vocabularyItems]);
  
  const sections = useMemo(() => {
    const sectionSet = new Set(
      vocabularyItems
        .filter(item => !selectedChapter || item.chapter === selectedChapter)
        .map(item => item.section)
    );
    return Array.from(sectionSet).sort();
  }, [vocabularyItems, selectedChapter]);

  const filteredGrammar = useMemo(() => {
    return grammarItems;
  }, [grammarItems]);

  const filteredVocabulary = useMemo(() => {
    return vocabularyItems.filter(item => {
      const matchesChapter = selectedChapter === 'all' || item.chapter === selectedChapter;
      const matchesSection = selectedSection === 'all' || item.section === selectedSection;
      return matchesChapter && matchesSection;
    });
  }, [vocabularyItems, selectedChapter, selectedSection]);

  const handleChapterChange = (chapter: string) => {
    setSelectedChapter(chapter);
    setSelectedSection('all');
  };

  const isLoading = isLoadingGrammar || isLoadingVocabulary;
  const hasError = Boolean(grammarError || vocabularyError);

  return (
    <div className="min-h-screen xl:py-8 pt-4 pb-20 xl:px-2 px-4 bg-white">
      <div className="xl:px-5 px-0 grid grid-cols-1 xl:grid-cols-12 gap-8">
        <div className="xl:col-span-4 order-1 xl:order-2 pb-10 flex flex-col gap-4">
          <LearningResourcesSidebar
            currentPage={currentPage}
            selectedLevel={selectedLevel}
            selectedChapter={selectedChapter}
            selectedSection={selectedSection}
            chapters={chapters}
            sections={sections}
            isLoading={isLoading}
            hasError={hasError}
            grammarCount={filteredGrammar.length}
            vocabularyCount={filteredVocabulary.length}
            onPageChange={setCurrentPage}
            onLevelChange={setSelectedLevel}
            onChapterChange={handleChapterChange}
            onSectionChange={setSelectedSection}
          />
        </div>
        
        <div className="xl:col-span-8 order-2 xl:order-1">
          {currentPage === 'vocabulary' && <WelcomeBackCard />}
          {currentPage === 'grammar' && <GrammarHeader />}
          <LearningResourcesContent
            currentPage={currentPage}
            selectedLevel={selectedLevel}
            isLoading={isLoading}
            filteredGrammar={filteredGrammar}
            filteredVocabulary={filteredVocabulary}
          />
        </div>
      </div>
    </div>
  );
};

export default LearningResources;