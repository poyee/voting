export class Comment {
  pollId: string;
  body: string;
  anonymous: boolean;
  createdBy: string;
  createdTime: string;
  votes: Array<number>;
}
