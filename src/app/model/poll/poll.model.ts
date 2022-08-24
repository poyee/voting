import { Option } from './option.model';

export class Poll {
  id: number;
  title: string;
  description: string;
  options: Array<Option>;
  multiVote: boolean;
  allowNewOption: boolean;
}
