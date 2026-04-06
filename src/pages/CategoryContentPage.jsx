import React, { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Search, BookOpen } from 'lucide-react';
import { getCategoryBySlug } from '../data/categoryContentData';
import { useLanguage } from '../contexts/LanguageContext.jsx';
import { translate } from '../translations/index.js';
import { openResourceByType } from '../utils/resourceOpener.js';

export const CategoryContentPage = () => {
  const { slug } = useParams();
  const { language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All');

  const category = getCategoryBySlug(slug);

  if (!category) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="heading-entrance heading-premium text-2xl font-bold text-gray-900 mb-2">{translate('categoryNotFound', language)}</h1>
          <p className="text-gray-600">{translate('categoryNotExist', language)}</p>
        </div>
      </div>
    );
  }

  const types = ['All', ...new Set(category.items.map((item) => item.type))];

  const filteredItems = useMemo(() => {
    return category.items.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = selectedType === 'All' || item.type === selectedType;
      return matchesSearch && matchesType;
    });
  }, [searchQuery, selectedType, category.items]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="bg-gradient-to-r from-teal-900 to-green-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="heading-entrance heading-premium text-4xl md:text-5xl font-bold leading-tight mb-4">{category.title}</h1>
          <p className="heading-entrance heading-entrance-delay-1 text-teal-100 text-lg">{category.description}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-md p-8">
          <div className="uiExtension-filterSection mb-8">
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder={`Search ${category.title.toLowerCase()}...`}
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  className="uiExtension-searchInput w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-sm"
                />
              </div>
            </div>

            <div className="uiExtension-categoryFilter flex flex-wrap gap-2 mb-6">
              {types.map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`uiExtension-categoryBtn px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedType === type
                      ? 'bg-teal-600 text-white shadow-md'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>

            <p className="text-gray-600">
              {translate('showing', language)} <span className="font-semibold">{filteredItems.length}</span> {filteredItems.length !== 1 ? translate('items', language) : translate('items', language)}
            </p>
          </div>

          {filteredItems.length > 0 ? (
            <div className="space-y-4">
              {filteredItems.map((item) => (
                <ContentItem key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <div className="uiExtension-emptyState text-center py-16">
              <BookOpen size={64} className="mx-auto text-gray-300 mb-4" />
              <h3 className="heading-entrance heading-entrance-card text-2xl font-semibold tracking-[-0.01em] text-gray-700 mb-2">{translate('noItemsFound', language)}</h3>
              <p className="text-gray-500">{translate('tryAdjusting', language)}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ContentItem = ({ item }) => {
  const { language } = useLanguage();
  return (
    <div className="border-l-4 border-teal-600 bg-gradient-to-r from-teal-50 to-transparent rounded-lg p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="heading-entrance heading-entrance-card text-lg font-semibold tracking-[-0.01em] text-gray-900">{item.title}</h3>
            <span className="inline-block bg-teal-100 text-teal-800 text-xs font-semibold px-3 py-1 rounded-full">
              {item.type}
            </span>
          </div>
          <p className="text-gray-600 text-sm mb-3">{item.description}</p>
          <div className="flex items-center gap-3 text-sm text-gray-500">
            <span>{translate('published', language)} {item.publishDate}</span>
            <div className="flex gap-2">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="mt-4">
            <button
              type="button"
              onClick={() => openResourceByType(item)}
              className="inline-flex items-center rounded-md bg-teal-600 px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              Open Resource
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
