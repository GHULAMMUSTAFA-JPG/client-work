import { deleteCampaign } from "@/@api";
import { Icon } from "@iconify/react/dist/iconify.js";

const CampaignTable = (props: any) => {
  const {
    campaignList,
    setCampaigns,
    setSelectedCampaign,
    rendControl,
    setRendControl,
    setSelectedCampaignDetails,
  } = props;

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
                  onClick={() => {
                    setSelectedCampaignDetails(null);
                  }}
                >
                  {" "}
                  <Icon
                    icon="ci:add-plus"
                    width="18"
                    height="18"
                    className="text-white "
                  />{" "}
                  Create New Campaign
                </button>
              </div>

              {/* <hr /> */}
              <div className="row">
                <div className="col-12 mb-2">
                  <div className="tab-content " id="myTabContent">
                    <div
                      className="tab-pane fade show active"
                      id="home-tab-pane"
                      role="tabpanel"
                      aria-labelledby="home-tab"
                      tabIndex={0}
                    >
                      <div className="card listing-card">
                        <div className="card-body">
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
                              {campaignList?.length !== 0 ? (
                                campaignList?.map(
                                  (camp: any, index: number) => {
                                    return (
                                      <tr
                                        key={index}
                                        style={{ cursor: "pointer" }}
                                      >
                                        <td>
                                          <a
                                            onClick={() => {
                                              setSelectedCampaign(camp);
                                              setCampaigns(false);
                                            }}
                                            className="fw-medium text-dark fs-16"
                                          >
                                            {camp?.Headline}
                                          </a>
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
                                          <div className="d-flex align-items-center justify-content-center">
                                            <div>
                                              <p className="mb-0">
                                                {
                                                  camp?.Creator_Insights
                                                    ?.Approved
                                                }
                                              </p>
                                              <p className="fs-12 text-warning mb-0">
                                                Approved
                                              </p>
                                            </div>
                                            <div className="ms-5">
                                              <p className="mb-0">
                                                {
                                                  camp?.Creator_Insights
                                                    ?.Applied
                                                }
                                              </p>
                                              <p className="fs-12 text-warning mb-0">
                                                Applied
                                              </p>
                                            </div>
                                            <div className="ms-5">
                                              <p className="mb-0">
                                                {
                                                  camp?.Creator_Insights
                                                    ?.Invited
                                                }
                                              </p>
                                              <p className="fs-12 text-warning mb-0">
                                                Invited
                                              </p>
                                            </div>
                                            <div className="ms-5">
                                              <p className="mb-0">
                                                {
                                                  camp?.Creator_Insights
                                                    ?.In_Discussion
                                                }
                                              </p>
                                              <p className="fs-12 text-warning mb-0">
                                                In Discussion
                                              </p>
                                            </div>
                                          </div>
                                        </td>
                                        <td className="text-center">
                                          <p className="mb-0">
                                            ${camp?.Budget}
                                          </p>
                                        </td>
                                        <td className="text-center">
                                          <span
                                            className={`${
                                              camp?.Is_Public
                                                ? "bg-primary-subtle text-primary"
                                                : "bg-danger-subtle text-danger"
                                            } border-0 btn btn-sm px-3 rounded-pill`}
                                          >
                                            {camp?.Is_Public
                                              ? "Public"
                                              : "Private"}
                                          </span>
                                        </td>
                                        <td className="text-center">
                                          <Icon
                                            onClick={() => {
                                              setSelectedCampaign(camp);
                                            }}
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
                                        </td>
                                      </tr>
                                    );
                                  }
                                )
                              ) : (
                                <>No campaign Found</>
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
