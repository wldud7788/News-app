export interface Comment {
  id: number;
  content: string;
  article_id: string;
  created_at: string;
  user_id: string;
  profiles: {
    avatar_url: string;
    email: string;
  };
}

export interface NewComment {
  content: string;
  article_id: string;
  user_id: string | undefined;
  profiles?: {
    avatar_url: string;
    email: string;
  };
}

export interface UpdateComment {
  updateId: number;
  content: string;
}
