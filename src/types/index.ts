export type VoteValue = number | '?';

export type User = {
    id: string;
    name: string;
    vote?: VoteValue;
};