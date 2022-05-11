import { BehaviorSubject, Subject } from 'rxjs';

interface MoveNoteCommandType {
  source: string;
  target: string;
}

const MoveNoteCommand = new Subject<MoveNoteCommandType>();

export default MoveNoteCommand;
