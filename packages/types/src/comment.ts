export type CreateCommentInput = {
  content: string;
  mentionedUserIds?: string[];
};

export type UpdateCommentInput = {
  content: string;
};