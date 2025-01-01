import { Icon } from "@iconify/react/dist/iconify.js";
import { useRouter } from "next/navigation";
import { useState } from "react";

function SubmitCampaignModal() {
    const router = useRouter();
    const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

    const handleSubmitWork = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Work submitted');
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const filesArray = Array.from(e.target.files);
            setUploadedFiles(prev => [...prev, ...filesArray]);
        }
    };

    const removeFile = (index: number) => {
        setUploadedFiles(prev => prev.filter((_, i) => i !== index));
    };
    return (
        <div className="modal fade" id="submitCampaignModal" tabIndex={-1} aria-labelledby="submitCampaignModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="submitCampaignModalLabel">Submit Campaign</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
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
                                            placeholder='Enter the title of your submission'
                                            required
                                        />
                                    </div>
                                    <div className='mb-3'>
                                        <label className='form-label'>Description</label>
                                        <textarea
                                            className='form-control'
                                            rows={4}
                                            placeholder="Describe the work you've completed and any relevant details"
                                            required
                                        />
                                    </div>
                                    <div className='mb-5'>
                                        <label className='form-label'>Upload Files</label>
                                        {uploadedFiles.length === 0 ? (
                                            <div
                                                className='cursor card-hover upload-area p-4 rounded-3 bg-white border border-dotted border-2 text-center cursor-pointer'
                                                style={{ maxWidth: '200px' }}
                                                onClick={() => document.getElementById('fileInput')?.click()}
                                            >
                                                <Icon icon="mdi:cloud-upload-outline" className='mb-2 text-muted' width={40} height={40} />
                                                <p className='mb-1 fs-12'>Drag and drop files here or click to browse</p>
                                                <input
                                                    id="fileInput"
                                                    type="file"
                                                    className='d-none'
                                                    multiple
                                                    onChange={(e) => handleFileUpload(e)}
                                                />
                                                <p className='text-muted small mt-2 mb-0 fs-10'>Supported formats: JPEG, PNG, PDF (Max 10MB)</p>
                                            </div>
                                        ) : (
                                            <div
                                                className='align-items-center bg-white border border-2 border-dotted card-hover cursor cursor-pointer d-flex justify-content-center mb-3 p-4 rounded-3 text-center upload-area'
                                                style={{ maxWidth: '100px' }}
                                                onClick={() => document.getElementById('fileInput')?.click()}
                                            >
                                                <button className='btn btn-outline-warning btn-sm border-dotted rounded-circle d-flex align-items-center justify-content-center' style={{ width: '40px', height: '40px', padding: 0 }}>
                                                    <Icon icon="material-symbols:add" width={20} height={20} />
                                                </button>
                                                <input
                                                    id="fileInput"
                                                    type="file"
                                                    className='d-none'
                                                    multiple
                                                    onChange={(e) => handleFileUpload(e)}
                                                />
                                            </div>
                                        )}

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
                        <button type='submit' className='btn btn-info btn-sm'>
                            Submit Campaign
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SubmitCampaignModal; 