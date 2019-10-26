import * as factory from 'src/test-helpers/factory/state';
import * as selectors from 'src/app/cli/store/command/command.selectors';
import { AppState } from 'src/app/store';

describe('NGRX Selectors: Command', () => {
  let appState: AppState;

  beforeEach(() => {
    appState = factory.appState();
  });

  it('should select history sorted by initiated on descending', () => {
    const history = [
      { text: '2', initializedOn: new Date(2019, 0, 2) },
      { text: '1', initializedOn: new Date(2019, 0, 1) },
      { text: '3', initializedOn: new Date(2019, 0, 3) }
    ];
    appState.cli.command.history = history;

    expect(selectors.selectHistory(appState)).toEqual([history[2], history[0], history[1]]);
  });
});
