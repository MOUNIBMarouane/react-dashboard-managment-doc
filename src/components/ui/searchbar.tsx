
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from './select';
import { Input } from './input';
import { useSettings } from '@/context/SettingsContext';
import { translations } from '@/translations';

export interface SearchField {
  id: string;
  label: string;
}

interface SearchBarProps {
  onSearch: (value: string, field?: string) => void;
  placeholder?: string;
  className?: string;
  fields?: SearchField[];
  defaultField?: string;
}

export function SearchBar({ 
  onSearch, 
  placeholder, 
  className = '', 
  fields = [],
  defaultField = ''
}: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchField, setSearchField] = useState(defaultField);
  const { language } = useSettings();
  const t = translations[language].common;

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value, searchField);
  };

  const handleFieldChange = (value: string) => {
    setSearchField(value);
    onSearch(searchTerm, value);
  };

  return (
    <div className={`relative flex items-center gap-2 ${className}`}>
      <div className="relative flex-grow">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
          <Search className="h-4 w-4" />
        </div>
        <Input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          className="pl-9 h-9 w-full rounded-md border border-input bg-transparent shadow-sm"
          placeholder={placeholder || t.search}
        />
      </div>
      
      {fields.length > 0 && (
        <div className="min-w-[140px]">
          <Select value={searchField} onValueChange={handleFieldChange}>
            <SelectTrigger className="h-9">
              <SelectValue placeholder={t.searchBy} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">
                {t.all}
              </SelectItem>
              {fields.map((field) => (
                <SelectItem key={field.id} value={field.id}>
                  {field.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );
}
