import { Icon } from "@iconify/react/dist/iconify.js";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { addCampaignPostSubmission, handleFileUpload } from "@/@api";
interface submitcampaignprops {

    "campaign_id": string,
    "email": string,
    "post_title": string,
    "post_description": string,
    "media_content": any[]

}
function SubmitCampaignModal(props: any) {
    const { user } = useAuth()
    const { selectedCampaign, rendControl, setRendControl } = props
    const router = useRouter();
    const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

    const handleSubmitWork = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Work submitted');
    };
    const [dto, setDto] = useState<submitcampaignprops>({
        campaign_id: selectedCampaign?.campaign?._id,
        email: "",
        post_description: "",
        post_title: "",
        media_content: []
    })

    useEffect(() => {
        user?.email && setDto((prev: any) => {
            return { ...prev, ["email"]: user?.email }
        })
    }, [user])

    useEffect(() => {
        selectedCampaign?.campaign?._id && setDto((prev: any) => {
            return { ...prev, ["campaign_id"]: selectedCampaign?.campaign?._id }
        })
    }, [selectedCampaign])

    const removeFile = (index: number) => {
        setUploadedFiles(prev => prev.filter((_, i) => i !== index));
    };


    const submitForm = async (e: any) => {
        e.preventDefault();
        const result = await addCampaignPostSubmission(dto, rendControl, setRendControl)

    }

    const valueAdder = (e: any) => {
        setDto((prev: any) => {
            return { ...prev, [e.target.id]: e.target.value }
        })
    }

    return (
        <div className="modal fade" id="submitCampaignModal" tabIndex={-1} aria-labelledby="submitCampaignModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="submitCampaignModalLabel">Submit Campaign</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" id="closeSubmissionModal"></button>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            <div className="col-12">
                                <form onSubmit={handleSubmitWork}>
                                    <div className='mb-3'>
                                        <label className='form-label'>Submission Title</label>
                                        <input
                                            type="text"
                                            className='form-control'
                                            id="post_title"
                                            onChange={valueAdder}
                                            placeholder='Enter the title of your submission'
                                            required
                                        />
                                    </div>
                                    <div className='mb-3'>
                                        <label className='form-label'>Description</label>
                                        <textarea
                                            className='form-control'
                                            rows={4}
                                            id="post_description"
                                            onChange={valueAdder}
                                            placeholder="Describe the work you've completed and any relevant details"
                                            required
                                        />
                                    </div>

                                    <input
                                                    id="fileInput"
                                                    type="file"
                                                    className='d-none'
                                                    multiple
                                                    onChange={async (e) => {

                                                        const result: any = await handleFileUpload(e)

                                                        if (result?.length !== 0) {
                                                            let array: any = []
                                                            result?.map((url: any, index: number) => {
                                                                array.push(url?.file_urls)
                                                            })
                                                            setDto((prev: any) => {
                                                                return { ...prev, ["media_content"]: array }
                                                            })
                                                        }
                                                        console.log(result, "result")
                                                    }}
                                                />
                                    
                                    <div className='mb-5'>
                                        <label className='form-label'>Upload Files</label>
                                        {dto?.media_content.length === 0 ? (
                                            <div
                                                className='cursor card-hover upload-area p-4 rounded-3 bg-white border border-dotted border-2 text-center cursor-pointer'
                                                style={{ maxWidth: '200px' }}
                                                onClick={() => document.getElementById('fileInput')?.click()}
                                            >
                                                <Icon icon="mdi:cloud-upload-outline" className='mb-2 text-muted' width={40} height={40} />
                                                <p className='mb-1 fs-12'>Drag and drop files here or click to browse</p>
                                                {/* <input
                                                    id="fileInput"
                                                    type="file"
                                                    className='d-none'
                                                    multiple
                                                    onChange={async (e) => {

                                                        const result: any = await handleFileUpload(e)

                                                        if (result?.length !== 0) {
                                                            let array: any = []
                                                            result?.map((url: any, index: number) => {
                                                                array.push(url?.file_urls)
                                                            })
                                                            setDto((prev: any) => {
                                                                return { ...prev, ["media_content"]: array }
                                                            })
                                                        }
                                                        console.log(result, "result")
                                                    }}
                                                /> */}
                                                <p className='text-muted small mt-2 mb-0 fs-10'>Supported formats: JPEG, PNG, PDF (Max 10MB)</p>
                                            </div>
                                        ) :
                                        

                                            dto?.media_content?.map((ele: any, index: number) => {
                                                const fileName = ele.split('/').pop();
                                                return (
                                                    <div
                                                        className='align-items-center bg-white border border-2 border-dotted card-hover cursor cursor-pointer d-flex flex-column justify-content-center mb-3 p-3 rounded-3 text-center upload-area'
                                                        style={{ maxWidth: '150px' }}
                                                        onClick={() => document.getElementById('fileInput')?.click()}
                                                    >
                                                        <Icon icon="mdi:file-document-outline" className='mb-2 text-muted' width={30} height={30} />
                                                        <p className='mb-0 small text-truncate w-100'>{fileName}</p>
                                                    </div>
                                                )
                                            })

                                        }
                                        {/* <div className='cursor card-hover upload-area d-flex align-items-center justify-content-center border border-dotted border-2 rounded-3' style={{ width: '150px', height: '92px' }} onClick={() => document.getElementById('fileInput')?.click()}>
                                            <Icon icon="material-symbols:add" width={20} height={20} />
                                        </div> */}

                                        <div className='uploaded-files'>
                                            <div className='row g-3'>
                                                {uploadedFiles?.map((file, index) => (
                                                    <div key={index} className='col-md-4 col-lg-3'>
                                                        <div className='card h-100'>
                                                            <div className='position-relative'>
                                                                {file.type.includes('image') ? (
                                                                    <img
                                                                        src={URL.createObjectURL(file)}
                                                                        className='card-img-top'
                                                                        alt={file.name}
                                                                        style={{ height: '150px', objectFit: 'cover' }}
                                                                    />
                                                                ) : (
                                                                    <div className='card-img-top d-flex align-items-center justify-content-center bg-light' style={{ height: '120px' }}>
                                                                        <Icon icon="mdi:file-document-outline" width={40} height={40} />
                                                                    </div>
                                                                )}
                                                                <button
                                                                    className='btn btn-sm btn-dark position-absolute top-0 end-0 m-2'
                                                                    onClick={() => removeFile(index)}
                                                                >
                                                                    <Icon icon="mdi:close" width={16} height={16} />
                                                                </button>
                                                            </div>
                                                            <div className='card-body p-2 border-top'>
                                                                <p className='small text-truncate mb-0'>{file.name}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button className='btn btn-outline-info btn-sm me-2' data-bs-dismiss="modal">Cancel</button>
                        <button type='submit' className='btn btn-info btn-sm' onClick={submitForm}>
                            Upload Submission
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SubmitCampaignModal; 