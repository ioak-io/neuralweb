import { BehaviorSubject, Subject } from 'rxjs';

const DisableContextBarCommand = new BehaviorSubject<boolean>(false);

export default DisableContextBarCommand;
