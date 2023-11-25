export interface ValidationData {
    /** Whether or not the data provided is valid or invalid */
    invalid: boolean;
    /** The error if the data is invalid */
    error?: string;
}