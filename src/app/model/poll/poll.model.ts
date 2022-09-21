import { Option } from './option.model';
import { ReactType } from './react.model';

export class Poll {
  id: number;
  title: string;
  description: string;
  options: Array<Option>;
  multiVote: boolean;
  allowNewOption: boolean;

  selectedOptions: Array<number>;

  userReact: ReactType;
  reactCount: {
    LIKE: number;
    DISLIKE: number;
  }

  createdBy: string;
  createdTime: string;
}
