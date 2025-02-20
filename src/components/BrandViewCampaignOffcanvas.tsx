export default function BrandViewCampaignOffcanvas() {
    interface Campaign {
        title: string;
        description: string;
        budgetRange: string;
        duration: string;
        requirements: string[];
    }

    interface Brand {
        id: number;
        name: string;
        description: string;
        categories: string[];
        size: string;
        campaigns: Campaign[];
    }
    // Static brands data
    const brands: Brand[] = [
        {
            id: 1,
            name: "Fathom",
            description: "Fathom records, transcribes, highlights, and summarizes your meetings so you can focus on the conversation.",
            categories: ["Sales Acceleration", "Conversation Intelligence"],
            size: "Small",
            campaigns: [
                {
                    title: "Early Access Program",
                    description: "Join our early access program and get exclusive benefits",
                    budgetRange: "$5,000 - $10,000",
                    duration: "3 months",
                    requirements: [
                        "Minimum 5,000 followers",
                        "Experience with SaaS products",
                        "Active content creation"
                    ]
                },
                {
                    title: "Product Review Campaign",
                    description: "Create in-depth review content about our platform",
                    budgetRange: "$2,000 - $4,000",
                    duration: "1 month",
                    requirements: [
                        "Tech-focused audience",
                        "Previous review experience",
                        "Video content capabilities"
                    ]
                }
            ]
        },
        {
            id: 2,
            name: "BookYourData",
            description: "BookYourData is an email lead list builder for accurate business-to-business (B2B) email lists.",
            categories: ["Sales", "Sales Intelligence"],
            size: "Small",
            campaigns: []
        },
        {
            id: 3,
            name: "AVADA",
            description: "AVADA is The Top Rated Marketing Automation Platform specialized for Shopify, Magento, WooCommerce, SMBs",
            categories: ["Marketing", "Marketing Automation"],
            size: "Small",
            campaigns: []
        },
        // Add more brands as needed
    ];
    return (
        < div
            className="offcanvas offcanvas-end"
            tabIndex={- 1
            }
            id="campaignsOffcanvas"
        >
            <div className="offcanvas-header border-bottom">
                <div>
                    <h5 className="offcanvas-title">Fathom Campaigns</h5>
                    <p className="text-muted fs-12 mb-0">Available collaboration opportunities</p>
                </div>
                <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="offcanvas"
                ></button>
            </div>
            <div className="offcanvas-body">
                {brands[0].campaigns.map((campaign, index) => (
                    <div className="card mb-4">
                        <div key={index} className="pb-4 border-bottom card-body">
                            <h5 className="mb-2">{campaign.title}</h5>
                            <p className="text-gray fs-14 mb-4">{campaign.description}</p>

                            <div className="row mb-4">
                                <div className="col-6">
                                    <div className="mb-2 text-muted fs-12">Budget Range</div>
                                    <div className="text-gray">{campaign.budgetRange}</div>
                                </div>
                                <div className="col-6">
                                    <div className="mb-2 text-muted fs-12">Duration</div>
                                    <div className="text-gray">{campaign.duration}</div>
                                </div>
                            </div>

                            <div className="mb-4">
                                <div className="mb-2 text-muted fs-12">Requirements</div>
                                <ul className="list-unstyled text-gray">
                                    {campaign.requirements.map((req, idx) => (
                                        <li key={idx} className="mb-2">• {req}</li>
                                    ))}
                                </ul>
                            </div>

                            <button className="btn btn-primary w-100">Apply for Campaign</button>
                        </div>
                    </div>
                ))}
            </div>
        </div >
    );
}
