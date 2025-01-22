export interface Question {
    name: string;
    type: string;
    description?: string; // Renamed from 'more' to 'description' for clarity
    choices?: string[]; // For multiple or single-choice questions
    isSingleChoice?: boolean; // Only applicable if type is 'multichoice'
    range?: {
        min: number;
        max: number;
    }; // Only applicable if type is 'number'
    useRange?: boolean; // Only applicable if type is 'number'
}