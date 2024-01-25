import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import './style.scss';
import { SearchLink } from '../SearchLink/SearchLink';
import { SearchParams, getSearchWith } from '../../helpers/utils/searchHelper';
import { getNumbers } from '../../helpers/utils/getNumbers';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
};

export const Pagination: React.FC<Props> = ({
  total, perPage = 16, currentPage = 1,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const buttonsArrey = getNumbers(1, Math.ceil(total / perPage));

  function setSearchWith(params: SearchParams) {
    const search = getSearchWith(searchParams, params);

    setSearchParams(search);
  }

  useEffect(() => {
    setSearchWith({ page: '1' });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [total, perPage]);

  const changePage = (page: number) => {
    if (page > buttonsArrey.length || page < 1) {
      return;
    }

    setSearchWith({ page: page.toString() });
  };

  return (
    <div className="pagination">
      <button
        type="button"
        onClick={() => changePage(currentPage - 1)}
        className="pagination__button"
        disabled={currentPage === 1}
      >
        <img
          src="./icons/chevron-left.svg"
          alt="Left arrow"
        />
      </button>

      <div className="pagination__pages">
        {buttonsArrey.map(page => (
          <SearchLink
            key={page}
            params={{ page: page.toString() }}
            className={classNames('pagination__page', {
              'pagination__page--active': currentPage === page,
            })}
          >
            {page}
          </SearchLink>
        ))}
      </div>

      <button
        type="button"
        onClick={() => changePage(currentPage + 1)}
        className="pagination__button"
        disabled={currentPage === buttonsArrey.length}
      >
        <img
          src="./icons/chevron-right.svg"
          alt="Left arrow"
        />
      </button>
    </div>
  );
};
