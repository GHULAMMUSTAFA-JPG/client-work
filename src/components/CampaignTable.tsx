import { deleteCampaign } from "@/@api"
import { Icon } from "@iconify/react/dist/iconify.js"

const CampaignTable = (props:any) =>{
    const {campaignList, setCampaigns,setSelectedCampaign, rendControl, setRendControl,setSelectedCampaignDetails} = props
   
return(
    <div>
    <section className='dashboard'>
        <div className='container-fluid'>
            <div className='row my-3'>
                <div className='col-12'>
                
                    <div className='d-flex align-items-center justify-content-between mb-3'>
                        <p className='fs-18 fw-medium mb-0'>Campaigns</p>
                        <button className='btn btn-info btn-sm' data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight2" aria-controls="offcanvasRight2" onClick={()=>{
                            setSelectedCampaignDetails(null)
                        }}>Create new campaign</button>
                    </div>

                    {/* <hr /> */}
                    <div className='row'>
                        <div className='col-12 mb-2'>
                            <div className="tab-content " id="myTabContent">
                                <div className="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabIndex={0}>
                                    <div className='card listing-card'>
                                        <div className='card-body'>
                                            <table className="table align-middle table-hover mb-0">
                                                <thead>
                                                    <tr>
                                                        <th scope="col" className="text-start ps-4">Campaign</th>
                                                        <th scope="col" className='text-center'>Creators Insights</th>
                                                        <th scope="col" className='text-center'>Budget</th>
                                                        <th scope="col" className='text-center'>Status</th>
                                                        <th scope="col" className='text-center'>Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                    campaignList?.length !== 0 ?    campaignList?.map((camp: any, index: number) => {
                                                            return (
                                                                <tr key={index} style={{ cursor: 'pointer' }}>
                                                                    <td>
                                                                        <a   onClick={() => {
                                                                            setSelectedCampaign(camp)
                                                                            setCampaigns(false)}
                                                                            } className='fw-medium text-dark fs-16'>{camp?.Headline}</a>
                                                                        <div className='d-flex align-items-center mt-1'>
                                                                            <p className='fs-12 text-warning mb-0'>{camp?.Created_At}</p>
                                                                            <div className="vr mx-2"></div>
                                                                            <p className='fs-12 text-warning mb-0'>{camp?.Time_Ago}</p>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div className='d-flex align-items-center justify-content-center'>
                                                                            <div>
                                                                                <p className='mb-0'>{camp?.Creator_Insights?.Activated}</p>
                                                                                <p className='fs-12 text-warning mb-0'>Active</p>
                                                                            </div>
                                                                            <div className='ms-5'>
                                                                                <p className='mb-0'>{camp?.Creator_Insights?.In_Discussion}</p>
                                                                                <p className='fs-12 text-warning mb-0'>In Discussion</p>
                                                                            </div>
                                                                            <div className='ms-5'>
                                                                                <p className='mb-0'>{camp?.Creator_Insights?.Contacted}</p>
                                                                                <p className='fs-12 text-warning mb-0'>Contacted</p>
                                                                            </div>
                                                                            <div className='ms-5'>
                                                                                <p className='mb-0'>{camp?.Creator_Insights?.To_Contact}</p>
                                                                                <p className='fs-12 text-warning mb-0'>To Contact</p>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                    <td className='text-center'>
                                                                        <p className='mb-0'>${camp?.Budget}</p>
                                                                    </td>
                                                                    <td className='text-center'>
                                                                        <button className='bg-primary-subtle border-0 btn btn-outline-primary btn-sm px-3 rounded-pill'>{camp?.Is_Public ? "Public" : "Private"}</button>
                                                                    </td>
                                                                    <td className='text-center' >
                                                                     
                                                                    <Icon  onClick={  ()=>{setSelectedCampaign(camp)}} data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight2" aria-controls="offcanvasRight2" icon="solar:pen-2-outline" width={22} height={22} className='cursor' />
                                                                    <Icon  icon="material-symbols:delete-outline-rounded" width={22} height={22} className='cursor ms-2' onClick={()=>{
                                                                        deleteCampaign(camp?._id, rendControl, setRendControl)
                                                                    }}/>
                                                                        
                                                                    </td>
                                                                </tr>
                                                            )
                                                        })
                                                        :
                                                        <>No campaign Found</>
                                                    }

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
)
}

export default CampaignTable