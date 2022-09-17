import { Option } from './option.model';

export class PollSummary {
  id: number;
  title: string;
  options: Array<Option>;

  voteCount: number;
  commentCount: number;

  createdBy: string;
  createdTime: string;
}
