import { systemReportError, systemCleanError } from 'actions/systemError';

describe('actions/systemError', () => {
  it('systemReportError should works fine', () => {
    const expectResult = systemReportError('appException message');
    expect(expectResult).toEqual({
      type: '@@system/REPORT_ERROR',
      payload: 'appException message',
    });
  });

  it('systemCleanError should works fine', () => {
    const expectResult = systemCleanError();
    expect(expectResult).toEqual({
      type: '@@system/CLEAN_ERROR',
    });
  });
});
