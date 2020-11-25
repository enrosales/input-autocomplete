import React, { useState, useEffect, useRef } from 'react';
//CSS
import './search.css';
//hooks
import { useSearchItems } from '../../hooks/useFetch';
//Types
type Props = {
  onSelectItem: (item: string) => void;
};

export default function SearchInput(props: Props) {
  const { onSelectItem } = props;
  const [search, setSearch] = useState('');
  const { isLoading, data, execute, error } = useSearchItems();
  const inputRef = useRef<HTMLInputElement | null>(null);
  //Effects
  useEffect(() => {
    try {
      //debounce
      setTimeout(() => {
        if (
          search === inputRef.current?.value &&
          document.activeElement === inputRef.current //if input element has focus
        ) {
          //HTTP fetch
          execute(search);
        }
      }, 500);
    } catch (error) {
      console.error(error);
    }
  }, [execute, search]);

  const handleOnChange = (ev: React.ChangeEvent<{ value: unknown }>) => {
    ev.persist();
    const value = ev.target.value as string;
    setSearch(value);
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    onSelectItem(e.currentTarget.text);
  };

  return (
    <>
      {error && <p>Error: {error}</p>}
      <div className='wrapper'>
        <div className={isLoading ? 'is-loading' : 'control'}>
          <input
            type='text'
            className='input'
            placeholder='Enter a query...'
            ref={inputRef}
            onChange={handleOnChange}
          />
        </div>
        {data && data.length > 0 && (
          <div className='list'>
            {data.map(item => (
              <React.Fragment key={item.id}>
                <a
                  href={`/${item.id}`}
                  className='list-item'
                  onClick={(
                    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
                  ) => handleClick(e)}
                >
                  {item.text}
                </a>
              </React.Fragment>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
