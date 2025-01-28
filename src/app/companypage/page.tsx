'use client';

import { Icon } from '@iconify/react/dist/iconify.js';
import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { defaultImagePath } from '@/components/constants';
import { useEffect, useRef, useState } from 'react';
import { getCompanyPageData, handleFileUpload, updateProfileInformation } from '@/@api';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
interface editDtoProps {
    "email": string,
    "first_name": string,
    "last_name": string,
    "company_logo": string,
    "company_banner": string,
    "company_name": string,
    "company_description": string,
    "company_website": string,
    "company_linkedin": string,
    "location": string,
    "no_of_employees": number,
    "size": string,
    "categories": [
        string
    ],
    "year_founded": number
}

interface editFieldProps {
    "email": boolean,
    "name": boolean,
    "profile_url": boolean,
    "profile_image": boolean,
    "banner_image": boolean,
    "description": boolean,
    "skills": boolean,
    "current_company": boolean,
    "audience_interest": boolean,
    "collaboration_packages": boolean
}

interface cardDetailsDto {
    "package_name": string,
    "package_description": string,
    "package_price": number | null
}

interface CategoryOption {
    value: string;
    label: string;
}

export default function companypage() {
    const { user, setIsLoading, rendControl, setRendControl } = useAuth()
    const fileInputRef: any = useRef(null);
    const fileInputRef1: any = useRef(null);
    const router = useRouter()
    const [preview, setPreview] = useState<boolean>(true)
    const [editDetails, setEditDetails] = useState<editDtoProps>(
        {
            "email": "",
            "first_name": "",
            "last_name": "",
            "company_logo": "",
            "company_banner": "",
            "company_name": "",
            "company_description": "",
            "company_website": '',
            "company_linkedin": '',
            "location": '',
            "no_of_employees": 0,
            "size": '',
            "categories": [
                ''
            ],
            "year_founded": 0
        }
    )


    const [editField, setEditField] = useState<editFieldProps>({
        "email": false,
        "name": false,
        "profile_url": false,
        "profile_image": false,
        "banner_image": false,
        "description": false,
        "skills": false,
        "current_company": false,
        "audience_interest": false,
        "collaboration_packages": false
    })

    // Add new state for active section
    const [activeSection, setActiveSection] = useState<'about' | 'collaboration' | null>('about');
    const [cardDetails, setCardDetails] = useState<any[]>()
    // Add new state for sidebar visibility
    const [showSidebar, setShowSidebar] = useState(true);

    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [userProfile, setUserData] = useState<any>()
    const categoryOptions: CategoryOption[] = [
        { value: 'Sales', label: 'Sales' },
        { value: 'CRM', label: 'CRM' },
        { value: 'Conversation Intelligence', label: 'Conversation Intelligence' },
        { value: 'Customer Revenue Optimization', label: 'Customer Revenue Optimization' },
        { value: 'Sales Analytics', label: 'Sales Analytics' },
        { value: 'Sales Acceleration', label: 'Sales Acceleration' },
        { value: 'Sales Intelligence', label: 'Sales Intelligence' },
        { value: 'Marketing', label: ' Marketing' },
        { value: 'Customer Data', label: 'Customer Data' },
        { value: 'Email Marketing', label: 'Email Marketing' },
        { value: 'Marketing Analytics', label: 'Marketing Analytics' },
        { value: 'Marketing Automation', label: 'Marketing Automation' },
        { value: 'Product Analytics', label: 'Product Analytics' },
        { value: 'Consulting', label: 'Consulting' },
        { value: 'Operations Consulting', label: 'Operations Consulting' },
        { value: 'Management', label: 'Management Consulting' },
        { value: 'Project Management', label: 'Project Management Consulting' },
        { value: 'Customer Service', label: 'Customer Service Consulting' },
        { value: 'Customer Success', label: 'Customer Success Consulting' },
        { value: 'Customer Service Automation', label: 'Customer Service Automation' },
        { value: 'Experience Management', label: 'Experience Management' }
    ];

    const handleClick = () => {
        fileInputRef && fileInputRef.current.click();
    };

    const handleClick1 = () => {
        fileInputRef1 && fileInputRef1.current.click();
    };

    useEffect(() => {
        let collabPack: any = []
        userProfile?.Collaboration_Packages?.map((element: any) => {
            const entry = {
                "package_name": element?.Package_Name,
                "package_description": element?.Package_Description,
                "package_price": element?.Package_Price
            }
            collabPack?.push(entry)
        })
        userProfile?._id && setEditDetails({
            "email": user?.email,
            "first_name": "",
            "last_name": "",
            "company_logo": userProfile?.Company_Logo,
            "company_banner": userProfile?.Company_Banner !== "" ? userProfile?.Company_Banner : defaultImagePath,
            "company_name": userProfile?.Company_Name,
            "company_description": userProfile?.Company_Description,
            "company_website": userProfile?.Company_Website,
            "company_linkedin": userProfile?.Company_Linkedin,
            "location": userProfile?.Location,
            "no_of_employees": userProfile?.No_of_Employees && userProfile?.No_of_Employees !== "" ? userProfile?.No_of_Employees : 0,
            "size": userProfile?.Size && userProfile?.Size !== "" ? userProfile?.Size : 0,
            "categories": userProfile?.Categories,
            "year_founded": userProfile?.Year_Founded
        })

    }, [userProfile])

    const changeHandler = async (e: any) => {
        setEditDetails((prev: any) => {
            return { ...prev, [e.target.id]: e.target.value }
        })
    }

    const editFieldHandler = async (e: any) => {
        setEditField((prev: any) => {
            return { ...prev, [e.target.id]: true }
        })
    }

    const updateProfile = async () => {
        updateProfileInformation(editDetails, setIsLoading, rendControl, setRendControl)
    }

    // Add click handlers for the profile containers
    const handleSectionClick = (section: 'about' | 'collaboration') => {
        setActiveSection(section);
        setShowSidebar(true);
    };

    // Add handler for cancel button
    const handleCancel = () => {
        setShowSidebar(false);
    };

    const submitHandler = async () => {
        setIsLoading(true)
        try {
            const response = await axios.put("https://synncapi.onrender.com/dashboard/creators/update_creator", editDetails)
            toast.success('Profile updated successfully')
            setRendControl(!rendControl)
        } catch (error) {
            toast.warn('Error while updating the data. Please try again later')
            console.log(error, "error")
        }
        finally {
            setIsLoading(false)
        }
    }

    const fileHandler = async (e: any, id: string) => {
        const file = e.target.files
        const filePath: any = await handleFileUpload(e, setIsLoading)
        if (filePath[0]?.file_urls) {
            setEditDetails((prev: any) => {
                return { ...prev, [id]: filePath[0]?.file_urls }
            })
        }
    }

    const valueAdder = (e: any, index: number) => {

        cardDetails && (cardDetails[index][e.target.id] = e.target.value)

    }

    const mapperFunction = (array: any) => {
        let mappedArray: any = []
        array?.map((element: any, index: number) => {
            const singleObject = {
                package_name: element?.Package_Name,
                package_description: element?.Package_Description,
                package_price: element?.Package_Price
            }
            mappedArray.push(singleObject)
        })
        return mappedArray
    }



    // const submitCardDetails = async (e: any) => {
    //     setIsLoading(true)
    //     e.preventDefault();
    //     const reslt = cardDetails
    //     editDetails.collaboration_packages = reslt

    //     setTimeout(() => {
    //         submitHandler()
    //     }, 600);

    // }

    const handleCategorySelect = (value: string) => {
        setSelectedCategories(prev => {
            if (prev.includes(value)) {
                return prev.filter(category => category !== value);
            }
            if (prev.length >= 5) {
                return prev;
            }
            return [...prev, value];
        });
    };

    // Add these handler functions
    const handleRemoveCategory = (categoryToRemove: string, e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent dropdown from opening when removing items
        setSelectedCategories(prev => prev.filter(category => category !== categoryToRemove));
    };

    const handleClearAllCategories = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent dropdown from opening when clearing
        setSelectedCategories([]);
    };


    useEffect(() => {
        user?.email && getCompanyPageData(user?.email, setUserData, setIsLoading)
    }, [user])

    return (
        <div className="container">
            <div className='row mt-3'>
                <div className='col-md-8 mx-auto'>
                    {/* First profile container - Add onClick */}
                    <div className='profile-container mb-4 pb-3'
                        onClick={() => handleSectionClick('about')}
                        style={{ cursor: 'pointer' }}>
                        {/* Banner Image */}
                        <div className="position-relative">
                            <Image
                                src={userProfile?.Company_Banner !== "" ? userProfile?.Company_Banner : defaultImagePath}
                                alt="Profile Banner"
                                className="object-fit-cover rounded-3 w-100 cover-img"
                                width={1000}
                                height={1000}
                            />
                        </div>

                        {/* Profile Section */}
                        <div className="p-3">
                            {/* Profile Image */}
                            <div className="position-relative" style={{ marginTop: '-75px' }}>
                                <Image
                                    src={userProfile?.Company_Logo !== "" ? userProfile?.Company_Logo : defaultImagePath}
                                    alt="Profile Picture"
                                    width={150}
                                    height={150}
                                    className="rounded-circle border border-4 border-white"
                                />
                            </div>
                            {/* Profile Info */}
                            <div className="mt-2">
                                <div className="d-flex justify-content-between align-items-center gap-2 mb-1">
                                    <div className=''> <h5 id='name' className="mb-0">{userProfile?.Company_Name}</h5>

                                    </div>
                                    <div className='d-flex align-items-center gap-2'>
                                        <a href={userProfile?.Company_Website}><i className="bi bi-globe" style={{ width: "19px", height: "19px" }}></i></a>
                                        <a href={`https://www.linkedin.com/in/${userProfile?.Company_Name}`} target="_blank"><Icon style={{ cursor: "pointer" }} icon="mdi:linkedin" width={19} height={19} className='text-info' /></a>

                                    </div>
                                </div>

                                {/* <p className="mt-2">👋 Welcome to my partnership storefront!</p> */}

                                <div className="mt-3">
                                    <p>{userProfile?.Company_Description}</p>  </div>

                                {/* Action Buttons */}
                                <div className="mt-4 d-flex justify-content-between profile-second-section">

                                    <div className='d-flex flex-column div-size' style={{ minWidth: '200px' }}>
                                        <label><b>Location</b></label>
                                        <span className='text-muted mt-2'>{userProfile?.Location}</span>
                                    </div>
                                    <div className='d-flex flex-column' style={{ minWidth: '200px' }}>
                                        <label><b>Employees(est)</b></label>
                                        <span className='text-muted mt-2'> {userProfile?.No_of_Employees || 0}</span>
                                    </div>

                                    <div className='d-flex flex-column' style={{ minWidth: '200px' }}>
                                        <div className=''>
                                            <label className='d-block' ><b>Size</b></label>
                                            <button type="button" className="bg-info-subtle text-info border-0 btn btn-sm mt-2 rounded-pill size-btn px-2">{userProfile?.Size || "Small"}</button>
                                        </div>
                                    </div>


                                </div>

                                <div className="mt-4 d-flex justify-content-between profile-second-section">

                                    <div className='d-flex flex-wrap gap-2 justify-content-start' style={{ minWidth: '200px', maxWidth: '200px' }}>
                                        <div className=''>
                                            <label className='d-block' ><b>Categories</b></label>
                                            {
                                                userProfile?.Categories?.map((category: any, index: number) => {
                                                    <button key={index} type="button" className="activated-subtle text-activated border-0 btn btn-sm mt-2 rounded-pill size-btn px-2 mx-1">{category}</button>

                                                })
                                            }

                                        </div>
                                    </div>



                                    <div className='d-flex flex-column ms-4 ' style={{ minWidth: '200px' }}>
                                        <label><b>Year Founded</b></label>
                                        <span className='text-muted mt-2'>{userProfile?.Year_Founded}</span>
                                    </div>
                                    <div className='d-flex flex-column ms-4' style={{ minWidth: '200px' }}>

                                    </div>


                                </div>

                                {/* Stats Section */}


                            </div>
                        </div>
                    </div>

                    {/* Second profile container - Add onClick */}
                    {/* <div className='profile-container'
                        onClick={() => handleSectionClick('collaboration')}
                        style={{ cursor: 'pointer' }}>
                        <div>
                            <h5>Let's Collaborate</h5>

                            <div className="mt-4">
                                {
                                    userProfile?.Collaboration_Packages?.map((ele: any, index: number) => {
                                        return (
                                            <div className="card mb-3" key={index} onClick={async () => {
                                                const mapper = await mapperFunction(userProfile?.Collaboration_Packages)
                                                setCardDetails(mapper)
                                            }}>
                                                <div className="card-body d-flex justify-content-between align-items-center">
                                                    <div>
                                                        <h6>{ele?.Package_Name}</h6>
                                                        <p className="text-muted mb-0">
                                                            {ele?.Package_Description}
                                                        </p>
                                                    </div>
                                                    <div className='ms-5 text-end'>
                                                        <h6 className='text-muted'>${ele?.Package_Price}</h6>
                                                        <button id={ele?._id} className="btn btn-dark flex-shrink-0 btn-sm">Book Now</button>
                                                    </div>
                                                </div>
                                            </div>
                                        )

                                    })
                                }



                            </div>
                        </div>
                    </div> */}

                    <label className='d-block mb-3'>Campaigns</label>


                    {/* Second profile container - Add onClick */}
                    <div className={`profile-container ${!(userProfile?.Collaboration_Packages?.length > 0) ? '' : ''}`}
                        onClick={async () => {
                            handleSectionClick('collaboration')
                            const mapper = await mapperFunction(userProfile?.Collaboration_Packages)
                            setCardDetails(mapper)
                        }}
                        style={{ cursor: 'pointer' }}>
                        {/* Collaboration Section */}
                        <div>
                            <div className='d-flex justify-content-between mb-2'>
                                <label className='d-block mt-2'><b>Bigg</b></label>
                                <button className="bg-primary-subtle text-primary border-0 btn btn-sm mt-2 rounded-pill size-btn px-2">Public</button>
                            </div>


                            <p className='text-muted'>I'll create a LinkedIn post to educate my audience on the benefits of your company's offerings, or for anything else you're interested in promoting, like an upcoming event.</p>

                            <div className='d-flex gap-2 mb-2 align-items-center'>
                                <Icon icon="solar:eye-broken" width="18" height="18" className='text-gray flex-shrink-0' />
                                <p className='mb-0'>AI Creators, LLM Developers, Content Creators</p>

                            </div>
                            <div className='d-flex gap-2 justify-content-end'>
                                <button className="btn btn-white border flex-shrink-0 btn-sm">Manage creators</button>
                                <button className="btn btn-dark flex-shrink-0 btn-sm">Edit</button>
                                <button className="btn btn-white border flex-shrink-0 btn-sm">Detail</button>
                                <button className="btn btn-white border disabled flex-shrink-0 btn-sm">Apply</button>
                            </div>

                            {/* Collaboration Cards */}

                        </div>
                    </div>
                </div>
                <div className={`col-md-4 ${showSidebar ? '' : 'd-none'}`}>
                    <div className='profile-sidebar-wraper'>
                        {/* First edit section */}
                        <div className={`profile-container h-auto ${activeSection === 'about' ? '' : 'd-none'}`}>
                            <div className="d-flex justify-content-between mb-3 pt-2">
                                <h6 className="mb-0 ">Edit Section</h6>
                                <div>
                                    <button className="bg-white border btn btn-sm" onClick={handleCancel}>Cancel</button>
                                    <button className="btn btn-dark btn-sm ms-3" onClick={submitHandler}>Save</button>
                                </div>
                            </div>

                            <div className='pb-2 '>
                                <h6 className="mb-3">About Company</h6>

                                <div className="mb-4">
                                    <label className="mb-2">Banner image</label>
                                    <div className="position-relative">
                                        <Image
                                            src={editDetails?.company_banner !== "" ? editDetails?.company_banner : defaultImagePath}
                                            alt="Banner"
                                            width={500}
                                            height={100}
                                            className="w-100 rounded-3 mb-2"
                                            style={{ objectFit: 'cover' }}
                                        />
                                        <div className="d-flex align-items-center gap-2" onClick={handleClick} style={{ cursor: 'pointer' }}>
                                            <span className="text-muted">Choose a photo</span>
                                            <Icon icon="material-symbols:delete-outline" className="cursor-pointer" />
                                            <input type="file" ref={fileInputRef} onChange={(e: any) => {
                                                fileHandler(e, 'company_banner')
                                            }} style={{ display: 'none' }} />
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <label className="mb-2">Company Logo</label>
                                    <div className="position-relative">
                                        <Image
                                            src={editDetails.company_logo !== "" ? editDetails?.company_logo : defaultImagePath}
                                            alt="Profile"
                                            width={80}
                                            height={80}
                                            className="rounded-circle mb-2"
                                        />
                                        <div className="d-flex align-items-center gap-2" onClick={handleClick1} style={{ cursor: 'pointer' }}>
                                            <span className="text-muted">Choose a photo</span>
                                            <Icon icon="material-symbols:delete-outline" className="cursor-pointer" />
                                            <input type="file" ref={fileInputRef1} onChange={(e: any) => {
                                                fileHandler(e, 'company_logo')
                                            }} style={{ display: 'none' }} />
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <label className="mb-2">Company Name*</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={editDetails.company_name}
                                        onChange={changeHandler}
                                        id="Company_Name"
                                        placeholder='Synnc'
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="mb-2">Description</label>
                                    <textarea
                                        className="form-control"
                                        placeholder="Synnc is a platform that connects brands with creators to help them grow their business."
                                        value={editDetails.company_description}
                                        onChange={changeHandler}
                                        id="company_description"
                                        rows={4}
                                    ></textarea>
                                </div>
                                <div className="mb-4">
                                    <label className="mb-2">Location</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={editDetails.location}
                                        onChange={changeHandler}
                                        id="location"
                                        placeholder='United States'
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="mb-2">Employees(est)</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        value={editDetails.no_of_employees}
                                        onChange={changeHandler}
                                        id="no_of_employees"
                                        placeholder='100'
                                    />
                                </div>
                                <div className='mb-4'>
                                    <label className="mb-2">Size</label>
                                    <select
                                        className="form-select form-select-sm"
                                        value={editDetails.size}
                                        onChange={changeHandler}
                                        id="size"
                                    >
                                        <option disabled selected value="" className="small text-muted">Select size</option>
                                        <option value="Small" className="small">Small</option>
                                        <option value="Medium" className="small">Medium</option>
                                        <option value="Large" className="small">Large</option>
                                    </select>
                                </div>

                                <div className='mb-4 '>
                                    <label className="mb-2 mt-3">Categories</label>
                                    <div className="position-relative">
                                        <div
                                            className="form-control d-flex flex-wrap gap-2 min-height-auto cursor-pointer"
                                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                        >
                                            {selectedCategories.length > 0 ? (
                                                <>
                                                    {selectedCategories.map(category => (
                                                        <span
                                                            key={category}
                                                            className="bg-dark-subtle text-dark px-2 py-1 rounded-pill d-flex align-items-center gap-1"
                                                        >
                                                            {category}
                                                            <Icon
                                                                icon="mdi:close"
                                                                className="cursor-pointer"
                                                                width={16}
                                                                height={16}
                                                                onClick={(e) => handleRemoveCategory(category, e)}
                                                            />
                                                        </span>
                                                    ))}
                                                    {selectedCategories.length > 1 && (
                                                        <span
                                                            className="text-muted ms-2 cursor-pointer"
                                                            onClick={handleClearAllCategories}
                                                        >
                                                            Clear all
                                                        </span>
                                                    )}
                                                </>
                                            ) : (
                                                <span className="text-muted">Select up to 5 categories</span>
                                            )}
                                        </div>

                                        {isDropdownOpen && (
                                            <div className="position-absolute bottom-100 start-0 w-100 mb-1 bg-white border rounded-3 shadow-sm z-3" style={{ maxHeight: '200px', overflowY: 'auto' }}>
                                                {categoryOptions.map(option => (
                                                    <div
                                                        key={option.value}
                                                        className={`px-3 py-2 cursor-pointer hover-bg-light ${selectedCategories.includes(option.value) ? 'bg-light' : ''
                                                            }`}
                                                        onClick={() => handleCategorySelect(option.value)}
                                                    >
                                                        {option.label}
                                                        {selectedCategories.includes(option.value) && (
                                                            <Icon icon="mdi:check" className="float-end" />
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                    {selectedCategories.length >= 5 && (
                                        <small className="text-muted">Maximum 5 categories can be selected</small>
                                    )}
                                </div>


                            </div>
                        </div>

                        {/* Second edit section */}
                        <div className={`profile-container ${activeSection === 'collaboration' ? '' : 'd-none'}`}>
                            <div className="d-flex justify-content-between mb-3 pt-2">
                                <h6 className="mb-0 ">Edit Section</h6>
                                <div>
                                    <button className="bg-white border btn btn-sm" onClick={handleCancel}>Cancel</button>
                                    <button className="btn btn-dark btn-sm ms-3" >Save</button>
                                </div>
                            </div>

                            {/* Content Section */}
                            <div className='pb-2 main-box'>
                                <h6 className="mb-1">Let's Collaborate</h6>
                                <p className='text-muted'>Add your collaboration packages here</p>
                                {/* Stats Section */}
                                <div className="mb-4">
                                    <div className="card mb-3">
                                        {/* <div className="card-header bg-white">
                                        <h6 className="mb-0">Package</h6>
                                    </div> */}

                                        {/* Card 1 */}
                                        {
                                            preview && cardDetails && cardDetails?.length !== 0 && cardDetails?.map((ele: any, index: number) => {
                                                return (
                                                    <div className="card-body" key={index}>
                                                        <div >
                                                            <div className="d-flex justify-content-between align-items-center mb-2">
                                                                <h6 className="mb-0">Card {index + 1}</h6>
                                                                <Icon icon="material-symbols:delete-outline" className="cursor-pointer" />
                                                            </div>

                                                            {/* Title */}
                                                            <div className="mb-3">
                                                                <label className="mb-2">Title</label>
                                                                <input id="package_name" defaultValue={ele.package_name} onChange={(e) => valueAdder(e, index)} type="text" className="form-control" placeholder="1x Sponsored Post" />
                                                            </div>

                                                            {/* Description */}
                                                            <div className="mb-3">
                                                                <label className="mb-2">Description</label>
                                                                <textarea
                                                                    className="form-control"
                                                                    rows={5}
                                                                    defaultValue={ele?.package_description}
                                                                    onChange={(e) => valueAdder(e, index)}
                                                                    id="package_description"
                                                                    placeholder="I'll create a LinkedIn post to educate my audience on the benefits of your company's offerings, or for anything else you're interested in promoting, like an upcoming event."
                                                                />
                                                            </div>

                                                            {/* Price */}
                                                            <div>
                                                                <label className="mb-2">Price</label>
                                                                <input id="package_price" defaultValue={ele?.package_price ? ele?.package_price : 0} type="number" onChange={(e) => valueAdder(e, index)} className="form-control" placeholder="$ 100" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }


                                    </div>
                                    <button className="btn btn-outline-dark w-100" onClick={() => {
                                        setPreview(false)
                                        const newEntry = {

                                            package_name: "",
                                            package_description: "",
                                            package_price: 0

                                        }
                                        const newArray: any = cardDetails
                                        newArray?.push(newEntry)
                                        setCardDetails(newArray)
                                        setTimeout(() => {
                                            setPreview(true)
                                        }, 100);
                                    }}>+ Add Card</button>
                                </div>

                                <button className="btn btn-outline-danger w-100 mt-auto" onClick={() => {
                                    setPreview(false)

                                    setCardDetails([])
                                    setTimeout(() => {
                                        setPreview(true)
                                    }, 100);
                                }}>Delete Block</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
