export class ReviewModel {
    id: number;
    dateCreated: Date;
    productId: number;
    rating: number;
    review: string;
    reviewer: string;
    reviewerEmail: string;
    status: string;
    verified: boolean;

    constructor() {}

    static fromJson(object: any): ReviewModel {
        const review = new ReviewModel();

        review.id = 'id' in object ? parseInt(object.id, 10) : 0;
        review.dateCreated = 'date_created' in object ? object.date_created : Date.now();
        review.productId = 'product_id' in object ? object.product_id : 0;
        review.rating = 'rating' in object ? object.rating : 0;
        review.review = 'review' in object ? object.review.replace(/<p>/g, '').replace(/<\/p>/g, '').replace(/\n/g, '') : '';
        review.reviewer = 'reviewer' in object ? object.reviewer : '';
        review.reviewerEmail = 'reviewer_email' in object ? object.reviewer_email : '';
        review.status = 'status' in object ? object.status : '';
        review.verified = 'verified' in object ? object.verified : false;

        return review;
    }
}