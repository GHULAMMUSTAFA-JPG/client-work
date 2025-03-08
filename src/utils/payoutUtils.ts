import { formatDate } from ".";
import { Status } from "../types";

export function calculatePayouts(posts: any[]) {
  let upcomingPayout = 0;
  let paidPayout = 0;

  type PayoutItem = {
    postTitle: string;
    budget: number;
    date: string;
  };

  const upcomingPayoutsList: PayoutItem[] = [];
  const paidPayoutsList: PayoutItem[] = [];

  posts.forEach((post) => {
    if (
      [
        Status.Approved,
        Status.PostImpressionUploaded,
        Status.Published,
        Status.PaymentProcessing,
      ].includes(post.Status)
    ) {
      upcomingPayout += post.Budget;
      upcomingPayoutsList.push({
        postTitle: post.Post_Title,
        budget: post.Budget,
        date: formatDate(post.Due_Date || post.Submission_Date),
      });
    } else if ([Status.Paid, Status.Completed].includes(post.Status)) {
      paidPayout += post.Budget;
      paidPayoutsList.push({
        postTitle: post.Post_Title,
        budget: post.Budget,
        date: formatDate(post.Proposal_Update_Date || post.Submission_Date),
      });
    }
  });

  return {
    upcomingPayout,
    paidPayout,
    upcomingPayoutsList,
    paidPayoutsList,
  };
}
