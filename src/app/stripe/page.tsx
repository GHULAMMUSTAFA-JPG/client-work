"use client";

import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import "@/styles/stripe.scss";
import { apiController } from "@/@api/baseUrl";

export default function StripePricing() {
  const [customersecret, setcustomersecret] = useState(null);
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://js.stripe.com/v3/pricing-table.js";
    script.async = true;
    document.body.appendChild(script);

    // Add custom CSS to override Stripe's default styles
    const style = document.createElement("style");

    document.head.appendChild(style);

    return () => {
      document.body.removeChild(script);
      document.head.removeChild(style);
    };
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        // const user = localStorage.getItem("user");

        // const userObject = user ? JSON.parse(user) : null;
        // console.log("userObject", userObject);
        // const id = userObject?._id;
        const id = localStorage.getItem("id");
        console.log("id", id);
        if (id) {
          const response = await apiController.get(
            `payments/create-customer-session?user_id=${id}`
          );
          if (response.status == 200) {
            setcustomersecret(response.data.customer_session_client_secret);
          }
          console.log("response", response);
        } else {
          console.log("User ID is not available");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  console.log("customersecret", customersecret);
  return (
    <div className="container-fluid py-5">
      <div className="text-center mb-5">
        <div className="Company-Logo">
          <svg
            id="weblogo-teel"
            xmlns="http://www.w3.org/2000/svg"
            width="316.47"
            height="105.345"
            viewBox="0 0 316.47 105.345"
          >
            <g id="Group_17" data-name="Group 17" transform="translate(0 0)">
              <path
                id="Path_843"
                data-name="Path 843"
                d="M-123.958-16.8c.954.828,1.884,1.666,2.791,2.544a3.4,3.4,0,0,0,2.321,1,4.68,4.68,0,0,0,1.475-1.155l.825-.764c1.1-1.089,2.175-2.208,3.223-3.351a3.761,3.761,0,0,1,2.736-1.023,4.786,4.786,0,0,1,1.966,1.18,13.6,13.6,0,0,1,.242,2.967c0,.3,0,.6.007.913,0,1,0,1.993-.015,2.99q0,1.038,0,2.076,0,2.176-.02,4.352-.023,2.791-.014,5.582,0,2.144-.01,4.288,0,1.029,0,2.059c0,.959-.009,1.917-.02,2.875,0,.284,0,.569,0,.862a5.663,5.663,0,0,1-.586,2.871,7.1,7.1,0,0,1-3.694.567l-.9.006c-.984.005-1.968,0-2.952,0l-2.05,0q-2.148,0-4.3-.006-2.756-.01-5.511,0-2.117.006-4.233,0-1.016,0-2.032,0c-.946,0-1.892,0-2.839-.008l-.851.007a4.342,4.342,0,0,1-2.838-.693,3.3,3.3,0,0,1-.422-3.006,32.854,32.854,0,0,1,4.962-5.254,3.453,3.453,0,0,0,.937-2.218c-3.226-4.263-9.572-6.611-14.629-7.666a33.028,33.028,0,0,0-24.982,6.32,3.107,3.107,0,0,0-.9,2.132A4.753,4.753,0,0,0-175.1,5.128l.776.831.813.833.733.758c.751.765,1.511,1.521,2.274,2.274l.832.827q1.3,1.292,2.6,2.58,1.727,1.711,3.45,3.426l.8.792.737.733.65.643c1.043,1.134,1.007,2.2.987,3.708a3.3,3.3,0,0,1-1.267,2.349,10.448,10.448,0,0,1-3.622.457l-1.528.011-1.657.005-.846,0q-2.223.009-4.446.011-2.279,0-4.558.023-1.766.011-3.532.01-.839,0-1.678.009c-6.237.054-11.124-1-15.791-5.3a18.419,18.419,0,0,1-4.941-12.29c.275-8.245,6.349-15.525,11.922-21.09a57.278,57.278,0,0,1,18.878-11.405l1.249-.455A52.868,52.868,0,0,1-123.958-16.8Z"
                transform="translate(204.352 27.698)"
                fill="#1bb09d"
              />
              <path
                id="Path_844"
                data-name="Path 844"
                d="M-87.483-.069l.8-.008c.875-.007,1.751-.006,2.626,0l1.838-.006q1.928-.005,3.856,0c1.635,0,3.27,0,4.905-.015q1.9-.011,3.8,0,.9,0,1.806-.007C-62.117-.152-57.57.911-53.18,4.81c3.845,4.125,4.969,8.884,4.839,14.378-.3,5.815-4.332,10.851-7.986,15.119l-.805.965c-8.736,10.139-21.453,16.137-34.69,17.4q-1.13.073-2.261.123l-1.091.049A52.482,52.482,0,0,1-131.662,39.28c-.9-.719-.9-.719-1.9-.722-1.868.85-3.09,2.52-4.432,4.037-1.213,1.3-1.786,1.881-3.581,2.207-1.275-.269-1.275-.269-1.935-.891a7.155,7.155,0,0,1-.672-3.848c0-.289,0-.579-.006-.877-.006-.954,0-1.908,0-2.863q0-1,0-1.992,0-2.087.006-4.174.01-2.674,0-5.348-.007-2.057,0-4.114,0-.986,0-1.972c0-.919,0-1.837.008-2.756,0-.407,0-.407-.007-.822a7.276,7.276,0,0,1,.574-3.03c1.156-.932,2.313-.834,3.734-.815l.913-.006c1,0,1.993,0,2.99.009l2.077,0q2.176,0,4.352.013,2.791.017,5.582.005,2.144,0,4.288.005,1.029,0,2.059,0c.959,0,1.917.005,2.875.014l.862-.005a4.6,4.6,0,0,1,2.878.684c.408.66.408.66.46,1.936-.69,2.286-2.291,3.419-4.048,4.952-1.546,1.358-1.546,1.358-1.982,3.295,1.359,3.156,6.112,4.945,9.124,6.208,8.321,2.812,16.778,2.706,24.777-1.18A29.083,29.083,0,0,0-76.385,22.9a3.1,3.1,0,0,0-.562-2.76l-.8-.777-.9-.891-.983-.945-1-.985q-1.584-1.56-3.182-3.106t-3.174-3.11q-.987-.969-1.98-1.932l-.907-.887-.8-.776a4.807,4.807,0,0,1-1.495-3.117l.1-.8.077-.8C-91.249-.056-89.419-.06-87.483-.069Z"
                transform="translate(144.193 52.492)"
                fill="#1bb09d"
              />
            </g>
            <g
              id="Group_18"
              data-name="Group 18"
              transform="translate(110.962 23.766)"
            >
              <path
                id="Path_845"
                data-name="Path 845"
                d="M-57.352-7.729a5.766,5.766,0,0,1,2.014,4.339,6.464,6.464,0,0,1-2.335,4.67,7.469,7.469,0,0,1-5.285.639A41.5,41.5,0,0,1-67.436-.155a15.234,15.234,0,0,0-7.148-1.589l-1.5-.02A7.732,7.732,0,0,0-79.869-.441a5.818,5.818,0,0,0-1.006,3.487,5.012,5.012,0,0,0,2.186,2.805,21.718,21.718,0,0,0,3.245,1.18l.941.3q2.314.73,4.652,1.37c5.313,1.47,11.38,3.333,14.524,8.233,2.034,3.938,2.045,8.915,1.088,13.2-1.748,4.523-4.654,6.954-8.927,8.987C-70.737,42.2-79.133,41.06-86.555,38.1a22.137,22.137,0,0,1-7.473-5.113,10.2,10.2,0,0,1-.393-4.719,6.278,6.278,0,0,1,3.54-3.54,6.716,6.716,0,0,1,5.32.737c.758.466,1.506.945,2.255,1.424a20.228,20.228,0,0,0,13.662,2.951A5.4,5.4,0,0,0-66.036,27.5a5.6,5.6,0,0,0,.326-3.163c-2.243-3.3-6.167-3.919-9.82-4.892-12.778-3.407-12.778-3.407-15.744-8.48a18.064,18.064,0,0,1-.787-13.372c1.853-4.058,4.488-7.051,8.668-8.743C-74.954-14.051-64.709-13.022-57.352-7.729Z"
                transform="translate(94.529 12.74)"
                fill="#1bb09d"
              />
              <path
                id="Path_846"
                data-name="Path 846"
                d="M-9.023-.249l1.237-.031A4.576,4.576,0,0,1-4.623,1.029a48.036,48.036,0,0,1,3.679,8.5l.462,1.274Q.241,12.8.957,14.795q.951,2.644,1.91,5.285L3.3,21.307l.41,1.131.358,1A2.689,2.689,0,0,0,5.209,25.02l.241-.67Q6.7,20.865,7.958,17.382q.467-1.3.933-2.593C13.816,1.074,13.816,1.074,16.221-.15a8.216,8.216,0,0,1,5.623.492A5.772,5.772,0,0,1,24.27,4.826c-.045,3.039-1.548,5.863-2.715,8.617q-.4.958-.794,1.916-1.273,3.067-2.573,6.122l-.885,2.1Q15,29.025,12.675,34.459q-1.023,2.388-2.015,4.789l-.421,1.018q-.4.959-.786,1.919c-1.5,3.625-3.5,6.823-7,8.792a19.016,19.016,0,0,1-13.34-.323,4.525,4.525,0,0,1-2.392-2.431,8.173,8.173,0,0,1,.664-5.53A5.391,5.391,0,0,1-8.15,41.223q1.327.135,2.647.31a4.219,4.219,0,0,0,3.67-.847c.845-1.008.845-1.008.686-1.959a37.737,37.737,0,0,0-1.709-4.443l-.427-.99q-.455-1.056-.913-2.111-.72-1.661-1.432-3.325c-1.408-3.278-2.825-6.553-4.28-9.811q-.831-1.862-1.65-3.728-.385-.867-.779-1.73C-15.2,6.323-15.2,6.323-14.455,3-13.02.634-11.782-.208-9.023-.249Z"
                transform="translate(57.039 12.842)"
                fill="#1bb09d"
              />
              <path
                id="Path_847"
                data-name="Path 847"
                d="M-49.011-3.69c3.1,2.436,4.418,5.826,5.005,9.646.116,1.895.12,3.785.118,5.683q0,.817.005,1.634,0,1.7,0,3.406,0,2.176.014,4.352.009,1.684,0,3.368c0,.793.006,1.587.011,2.38,0,.484,0,.969-.007,1.468,0,.424,0,.849,0,1.286A6.666,6.666,0,0,1-46.169,34a7.1,7.1,0,0,1-5.309,1.057,7.712,7.712,0,0,1-3.41-2.346,12.793,12.793,0,0,1-.7-5.463c-.005-.416-.01-.831-.016-1.26q-.024-1.992-.032-3.984t-.036-3.963q-.014-1.231-.017-2.462c-.036-3.449-.156-6.894-2.479-9.626-1.9-1.222-4.117-1.025-6.293-.787A7.776,7.776,0,0,0-68,8.316a8.875,8.875,0,0,0-.455,3.141c-.006.6-.006.6-.012,1.21,0,.431-.006.863-.009,1.307q-.017,1.371-.034,2.742-.024,2.161-.041,4.321-.016,2.086-.048,4.171c0,.427,0,.855,0,1.3-.046,2.866-.188,5.445-2.347,7.549a7.7,7.7,0,0,1-5.309,1.008,7.207,7.207,0,0,1-3.933-3.146,12.674,12.674,0,0,1-.463-4.188c0-.306-.005-.612-.008-.927q-.012-1.519-.016-3.038c0-.346,0-.693,0-1.05q-.012-2.752-.018-5.5-.007-2.836-.034-5.672-.015-2.186-.015-4.372,0-1.045-.014-2.09c-.01-.978-.009-1.956-.006-2.934l-.015-.863A9.615,9.615,0,0,1-79.009-4.27c1.727-1.424,3.358-1.425,5.524-1.369A5.529,5.529,0,0,1-69.57-3.09a8.769,8.769,0,0,1,.787,2.36l.664-.633C-62.8-6.29-55.416-7.84-49.011-3.69Z"
                transform="translate(208.51 18.141)"
                fill="#1bb09d"
              />
              <path
                id="Path_848"
                data-name="Path 848"
                d="M-49.011-3.69a14.275,14.275,0,0,1,5.005,9.253c.123,1.938.13,3.875.132,5.816q0,.844.008,1.689.007,1.762.006,3.524c0,1.5.011,3,.024,4.5q.013,1.741.01,3.482,0,.83.01,1.66c.008.774,0,1.549,0,2.323,0,.439,0,.879,0,1.332A6.884,6.884,0,0,1-46.39,34.2a7.352,7.352,0,0,1-5.088.86,7.819,7.819,0,0,1-3.41-2.335c-.8-1.855-.7-3.659-.7-5.66-.005-.434-.01-.868-.016-1.315q-.024-2.08-.032-4.16t-.036-4.143q-.014-1.288-.017-2.575c-.029-2.842-.079-5.654-1.643-8.1a5.83,5.83,0,0,0-4.72-1.745,6.077,6.077,0,0,0-4.769,1.721A6.3,6.3,0,0,0-68.452,11.5c-.006.613-.006.613-.012,1.237,0,.441-.006.882-.009,1.337q-.017,1.4-.034,2.8-.024,2.208-.041,4.417-.016,2.131-.048,4.262c0,.438,0,.876,0,1.327a11.753,11.753,0,0,1-1.363,6.213,6.658,6.658,0,0,1-5.483,2.051,6.113,6.113,0,0,1-4.079-2.223c-1.179-1.791-1.119-3.5-1.127-5.6,0-.3-.005-.6-.008-.915q-.012-1.5-.016-2.993c0-.513,0-.513,0-1.036q-.012-2.714-.018-5.427-.007-2.8-.034-5.591-.015-2.156-.015-4.312,0-1.03-.014-2.06c-.01-.964-.009-1.927-.006-2.891l-.015-.85A9.6,9.6,0,0,1-79.009-4.27c1.727-1.424,3.358-1.425,5.524-1.369A5.529,5.529,0,0,1-69.57-3.09a8.769,8.769,0,0,1,.787,2.36l.664-.633C-62.8-6.29-55.416-7.84-49.011-3.69Z"
                transform="translate(165.641 18.141)"
                fill="#1bb09d"
              />
              <path
                id="Path_849"
                data-name="Path 849"
                d="M-52.33-5.821c1.264,1.066,2.272,1.989,2.467,3.693.121,3.41.121,3.41-1.042,4.812-1.64,1.484-2.8,1.5-4.961,1.495a9.644,9.644,0,0,1-4.2-1.948A9.914,9.914,0,0,0-67.094,1.02a9.3,9.3,0,0,0-5.687,4.171,12.877,12.877,0,0,0-.8,10.424,9.3,9.3,0,0,0,5.073,5.432,10.562,10.562,0,0,0,8.454-.588q.9-.5,1.794-1.023a7.378,7.378,0,0,1,5.144-1.266,8.794,8.794,0,0,1,3.146,2.36,7.01,7.01,0,0,1-.147,5.531,18.219,18.219,0,0,1-12.413,5.93c-7.031.328-12.647-1.149-17.993-5.93a20.992,20.992,0,0,1-5.629-12.217l-.081-1.094A22.216,22.216,0,0,1-81.3-2.606a21.507,21.507,0,0,1,10.49-6.362l.851-.22C-63.8-10.148-57.459-9.56-52.33-5.821Z"
                transform="translate(254.984 21.66)"
                fill="#1bb09d"
              />
            </g>
          </svg>
        </div>
        <h1 className="display-4 fw-bold mb-3">Choose a Plan to Start</h1>

        <p className="text-muted fs-5 mb-4">
          Not sure where to start? Try free and then switch
        </p>
        <div className="d-flex align-items-center justify-content-center gap-2 mb-4">
          <Icon
            icon="solar:shield-check-bold"
            className="text-success"
            width={24}
            height={24}
          />
        </div>
      </div>

      <div className="pricingbox">
        {/* Stripe Pricing Table */}
        <div
          dangerouslySetInnerHTML={{
            __html: `<stripe-pricing-table 
                pricing-table-id="prctbl_1QmLoX4QP0ipCzg6JWavlMD0"
                publishable-key="pk_test_51QmHZh4QP0ipCzg6DOBgrj2iQySQ8jaEuYxIDldVLuWf3MxVep5WThCOLa5ubTuZWoVm2xY7Lo7CFfw427EJvoet00R7iiuvyH " customer-session-client-secret=${customersecret}>
               

              </stripe-pricing-table>`,
          }}
        />
      </div>

      {/* FAQ Section */}
      <div className="row justify-content-center mt-5 pt-5">
        <div className="col-12 col-lg-10">
          <h2 className="text-center mb-4">Frequently Asked Questions</h2>
          <div className="accordion" id="pricingFAQ">
            <div className="accordion-item">
              <h3 className="accordion-header">
                <button
                  className="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#faq1"
                >
                  Can I change plans later?
                </button>
              </h3>
              <div
                id="faq1"
                className="accordion-collapse collapse show"
                data-bs-parent="#pricingFAQ"
              >
                <div className="accordion-body">
                  Yes, you can upgrade or downgrade your plan at any time. Your
                  billing will be prorated automatically.
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h3 className="accordion-header">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#faq2"
                >
                  What payment methods do you accept?
                </button>
              </h3>
              <div
                id="faq2"
                className="accordion-collapse collapse"
                data-bs-parent="#pricingFAQ"
              >
                <div className="accordion-body">
                  We accept all major credit cards, including Visa, Mastercard,
                  and American Express. We also support payment via PayPal.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="text-center mt-5">
        <p className="text-muted mb-3">Still have questions?</p>
        <button className="btn btn-outline-primary">
          <Icon icon="solar:chat-round-dots-bold" className="me-2" />
          Contact Sales
        </button>
      </div>
    </div>
  );
}
