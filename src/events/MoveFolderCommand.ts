import { BehaviorSubject, Subject } from 'rxjs';

interface MoveFolderCommandType {
  source: string;
  target: string;
}

const MoveFolderCommand = new Subject<MoveFolderCommandType>();

export default MoveFolderCommand;
