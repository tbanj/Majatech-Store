import { Inquiry } from '../../common/models/inquiry.model';

export class ContactService {
    private inquiry: Inquiry[] = [];

    getInquiries() {
        return this.inquiry.slice();
    }

    addInquiry(inquiry: Inquiry) {
        this.inquiry.push(inquiry);
    }

    getInquiry(index: number) {
        return this.inquiry[index];
    }
}
