// tslint:disable-next-line: max-line-length
import { Component, OnInit, ViewChild, ElementRef, NgZone, ChangeDetectionStrategy, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { CONSTANTS } from 'src/app/models/constants';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { take } from 'rxjs/operators';
import { FormBuilder, FormControl } from '@angular/forms';
import { TerminalNgStyle } from 'src/app/models/terminal-ng-style.model';
import { InitializedCommand } from '../store/command/command.reducers';

@Component({
  selector: 'app-terminal-prompt',
  templateUrl: './terminal-prompt.component.html',
  styleUrls: ['./terminal-prompt.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class TerminalPromptComponent implements OnInit {
  @ViewChild('terminalInput', { static: true }) terminalInput: ElementRef;
  @ViewChild('autosize', { static: false }) autosize: CdkTextareaAutosize;

  @Input() styles: TerminalNgStyle;
  @Input() history: InitializedCommand[];
  @Output() commandInitiated = new EventEmitter<string>();
  @Output() cleared = new EventEmitter<void>();

  commandCtrl: FormControl;

  private historyOrdinal: number = null;

  constructor(private ngZone: NgZone, private fb: FormBuilder) {
  }

  ngOnInit() {
    this.terminalInput.nativeElement.focus();
    this.commandCtrl = this.fb.control(null);
  }

  onKeydown(event: KeyboardEvent) {
    switch (event.code) {
      case CONSTANTS.KEY_CODES.TAB:
        event.preventDefault();
        break;
      case CONSTANTS.KEY_CODES.ENTER:
        this.onEnter();
        event.preventDefault();
        break;
      case CONSTANTS.KEY_CODES.UP:
        this.onUp();
        event.preventDefault();
        break;
      case CONSTANTS.KEY_CODES.DOWN:
        this.onDown();
        event.preventDefault();
        break;
      case CONSTANTS.KEY_CODES.K:
        if (event.metaKey) {
          this.onMetaK();
          event.preventDefault();
        }
        break;
      default:
        break;
    }
  }

  private onEnter() {
    this.resetHistoryPosition();
    this.commandInitiated.emit(this.commandCtrl.value);
    this.commandCtrl.reset();
  }

  private onUp() {
    if (!this.history || !this.history.length) {
      return;
    }

    if (this.historyOrdinal < this.history.length - 1) {
      this.historyOrdinal = this.historyOrdinal == null ? 0 : this.historyOrdinal + 1;
    } else {
      // shouldn't happen, but just in case
      this.historyOrdinal = this.history.length - 1;
    }

    this.commandCtrl.patchValue(this.history[this.historyOrdinal].text);
  }

  private onDown() {
    if (!this.history || !this.history.length) {
      return;
    }

    if (this.historyOrdinal > 0) {
      this.historyOrdinal = this.historyOrdinal == null ? this.history.length - 1 : this.historyOrdinal - 1;
      this.commandCtrl.patchValue(this.history[this.historyOrdinal].text);
    } else {
      this.resetHistoryPosition();
      this.commandCtrl.patchValue(null);
    }
  }

  private onMetaK() {
    this.cleared.emit();
  }

  private resetHistoryPosition() {
    this.historyOrdinal = null;
  }

  private triggerResize() {
    this.ngZone.onStable.pipe(take(1))
      .subscribe(() => this.autosize.resizeToFitContent(true));
  }
}
