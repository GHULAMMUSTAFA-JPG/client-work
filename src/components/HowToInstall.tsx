import Image from "next/image";
import React from "react";

const HowToInstall = () => {
  return (
    <div className="accordion " id="installAccordion">
      <div className="accordion-item border rounded">
        <h2 className="accordion-header" id="headingInstall">
          <button
            className="accordion-button collapsed d-flex  gap-2  h-25"
            style={{ background: "#fff" }}
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseInstall"
            aria-expanded="false"
            aria-controls="collapseInstall"
          >
            <Image
              src={"/assets/images/chrome.png"}
              width={28}
              height={28}
              alt="chrome"
            />
            <p className="mt-2">
              How to Install and Use Limelight’s Chrome Extension to Share Post
              Analytics with Brands
            </p>
          </button>
        </h2>
        <div
          id="collapseInstall"
          className="accordion-collapse collapse"
          aria-labelledby="headingInstall"
          data-bs-parent="#installAccordion"
        >
          <div className="bg-white px-4 py-3 ">
            <ol className="custom-list">
              <li>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  Install the Chrome Extension
                </a>{" "}
                and pin it to your Chrome topbar. Ensure you’re logged into
                LinkedIn already in this Chrome browser.
              </li>
              <li>
                Click on the Extension, and click the Go Track Posts button. It
                should open your LinkedIn feed. Alternatively, you can go to
                your LinkedIn post feed manually.
              </li>
              <li>
                Click the Track Post button on any of your LinkedIn posts to
                track them on Limelight. This will open the LinkedIn post in a
                new page in your browser.
              </li>
              <li>
                Add the post’s analytics to a brand’s campaign on this Analytics
                page by clicking the Assign to Campaign button.
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowToInstall;
