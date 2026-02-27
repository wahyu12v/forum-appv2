import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveCategory } from '../../store/slices/threadsSlice';
import './CategoryFilter.css';

function CategoryFilter({ categories }) {
  const dispatch = useDispatch();
  const { activeCategory } = useSelector((state) => state.threads);

  const handleSelect = (cat) => {
    const next = activeCategory === cat ? '' : cat;
    dispatch(setActiveCategory(next));
  };

  return (
    <div className="category-filter">
      <span className="category-filter__label">Filter:</span>
      {categories.map((cat) => (
        <button
          key={cat}
          type="button"
          className={`category-filter__btn ${activeCategory === cat ? 'category-filter__btn--active' : ''}`}
          onClick={() => handleSelect(cat)}
        >
          #
          {cat}
        </button>
      ))}
    </div>
  );
}

CategoryFilter.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default CategoryFilter;
