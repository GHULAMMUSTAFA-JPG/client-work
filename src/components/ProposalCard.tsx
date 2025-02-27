import React, { useState } from 'react';
import { Clock, DollarSign, ThumbsUp, X, RefreshCw, ChevronDown, ChevronUp } from 'lucide-react';

interface ProposalCardProps {
    campaignName: string;
    postTitle: string;
    amount: number;
    submissionDate: string;
    approvalDate?: string;
    status: 'pending' | 'approved' | 'rejected';
    onApprove?: () => void;
    onReject?: () => void;
    onCounter?: () => void;
    isCreatorView?: boolean;
}

export const ProposalCard = ({
    campaignName,
    postTitle,
    amount,
    submissionDate,
    approvalDate,
    status,
    onApprove,
    onReject,
    onCounter,
    isCreatorView = false,
}: ProposalCardProps) => {
    const [isRulesOpen, setIsRulesOpen] = useState(false);

    const getStatusColor = () => {
        switch (status) {
            case 'approved':
                return 'bg-success text-white';
            case 'rejected':
                return 'bg-danger text-white';
            default:
                return 'pending';
        }
    };

    const getStatusText = () => {
        switch (status) {
            case 'approved':
                return 'Approved';
            case 'rejected':
                return 'Rejected';
            default:
                return 'Pending Approval';
        }
    };

    return (
        <div className="border-opacity-25 border-primary card p-4 shadow-sm w-100 my-3" style={{ maxWidth: '28rem' }}>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h3 className="fw-medium text-dark">{campaignName}</h3>
                <span className={`badge p-2 ${getStatusColor()}`}>
                    {getStatusText()}
                </span>
            </div>
            <div>
                <div className="mb-3">
                    <p className="text-secondary small">Post Title</p>
                    <p className="fw-medium">{postTitle}</p>
                </div>

                <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center gap-1">
                        <DollarSign className="text-secondary" style={{ width: '1rem', height: '1rem' }} />
                        <span className="fw-medium">${amount.toFixed(2)}</span>
                    </div>
                    <div className="d-flex align-items-center gap-1 text-secondary small">
                        <Clock style={{ width: '1rem', height: '1rem' }} />
                        <span>26 Feb, 2024</span>
                    </div>
                </div>

                {approvalDate && (
                    <div className="text-secondary small">
                        Approved on: 26 Feb, 2024
                    </div>
                )}

                <div className="border-top pt-3 mt-2">
                    <button
                        onClick={() => setIsRulesOpen(!isRulesOpen)}
                        className="text-secondary w-100 text-start d-flex justify-content-between align-items-center p-0"
                    >
                        <span className="fw-medium">Important Rules</span>
                        {isRulesOpen ? (
                            <ChevronUp style={{ width: '1rem', height: '1rem' }} />
                        ) : (
                            <ChevronDown style={{ width: '1rem', height: '1rem' }} />
                        )}
                    </button>

                    {isRulesOpen && (
                        <div className="mt-2 small text-secondary active p-3 rounded">
                            <p className='mb-1'>1. You do not have to make a decision on a proposal immediately before responding. Please respond to all inquiries to maintain the integrity of the platform.</p>
                            <p className='mb-1'>2. You can start the conversation by saying you're open to discussing this further here, or possibly send a calendar link for a call if that's what you prefer.</p>
                            <p className='mb-1'>3. Ensure you've connected your payment method in Settings before accepting proposals. Accepting a proposal does not auto-trigger payment.</p>
                        </div>
                    )}
                </div>

                {!isCreatorView && status === 'pending' && (
                    <div className="d-flex gap-2 mt-3">
                        <button
                            onClick={onApprove}
                            className="btn btn-primary flex-grow-1 d-flex align-items-center justify-content-center gap-1"
                        >
                            <ThumbsUp style={{ width: '1rem', height: '1rem' }} />
                            Approve
                        </button>
                        <button
                            onClick={onReject}
                            className="btn btn-outline-secondary text-dark d-flex align-items-center justify-content-center gap-1"
                        >
                            <X style={{ width: '1rem', height: '1rem' }} />
                            Reject
                        </button>
                        <button
                            onClick={onCounter}
                            className="btn btn-outline-secondary text-dark d-flex align-items-center justify-content-center gap-1"
                        >
                            <RefreshCw style={{ width: '1rem', height: '1rem' }} />
                            Counter
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}