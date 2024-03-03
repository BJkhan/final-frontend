import React, { useState } from 'react';

const ProductFilter = ({
  filters,
  onFilterChange,
  categories,
  uniqueColors,
  uniqueSizes,
  uniqueSleeveLengths,
  uniqueDressTypes,
  uniqueDressStyles,
  uniquePatternTypes,
  uniqueDressLengths,
  uniqueMaterials,
  // minPrice,
  // maxPrice,

}) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedSleeveLengths, setSelectedSleeveLengths] = useState([]);
  const [selectedDressTypes, setSelectedDressTypes] = useState([]);
  const [selectedDressStyles, setSelectedDressStyles] = useState([]);
  const [selectedPatternTypes, setSelectedPatternTypes] = useState([]);
  const [selectedDressLengths, setSelectedDressLengths] = useState([]);
  const [selectedMaterials, setSelectedMaterials] = useState([]);
  // const [selectedPrice, setSelectedPrice] = useState([minPrice, maxPrice]);
 
  const handleCategoryChange = (category) => {
    const updatedCategories = [...selectedCategories];
    if (updatedCategories.includes(category)) {
      updatedCategories.splice(updatedCategories.indexOf(category), 1);
    } else {
      updatedCategories.push(category);
    }
    setSelectedCategories(updatedCategories);
    onFilterChange("category", updatedCategories);
  };
  const handleColorChange = (color) => {
    const updatedColors = [...selectedColors];

    if (updatedColors.includes(color)) {
      // Color is already selected, so remove it
      updatedColors.splice(updatedColors.indexOf(color), 1);
    } else {
      // Color is not selected, so add it
      updatedColors.push(color);
    }

    setSelectedColors(updatedColors);
    onFilterChange("color", updatedColors);
  };
  const handleSizeChange = (size) => {
    const updatedSizes = [...selectedSizes];

    if (updatedSizes.includes(size)) {
      // Size is already selected, so remove it
      updatedSizes.splice(updatedSizes.indexOf(size), 1);
    } else {
      // Size is not selected, so add it
      updatedSizes.push(size);
    }

    setSelectedSizes(updatedSizes);
    onFilterChange("dressSize", updatedSizes);
  };
  const handleSleeveLengthChange = (sleeveLength) => {
    const updatedSleeveLengths = [...selectedSleeveLengths];

    if (updatedSleeveLengths.includes(sleeveLength)) {
      // Sleeve length is already selected, so remove it
      updatedSleeveLengths.splice(
        updatedSleeveLengths.indexOf(sleeveLength),
        1
      );
    } else {
      // Sleeve length is not selected, so add it
      updatedSleeveLengths.push(sleeveLength);
    }

    setSelectedSleeveLengths(updatedSleeveLengths);
    onFilterChange("sleeveLength", updatedSleeveLengths);
  };
  const handleOnSaleChange = () => {
    const updatedOnSale = !filters.onSale;
    onFilterChange("onSale", updatedOnSale);
  };
  const handleDressStyleChange = (dressStyle) => {
    const updatedDressStyles = [...selectedDressStyles];

    if (updatedDressStyles.includes(dressStyle)) {
      updatedDressStyles.splice(updatedDressStyles.indexOf(dressStyle), 1);
    } else {
      updatedDressStyles.push(dressStyle);
    }

    setSelectedDressStyles(updatedDressStyles);
    onFilterChange('dressStyle', updatedDressStyles);
  };
  const handlePatternTypeChange = (patternType) => {
    const updatedPatternTypes = [...selectedPatternTypes];
  
    if (updatedPatternTypes.includes(patternType)) {
      // PatternType is already selected, so remove it
      updatedPatternTypes.splice(updatedPatternTypes.indexOf(patternType), 1);
    } else {
      // PatternType is not selected, so add it
      updatedPatternTypes.push(patternType);
    }
  
    setSelectedPatternTypes(updatedPatternTypes);
    onFilterChange('patternType', updatedPatternTypes);
  };
  const handleDressLengthChange = (dressLength) => {
    const updatedDressLengths = [...selectedDressLengths];

    if (updatedDressLengths.includes(dressLength)) {
      updatedDressLengths.splice(updatedDressLengths.indexOf(dressLength), 1);
    } else {
      updatedDressLengths.push(dressLength);
    }

    setSelectedDressLengths(updatedDressLengths);
    onFilterChange('dressLength', updatedDressLengths);
  };
  const handleMaterialChange = (material) => {
    const updatedMaterials = [...selectedMaterials];

    if (updatedMaterials.includes(material)) {
      updatedMaterials.splice(updatedMaterials.indexOf(material), 1);
    } else {
      updatedMaterials.push(material);
    }

    setSelectedMaterials(updatedMaterials);
    onFilterChange('material', updatedMaterials);
  };
  const handleDressTypeChange = (dressType) => {
    const updatedDressTypes = [...selectedDressTypes];
    if (updatedDressTypes.includes(dressType)) {
      // Dress type is already selected, so remove it
      updatedDressTypes.splice(updatedDressTypes.indexOf(dressType), 1);
    } else {
      // Dress type is not selected, so add it
      updatedDressTypes.push(dressType);
    }
    setSelectedDressTypes(updatedDressTypes);
    onFilterChange('dressType', updatedDressTypes);
  };
  // const handlePriceRangeChange = (event) => {
  //   const newValue = parseInt(event.target.value, 10);
  //   setSelectedPrice([newValue, selectedPrice[1]]);
  //   onFilterChange("priceRange", [newValue, selectedPrice[1]]);
  // };
  // const priceRangeStep = Math.round((maxPrice - minPrice) / 20); 

  return (
    <div className="product-filter">
      {/* onSale Fitler */}
      <div className="mb-3">
        <label className="form-check-label">
          <input
            type="checkbox"
            className="form-check-input mx-2"
            checked={filters.onSale}
            onChange={handleOnSaleChange}
          />
          On Sale
        </label>
      </div>
      <hr />
      
      {/* Price Range filer
      <div className="mb-3">
        <label htmlFor="priceRange" className="form-label">
          Price Range 
          <p>
          {minPrice} - {maxPrice}
          </p> 
        </label>
        <div className="text-center">
          <span className="fs-6 text-muted pe-5">
            <small>{minPrice}</small>
          </span>
          <span className="fs-6 text-muted pe-4 ps-1">
            <small>{minPrice + priceRangeStep}</small>
          </span>
          <span className="fs-6 text-muted pe-0 ps-2">
            <small>{maxPrice}</small>
          </span>
        </div>
        <input
          type="range"
          className="form-range"
          id="priceRange"
          min={minPrice}
          max={maxPrice}
          step={priceRangeStep}
          value={selectedPrice[0]} // Use the maximum value of the range
          onChange={ handlePriceRangeChange }
        />
      </div>
      <hr></hr> */}
      <div className="filter-section">
        <p>Category</p>
        <hr />
        {categories && categories.length > 0 ? (
          categories.map((category) => (
            <div className="form-check" key={category}>
              <input
                type="checkbox"
                id={category}
                className="form-check-input"
                value={category}
                checked={selectedCategories.includes(category)}
                onChange={() => handleCategoryChange(category)}
              />
              <label htmlFor={category} className="form-check-label">
                {category}
              </label>
            </div>
          ))
        ) : (
          <p>Loading..</p>
        )}
      </div>
      <hr />
      {/* Color filter */}
      <div className="filter-section">
        <p>Color</p>
        <hr />
        {uniqueColors && uniqueColors.length > 0 ? (
          uniqueColors.map((color) => (
            <div className="form-check" key={color}>
              <input
                type="checkbox"
                id={color}
                className="form-check-input"
                value={color}
                checked={selectedColors.includes(color)}
                onChange={() => handleColorChange(color)}
              />
              <label htmlFor={color} className="form-check-label">
                {color}
              </label>
            </div>
          ))
        ) : (
          <p>Loading..</p>
        )}
      </div>
      <hr />
      {/* size filter */}
      <div className="filter-section">
        <p>Size</p>
        <hr />
        {uniqueSizes && uniqueSizes.length > 0 ? (
          uniqueSizes.map((size) => (
            <div className="form-check" key={size}>
              <input
                type="checkbox"
                id={size}
                className="form-check-input"
                value={size}
                checked={selectedSizes.includes(size)}
                onChange={() => handleSizeChange(size)}
              />
              <label htmlFor={size} className="form-check-label">
                {size}
              </label>
            </div>
          ))
        ) : (
          <p>Loading..</p>
        )}
      </div>
      <hr />
      {/* Sleeve Length Filter */}
      <div className="filter-section">
        <p>Sleeve Length</p>
        <hr />
        {uniqueSleeveLengths && uniqueSleeveLengths.length > 0 ? (
          uniqueSleeveLengths.map((sleeveLength) => (
            <div className="form-check" key={sleeveLength}>
              <input
                type="checkbox"
                id={sleeveLength}
                className="form-check-input"
                value={sleeveLength}
                checked={selectedSleeveLengths.includes(sleeveLength)}
                onChange={() => handleSleeveLengthChange(sleeveLength)}
              />
              <label htmlFor={sleeveLength} className="form-check-label">
                {sleeveLength}
              </label>
            </div>
          ))
        ) : (
          <p>Loading..</p>
        )}
      </div>
      <hr />
      {/* Dress Style Filter */}
      <div className="filter-section">
        <p>Dress Style</p>
        <hr />
        {uniqueDressStyles && uniqueDressStyles.length > 0 ? (
          uniqueDressStyles.map((dressStyle) => (
            <div className="form-check" key={dressStyle}>
              <input
                type="checkbox"
                id={dressStyle}
                className="form-check-input"
                value={dressStyle}
                checked={selectedDressStyles.includes(dressStyle)}
                onChange={() => handleDressStyleChange(dressStyle)}
              />
              <label htmlFor={dressStyle} className="form-check-label">
                {dressStyle}
              </label>
            </div>
          ))
        ) : (
          <p>Loading..</p>
        )}
      </div>
      <hr></hr>
      {/* Dress Type filter */}
      <div className="filter-section">
        <p>Dress Type</p>
        <hr />
        {uniqueDressTypes && uniqueDressTypes.length > 0 ? (
          uniqueDressTypes.map((dressType) => (
            <div className="form-check" key={dressType}>
              <input
                type="checkbox"
                id={dressType}
                className="form-check-input"
                value={dressType}
                checked={selectedDressTypes.includes(dressType)}
                onChange={() => handleDressTypeChange(dressType)}
              />
              <label htmlFor={dressType} className="form-check-label">
                {dressType}
              </label>
            </div>
          ))
        ) : (
          <p>Loading..</p>
        )}
      </div>
      <hr></hr>
      {/* PatternType filter */}
      <div className="filter-section">
        <p>Pattern Type</p>
        <hr />
        {uniquePatternTypes && uniquePatternTypes.length > 0 ? (
          uniquePatternTypes.map((patternType) => (
            <div className="form-check" key={patternType}>
              <input
                type="checkbox"
                id={patternType}
                className="form-check-input"
                value={patternType}
                checked={selectedPatternTypes.includes(patternType)}
                onChange={() => handlePatternTypeChange(patternType)}
              />
              <label htmlFor={patternType} className="form-check-label">
                {patternType}
              </label>
            </div>
          ))
        ) : (
          <p>Loading..</p>
        )}
      </div>
      <hr></hr>
      {/* Dress Length Filter */}
    <div className="filter-section">
      <p>Dress Length</p>
      <hr />
      {uniqueDressLengths && uniqueDressLengths.length > 0 ? (
        uniqueDressLengths.map((dressLength) => (
          <div className="form-check" key={dressLength}>
            <input
              type="checkbox"
              id={dressLength}
              className="form-check-input"
              value={dressLength}
              checked={selectedDressLengths.includes(dressLength)}
              onChange={() => handleDressLengthChange(dressLength)}
            />
            <label htmlFor={dressLength} className="form-check-label">
              {dressLength}
            </label>
          </div>
        ))
      ) : (
        <p>Loading..</p>
      )}
    </div>
    <hr></hr>
    {/* Material Filter */}
    <div className="filter-section">
      <p>Material</p>
      <hr />
      {uniqueMaterials && uniqueMaterials.length > 0 ? (
        uniqueMaterials.map((material) => (
          <div className="form-check" key={material}>
            <input
              type="checkbox"
              id={material}
              className="form-check-input"
              value={material}
              checked={selectedMaterials.includes(material)}
              onChange={() => handleMaterialChange(material)}
            />
            <label htmlFor={material} className="form-check-label">
              {material}
            </label>
          </div>
        ))
      ) : (
        <p>Loading..</p>
      )}
    </div>
    
      <hr></hr>
    </div>
  );
};

export default ProductFilter;