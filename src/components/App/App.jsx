import { useState, useEffect } from 'react';

import { Searchbar } from 'components/Searchbar/Searchbar';
import { makeFetch } from 'components/Api/Api';
import { Container } from './App.styled';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';

import toast, { Toaster } from 'react-hot-toast';
import { animateScroll as scroll } from 'react-scroll';

export const App = () => {
  const [query, setQuery] = useState('');
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [btn, setBtn] = useState(false);
  const [error, setError] = useState('');

  const addSubmitForm = data => {
    if (data === '') {
      return;
    }
    setQuery(data);
    setItems([]);
    setPage(page);
    setBtn(false);
  };

  const loadMore = () => {
    setPage(prevState => prevState + 1);
    scroll.scrollToBottom();
  };

  useEffect(() => {
    if (!query) {
      return;
    }
    const fetchData = async (query, page) => {
      setLoading(true);
      await makeFetch(query, page)
        .then(result => {
          const totalHits = result.totalHits;
          const picsLast = totalHits - 12 * page;
          if (result.total === 0) {
            toast.error('Not found');
          }
          setLoading(false);
          result.hits.map(item => {
            setItems(prevState => [...prevState, item]);
            return item;
          });
          if (totalHits.length > 0 && page === 1) {
            toast.info(`Found ${result.total} images for your requestё`, {
              autoClose: 1500,
            });
          }
          picsLast > 0 ? setBtn(true) : setBtn(false);
        })
        .catch(e => {
          setError(error);
          console.log(e);
        })
        .finally(() => {
          setLoading(false);
        });
    };
    fetchData(query, page);
  }, [query, page, error]);

  return (
    <Container>
      <Searchbar onSubmit={addSubmitForm} />
      <ImageGallery items={items} />
      {loading && <Loader />}
      {btn && <Button click={loadMore} />}
      <Toaster position="top-center" reverseOrder={false} />
    </Container>
  );
};
