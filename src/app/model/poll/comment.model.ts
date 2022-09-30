export class Comment {
  id: number;
  pollId: string;
  body: string;
  anonymous: boolean;
  createdBy: string;
  createdTime: string;
  votes: Array<number>;
  editable: boolean;
}
