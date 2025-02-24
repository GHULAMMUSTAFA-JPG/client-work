export default function BrandFilterOffcanvas({
  availablefilters,
  sizes,
  regions,
  categories,
  interested,
  setSizes,
  setRegions,
  setCategories,
  setInterested,
  rerender,
  setrerender,
  setsearchquery,
  setSortOption,
  page,
  setPage,
}: any) {
  const handleInstrustedChange = (event: any) => {
    setInterested(event.target.checked);
  };

  const handleSizeChange = (event: any) => {
    const { id, checked } = event.target;
    setSizes((prev: any) =>
      checked ? [...prev, id] : prev.filter((size: any) => size !== id)
    );
  };

  const handleCategoryChange = (event: any) => {
    const { id, checked } = event.target;
    setCategories((prev: any) =>
      checked ? [...prev, id] : prev.filter((category: any) => category !== id)
    );
  };

  const handleRegionChange = (event: any) => {
    const { id, checked } = event.target;
    setRegions((prev: any) =>
      checked ? [...prev, id] : prev.filter((region: any) => region !== id)
    );
  };

  const handleClearAll = () => {
    setSizes([]);
    setRegions([]);
    setCategories([]);
    setInterested(false);
    setsearchquery("");
    if (page !== 1) {
      setPage(1);
    }
    setSortOption("most_popular");
    setrerender(!rerender);
  };
  const handleApplyFilter = () => {
    if (page !== 1) {
      setPage(1);
    }
    setrerender(!rerender);
    (
      document
        .getElementById("filtersOffcanvas")
        ?.querySelector(".btn-close") as HTMLButtonElement
    ).click();
  };

  return (
    <div
      className="offcanvas offcanvas-end w-50"
      tabIndex={-1}
      id="filtersOffcanvas"
    >
      <div className="offcanvas-header border-bottom">
        <h5 className="offcanvas-title">Filters</h5>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="offcanvas"
        ></button>
      </div>
      <div className="offcanvas-body">
        <p className="text-muted mb-4 fs-14">
          Refine your brand search with filters
        </p>
        <div className="row">
          <div className="mb-4 col-md-2">
            <h6 className="mb-3">Watching</h6>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="checkbox"
                id="interested"
                checked={interested}
                onChange={handleInstrustedChange}
              />
              <label className="form-check-label" htmlFor="interested">
                Interested
              </label>
            </div>
          </div>
          <div className="mb-4 col-md-10">
            <h6 className="mb-3">Size</h6>
            {availablefilters?.sizes.map((size: any) => (
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={size}
                  checked={sizes.includes(size)}
                  onChange={handleSizeChange}
                />
                <label className="form-check-label" htmlFor="small">
                  {size}
                </label>
              </div>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <h6 className="mb-3">Category</h6>
          {availablefilters?.categories.map((category: any) => (
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="checkbox"
                id={category}
                checked={categories.includes(category)}
                onChange={handleCategoryChange}
              />
              <label className="form-check-label" htmlFor="small">
                {category}
              </label>
            </div>
          ))}
        </div>

        <div className="mb-4">
          <h6 className="mb-3">Region</h6>

          {availablefilters?.locations.map((location: any) => (
            <div className="form-check form-check-inline" key={location}>
              <input
                className="form-check-input"
                type="checkbox"
                id={location}
                checked={regions.includes(location)}
                onChange={handleRegionChange}
              />
              <label className="form-check-label" htmlFor={location}>
                {location}
              </label>
            </div>
          ))}
        </div>

        <div className="mt-auto d-flex gap-2 pt-4 border-top">
          <button className="btn text-decoration-none" onClick={handleClearAll}>
            Clear all
          </button>
          <button
            onClick={handleApplyFilter}
            className="btn btn-primary ms-auto"
          >
            Apply filters
          </button>
        </div>
      </div>
    </div>
  );
}
