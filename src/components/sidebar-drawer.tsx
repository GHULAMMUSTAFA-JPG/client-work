// import React, { forwardRef, ForwardedRef } from "react";
// import { Icon } from "@iconify/react/dist/iconify.js";
// import { apiController } from "@/@api/baseUrl";
// import { useAuth } from "@/contexts/AuthContext";
// import { toast } from "react-toastify";

// // Define props interface
// interface SidebarDrawerCanvasOffcanvasProps {
//     data?: any;
//     onClose?: () => void;
// }

// // Use forwardRef to expose the offcanvas DOM element
// const SidebarDrawerCanvas = forwardRef<HTMLDivElement, SidebarDrawerCanvasOffcanvasProps>(
//     ({ data, onClose }, ref: ForwardedRef<HTMLDivElement>) => {
//         const { user } = useAuth();
//         const [loading, setLoading] = React.useState(false);

//         // Handle applying to the campaign
//         const handleApply = async (campaignId: string) => {
//             try {
//                 setLoading(true);
//                 const response = await apiController.post(`/dashboard/campaigns/apply_campaign`, {
//                     campaign_id: campaignId,
//                     creator_email: user.email,
//                     message: "",
//                 });
//                 if (response.status === 200) {
//                     toast.success(response.data.message || "Application submitted successfully!");
//                     // Optionally update the campaign state to reflect "Applied"
//                     if (data) {
//                         data.Is_Applied = true;
//                     }
//                 }
//             } catch (error: any) {
//                 console.error("Error applying to campaign:", error);
//                 toast.error(error?.data?.message || "Failed to apply to campaign");
//             } finally {
//                 setLoading(false);
//             }
//         };

//         return (
//             <div
//                 className="offcanvas offcanvas-end"
//                 tabIndex={-1}
//                 id="campaignsOffcanvas"
//                 ref={ref}
//             >
//                 <div className="offcanvas-header border-bottom">
//                     title
//                     <button
//                         type="button"
//                         className="btn-close"
//                         data-bs-dismiss="offcanvas"
//                         aria-label="Close"
//                         onClick={onClose}
//                     />
//                 </div>
//                 <div className="offcanvas-body">
//                     {data ? (
//                         <div>
//                            body
//                         </div>
//                     ) : (
//                         <div className="text-center">
//                             <p className="text-muted fs-14">No campaign data available</p>
//                         </div>
//                     )}
//                 </div>
//             </div>
//         );
//     }
// );

// SidebarDrawerCanvas.displayName = "SidebarDrawerCanvas";

// export default SidebarDrawerCanvas;



import React, { forwardRef, ForwardedRef } from "react";
import { apiController } from "@/@api/baseUrl";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "react-toastify";

// Define props interface
interface SidebarDrawerCanvasOffcanvasProps {
    data?: any; // Still keep data for campaign info if needed
    headerContent?: React.ReactNode; // HTML/JSX for the header
    bodyContent?: React.ReactNode; // HTML/JSX for the body
    footerContent?: React.ReactNode; // HTML/JSX for the footer
    onClose?: () => void; // Optional callback when closed
}

// Use forwardRef to expose the offcanvas DOM element
const SidebarDrawerCanvas = forwardRef<HTMLDivElement, SidebarDrawerCanvasOffcanvasProps>(
    ({ data, headerContent, bodyContent, footerContent, onClose }, ref: ForwardedRef<HTMLDivElement>) => {
        const { user } = useAuth();
        const [loading, setLoading] = React.useState(false);

        // Handle applying to the campaign
        const handleApply = async (campaignId: string) => {
            try {
                setLoading(true);
                const response = await apiController.post(`/dashboard/campaigns/apply_campaign`, {
                    campaign_id: campaignId,
                    creator_email: user.email,
                    message: "",
                });
                if (response.status === 200) {
                    toast.success(response.data.message || "Application submitted successfully!");
                    if (data) {
                        data.Is_Applied = true; // Update the campaign state
                    }
                }
            } catch (error: any) {
                console.error("Error applying to campaign:", error);
                toast.error(error?.data?.message || "Failed to apply to campaign");
            } finally {
                setLoading(false);
            }
        };

        return (
            <div
                className="offcanvas offcanvas-end"
                tabIndex={-1}
                id="campaignsOffcanvas"
                ref={ref}
            >
                <div className="offcanvas-header border-bottom">
                    {/* Render the header content passed from the parent */}
                    {headerContent || <h6 className="fs-16 fw-500">Campaign Details</h6>}
                    <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="offcanvas"
                        aria-label="Close"
                        onClick={onClose}
                    />
                </div>
                <div className="offcanvas-body">
                    {data ? (
                        <div>
                            {/* Render the body content passed from the parent */}
                            {bodyContent || <p>No body content provided</p>}
                        </div>
                    ) : (
                        <div className="text-center">
                            <p className="text-muted fs-14">No campaign data available</p>
                        </div>
                    )}
                </div>
                {/* Render the footer content passed from the parent */}
                {footerContent && (
                    <div className="offcanvas-footer border-top p-3">
                        {footerContent}
                    </div>
                )}
            </div>
        );
    }
);

SidebarDrawerCanvas.displayName = "SidebarDrawerCanvas";

export default SidebarDrawerCanvas;