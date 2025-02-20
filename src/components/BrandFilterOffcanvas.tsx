export default function BrandFilterOffcanvas() {
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
                <p className="text-muted mb-4 fs-14">Refine your brand search with filters</p>
                <div className="row">
                    <div className="mb-4 col-md-2">
                        <h6 className="mb-3">Watching</h6>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="checkbox" id="interested" />
                            <label className="form-check-label" htmlFor="interested">
                                Interested
                            </label>
                        </div>
                    </div>
                    <div className="mb-4 col-md-10">
                        <h6 className="mb-3">Size</h6>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="size" id="all" />
                            <label className="form-check-label" htmlFor="all">All</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="size" id="small" />
                            <label className="form-check-label" htmlFor="small">Small (&lt;50 employees)</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="size" id="medium" />
                            <label className="form-check-label" htmlFor="medium">Medium (51-1k)</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="size" id="large" />
                            <label className="form-check-label" htmlFor="large">Large (1k+ employees)</label>
                        </div>
                    </div>
                </div>
                <div className="mb-4">
                    <h6 className="mb-3">Category</h6>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="checkbox" id="sales" />
                        <label className="form-check-label" htmlFor="sales">Sales</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="checkbox" id="marketing" />
                        <label className="form-check-label" htmlFor="marketing">Marketing</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="checkbox" id="crm" />
                        <label className="form-check-label" htmlFor="crm">CRM</label>
                    </div>
                </div>



                <div className="mb-4">
                    <h6 className="mb-3">Region</h6>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="checkbox" id="all-regions" />
                        <label className="form-check-label" htmlFor="all-regions">All</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="checkbox" id="us" />
                        <label className="form-check-label" htmlFor="us">US</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="checkbox" id="europe" />
                        <label className="form-check-label" htmlFor="europe">Europe</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="checkbox" id="uk" />
                        <label className="form-check-label" htmlFor="uk">UK</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="checkbox" id="latam" />
                        <label className="form-check-label" htmlFor="latam">LatAm</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="checkbox" id="asia" />
                        <label className="form-check-label" htmlFor="asia">Asia</label>
                    </div>
                </div>

                <div className="mt-auto d-flex gap-2 pt-4 border-top">
                    <button className="btn text-decoration-none">Clear all</button>
                    <button className="btn btn-primary ms-auto">Apply filters</button>
                </div>
            </div>
        </div>
    );
}
