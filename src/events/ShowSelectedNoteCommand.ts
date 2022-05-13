import { BehaviorSubject, Subject } from 'rxjs';

interface ShowSelectedNoteCommandType {
  folderIdList: string[];
  noteReference: string;
}

const ShowSelectedNoteCommand = new Subject<ShowSelectedNoteCommandType>();

export default ShowSelectedNoteCommand;
