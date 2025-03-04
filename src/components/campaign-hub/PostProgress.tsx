import React, { useState } from "react";
import {
  Check,
  MessageSquare,
  Link as LinkIcon,
  Upload,
  DollarSign,
  HelpCircle,
} from "lucide-react";
import { LivePostDrawer } from "./LivePostDrawer";
import { ImpressionsDrawer } from "./ImpressionsDrawer";
import { PaymentStatusDrawer } from "./PaymentStatusDrawer";

interface PostStage {
  id: number;
  label: string;
  description: string;
  value?: string | number;
  status: "completed" | "pending" | "inactive" | "rejected";
  icon?: React.ReactNode;
}

interface PostProgressProps {
  postId: string | null;
  stages: PostStage[];
  campaignId: string;
  creatorId: string;
  currentStage: number;
  onSubmit: () => void;
  linkedinPostUrl: string;
}

export function PostProgress({
  postId,
  stages,
  creatorId,
  campaignId,
  currentStage,
  onSubmit,
  linkedinPostUrl,
}: PostProgressProps) {
  const [hoveredStage, setHoveredStage] = useState<number | null>(null);
  const [isLivePostDrawerOpen, setIsLivePostDrawerOpen] = useState(false);
  const [isImpressionsDrawerOpen, setIsImpressionsDrawerOpen] = useState(false);
  const [isPaymentDrawerOpen, setIsPaymentDrawerOpen] = useState(false);
  const updatedStages = stages.map((stage) => {
    const currentStageIndex = stages.findIndex((s) => s.id === currentStage);
    const thisStageIndex = stages.findIndex((s) => s.id === stage.id);

    if (thisStageIndex < currentStageIndex) {
      return { ...stage, status: "completed" as const };
    } else if (thisStageIndex === currentStageIndex) {
      return { ...stage, status: "pending" as const };
    } else if (currentStage === 9 && thisStageIndex === currentStageIndex) {
      return { ...stage, status: "rejected" as const };
    } else {
      return { ...stage, status: "inactive" as const };
    }
  });
  const getStageIcon = (stage: PostStage) => {
    if (stage.icon) return stage.icon;

    const icons = {
      "Draft Upload": <Upload className="tw-w-4 tw-h-4" />,
      "See Feedback": <MessageSquare className="tw-w-4 tw-h-4" />,
      Approved: <Check className="tw-w-4 tw-h-4" />,
      "Live Post Link": <LinkIcon className="tw-w-4 tw-h-4" />,
      "Impression Upload": <Upload className="tw-w-4 tw-h-4" />,
      Payment: <DollarSign className="tw-w-4 tw-h-4" />,
    };

    return (
      icons[stage.label as keyof typeof icons] || (
        <div className="tw-w-2 tw-h-2 tw-bg-gray-300 tw-rounded-full" />
      )
    );
  };

  const getStageColor = (stage: PostStage, isHovered: boolean) => {
    switch (stage.status) {
      case "rejected":
        return {
          bg: isHovered ? "tw-bg-blue-600" : "tw-bg-blue-500",
          border: "tw-border-blue-500",
          text: "tw-text-white",
          line: "tw-bg-blue-500",
        };
      case "completed":
        return {
          bg: isHovered ? "tw-bg-green-600" : "tw-bg-green-500",
          border: "tw-border-green-500",
          text: "tw-text-white",
          line: "tw-bg-green-500",
        };
      case "pending":
        return {
          bg: isHovered ? "tw-bg-blue-600" : "tw-bg-blue-500",
          border: "tw-border-blue-500",
          text: "tw-text-white",
          line: "tw-bg-blue-500",
        };

      default:
        return {
          bg: "tw-bg-white",
          border: "tw-border-gray-300",
          text: "tw-text-gray-500",
          line: "tw-bg-gray-200",
        };
    }
  };

  const handleStageClick = (stage: PostStage, index: number) => {
    if (stage.id === currentStage) {
      switch (stage.label) {
        case "Live Post Link":
          setIsLivePostDrawerOpen(true);
          break;
        case "Impression Upload":
          setIsImpressionsDrawerOpen(true);
          break;
        case "Payment":
          setIsPaymentDrawerOpen(true);
          break;
      }
    }
  };

  const currentStageIndex = stages.findIndex((s) => s.id === currentStage);
  const progress = (currentStageIndex / (stages.length - 1)) * 100;

  return (
    <div className="tw-p-6 tw-border-b tw-border-gray-200 border-line">
      <div className="tw-flex tw-items-center tw-justify-between tw-mb-6">
        <h2 className="tw-text-lg tw-font-semibold">Post Progress</h2>
        <div className="tw-flex tw-items-center tw-text-sm tw-text-gray-500">
          <HelpCircle className="tw-w-4 tw-h-4 tw-mr-2" />
          <span>Click on steps to view details</span>
        </div>
      </div>

      <div className="tw-relative tw-mt-8">
        {/* Progress Line */}
        <div className="tw-absolute tw-top-4 tw-left-0 tw-w-full tw-h-1 tw-bg-gray-200">
          <div
            className="tw-h-full tw-bg-primary tw-transition-all tw-duration-500"
            style={{ width: `${progress + 4}%` }}
          />
        </div>

        {/* Stages */}
        <div className="tw-relative tw-flex tw-justify-between">
          {updatedStages.map((stage, index) => {
            const colors = getStageColor(stage, hoveredStage === stage.id);
            const approvedStageIndex = stages.findIndex(
              (s) => s.label === "Approved"
            );
            const isBeforeApproved = index <= approvedStageIndex;

            return (
              <div
                key={stage.id}
                className="tw-relative tw-flex tw-flex-col tw-items-center"
                onMouseEnter={() => setHoveredStage(stage.id)}
                onMouseLeave={() => setHoveredStage(null)}
              >
                {/* Tooltip - Now positioned above the step */}
                {hoveredStage === stage.id && (
                  <div className="tw-absolute tw-bottom-full tw-mb-2 tw-left-1/2 tw-transform -tw-translate-x-1/2 tw-w-64 tw-p-3 tw-bg-gray-900 tw-text-white tw-rounded-lg tw-shadow-lg tw-z-20">
                    <div className="tw-absolute -tw-bottom-2 tw-left-1/2 tw-transform -tw-translate-x-1/2 tw-w-4 tw-h-4 tw-rotate-45 tw-bg-gray-900" />
                    <div className="tw-relative">
                      <p className="tw-font-medium tw-mb-1">{stage.label}</p>
                      <p className="tw-text-sm tw-text-gray-300">
                        {stage.description}
                      </p>
                    </div>
                  </div>
                )}

                {/* Step Button */}
                <button
                  onClick={() => handleStageClick(stage, index)}
                  className={`
                    tw-relative tw-z-10 tw-w-8 tw-h-8 tw-rounded-full tw-border-2 tw-flex tw-items-center tw-justify-center
                    tw-transition-all tw-duration-200 ${colors.bg} ${
                    colors.border
                  }
                    ${
                      isBeforeApproved
                        ? "tw-cursor-pointer hover:tw-scale-110"
                        : "tw-cursor-pointer hover:tw-bg-gray-50"
                    }
                  `}
                >
                  {stage.status === "completed" ? (
                    <Check className="tw-w-4 tw-h-4 tw-text-white" />
                  ) : (
                    <span
                      className={`tw-text-sm tw-font-medium ${colors.text}`}
                    >
                      {index + 1}
                    </span>
                  )}
                </button>

                {/* Step Label */}
                <div className="tw-mt-4">
                  <div className="tw-flex tw-items-center tw-justify-center tw-space-x-1">
                    {getStageIcon(stage)}
                    <span
                      className={`tw-text-sm tw-font-medium ${
                        stage.status === "completed"
                          ? "tw-text-green-700"
                          : "tw-text-gray-700"
                      }`}
                    >
                      {stage.label}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {postId && (
        <>
          <LivePostDrawer
            isOpen={isLivePostDrawerOpen}
            onClose={() => setIsLivePostDrawerOpen(false)}
            onSubmit={() => {
              setIsLivePostDrawerOpen(false);
              onSubmit();
            }}
            campaignId={campaignId}
            creatorId={creatorId}
            postId={postId}
          />

          <ImpressionsDrawer
            isOpen={isImpressionsDrawerOpen}
            onClose={() => setIsImpressionsDrawerOpen(false)}
            postId={postId}
            campaignId={campaignId}
            creatorId={creatorId}
            linkedinPostUrl={linkedinPostUrl}
            onSubmit={() => {
              setIsImpressionsDrawerOpen(false);
              onSubmit();
            }}
          />

          <PaymentStatusDrawer
            isOpen={isPaymentDrawerOpen}
            onClose={() => setIsPaymentDrawerOpen(false)}
            postId={postId}
            status={{
              status: "processing",
              amount: 300,
              dueDate: "2024-03-31",
              paymentMethod: "Bank Transfer",
              transactionId: "TRX123456",
            }}
          />
        </>
      )}
    </div>
  );
}
