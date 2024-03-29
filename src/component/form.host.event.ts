export enum FormHostEventType {
    submitted = 'submitted',
    submitting = 'submitting',
    error = 'error'
}

export interface FormHostEvent {
    type: FormHostEventType | string;
    data?: any
}