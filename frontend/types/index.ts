export interface CommentHandler {
  onToggleCommentLike: Function;
  onSubmitReplyComment: Function;
  onToggleReplyCommentLike: Function;
}

export interface PostHandler {
  onClickPhoto: Function;
  onSubmitComment: Function;
  onTogglePostLike: Function;
}

export interface Profile {
  id: string;
  thumbnail: string;
  username: string;
}

export interface Comment {
  profile: Profile;
  id: string;
  content: string;
  createdAt: string;
  isLike?: string;
  likeCnt?: string;
  replyComments: Comment[];
}

export interface Post {
  profile: Profile;
  id: string;
  content: string;
  createdAt: string;
  imgs: any[];
  comments: Comment[];
  likeCnt: string;
  isLike: string;
}
