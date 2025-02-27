import { deleteCampaign } from "@/@api";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";

interface CampaignTableProps {
  campaignList: any[];
  setSelectedCampaign: (id: string | null) => void;
  rendControl: boolean;
  setRendControl: (value: boolean) => void;
}

const CampaignTable = ({
  campaignList,
  setSelectedCampaign,
  rendControl,
  setRendControl,
}: CampaignTableProps) => {
  return (
    <div>
      <section className="dashboard">
        <div className="container-fluid">
          <div className="row my-3">
            <div className="col-12">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <p className="fs-18 fw-medium mb-0">Campaigns</p>
                <button
                  className="btn btn-info btn-sm"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#offcanvasRight2"
                  aria-controls="offcanvasRight2"
                  onClick={() => setSelectedCampaign(null)}
                >
                  <Icon
                    icon="ci:add-plus"
                    width="18"
                    height="18"
                    className="text-white"
                  />{" "}
                  Create New Campaign
                </button>
              </div>

              <div className="row">
                <div className="col-12 mb-2">
                  <div className="tab-content" id="myTabContent">
                    <div
                      className="tab-pane fade show active"
                      id="home-tab-pane"
                      role="tabpanel"
                      aria-labelledby="home-tab"
                      tabIndex={0}
                    >
                      <div className="card listing-card">
                        <div className="card-body table-responsive">
                          <table className="table align-middle table-hover mb-0">
                            <thead>
                              <tr>
                                <th scope="col" className="text-start ps-4">
                                  Campaign
                                </th>
                                <th scope="col" className="text-center">
                                  Creators Insights
                                </th>
                                <th scope="col" className="text-center">
                                  Budget
                                </th>
                                <th scope="col" className="text-center">
                                  Status
                                </th>
                                <th scope="col" className="text-center">
                                  Actions
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {campaignList?.length > 0 ? (
                                campaignList.map((camp, index) => (
                                  <tr key={index}>
                                    <td>
                                      <Link
                                        href={`campaign-details/${camp._id}`}
                                        className="fw-medium text-dark fs-16"
                                        style={{ cursor: "pointer" }}
                                      >
                                        {camp?.Headline}
                                      </Link>
                                      <div className="d-flex align-items-center mt-1">
                                        <p className="fs-12 text-warning mb-0">
                                          {camp?.Created_At}
                                        </p>
                                        <div className="vr mx-2"></div>
                                        <p className="fs-12 text-warning mb-0">
                                          {camp?.Time_Ago}
                                        </p>
                                      </div>
                                    </td>
                                    <td>
                                      <div className="d-flex align-items-center justify-content-center gap-3 text-center">
                                        <div>
                                          <p className="mb-0">
                                            {camp?.Creator_Insights?.Approved}
                                          </p>
                                          <p className="fs-12 text-warning mb-0">
                                            Approved
                                          </p>
                                        </div>
                                        <div>
                                          <p className="mb-0">
                                            {camp?.Creator_Insights?.Applied}
                                          </p>
                                          <p className="fs-12 text-warning mb-0">
                                            Applied
                                          </p>
                                        </div>
                                        <div>
                                          <p className="mb-0">
                                            {camp?.Creator_Insights?.Invited}
                                          </p>
                                          <p className="fs-12 text-warning mb-0">
                                            Invited
                                          </p>
                                        </div>
                                        <div>
                                          <p className="mb-0">
                                            {
                                              camp?.Creator_Insights
                                                ?.In_Discussion
                                            }
                                          </p>
                                          <p className="fs-12 text-warning mb-0 w-s">
                                            In Discussion
                                          </p>
                                        </div>
                                      </div>
                                    </td>
                                    <td className="text-center">
                                      <p className="mb-0">${camp?.Budget}</p>
                                    </td>
                                    <td className="text-center">
                                      <span
                                        className={`${
                                          camp?.Is_Public
                                            ? "bg-primary-subtle text-primary"
                                            : "bg-danger-subtle text-danger"
                                        } border-0 pt-2 pb-2 btn-sm px-3 rounded-pill`}
                                      >
                                        {camp?.Is_Public ? "Public" : "Private"}
                                      </span>
                                    </td>
                                    <td className="text-center w-s">
                                      <div className="d-flex align-items-center justify-content-center gap-3 text-center">
                                        <Icon
                                          onClick={() =>
                                            setSelectedCampaign(camp._id)
                                          }
                                          data-bs-toggle="offcanvas"
                                          data-bs-target="#offcanvasRight2"
                                          aria-controls="offcanvasRight2"
                                          icon="mage:edit"
                                          width={24}
                                          height={24}
                                          className="cursor text-warning"
                                        />
                                        <Icon
                                          icon="fluent:delete-28-regular"
                                          width={24}
                                          height={24}
                                          className="cursor ms-3 text-warning"
                                          onClick={() => {
                                            deleteCampaign(
                                              camp?._id,
                                              rendControl,
                                              setRendControl
                                            );
                                          }}
                                        />
                                      </div>
                                    </td>
                                  </tr>
                                ))
                              ) : (
                                <tr>
                                  <td colSpan={5}>
                                    <div className="no-records">
                                      No campaign Found
                                    </div>
                                  </td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CampaignTable;
