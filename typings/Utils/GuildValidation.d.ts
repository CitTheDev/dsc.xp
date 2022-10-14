/**
 * Checks to make sure that the correct options have been given
 */
export declare function validateOptions(options: {
    guildId: string;
    limit: number;
}): {
    invalid: boolean;
    error?: string;
};
