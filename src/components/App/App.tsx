import React from 'react';
import SearchInput from '../SearchInput';

export default function App() {
  const handleSelectItem = (item: string) => {
    alert('Selected: ' + item);
  };
  return <SearchInput onSelectItem={handleSelectItem} />;
}
