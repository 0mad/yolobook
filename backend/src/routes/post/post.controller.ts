import express from 'express';

class UserController {
  // 이미지를 업로드하고 이미지를 얻을 수 있는 주소를 json으로 응답
  public uploadImg = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    res.send('이미지를 업로드하고 이미지를 얻을 수 있는 주소를 json으로 응답');
  };

  // 계시글 리스트 가져오기
  public getPosts = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    res.send('계시글 리스트 가져오기');
  };

  // 특정 사용자 아이디의 게시글 리스트 가져오기
  public getPost = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    res.send('특정 사용자 아이디의 게시글 리스트 가져오기');
  };

  // 게시글 작성
  public wrtiePost = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    res.send('게시글 작성');
  };

  // 해시태그로 게시글 리스트 가져오기
  public getPostsWithHashTag = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    res.send('해시태그로 게시글 리스트 가져오기');
  };

  // 댓글 리스트 가져오기
  public getComments = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    res.send('댓글 리스트 가져오기');
  };

  // 댓글 작성
  public writeComment = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    res.send('댓글 작성');
  };

  // 댓글 삭제
  public deleteComment = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    res.send('댓글 삭제');
  };

  // 댓글 수정
  public modifyComment = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    res.send('댓글 수정');
  };

  // 답글 작성
  public writeReply = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    res.send('답글 작성');
  };

  // 답글 삭제
  public deleteReply = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    res.send('답글 삭제');
  };

  // 답글 수정
  public modifyReply = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    res.send('답글 수정');
  };

  // 좋아요 갯수 가져오기
  public getLikeCnt = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    res.send('좋아요 갯수 가져오기');
  };

  // 좋아요
  public setLike = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    res.send('좋아요');
  };

  // 좋아요 취소
  public cancelLike = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    res.send('좋아요 취소');
  };
}

export default new UserController();
