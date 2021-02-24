import taskFactory from './taskFactory';

test('returns empty task object', () => {
  expect(taskFactory()).toEqual({
    startTime: null,
    startTimeString: null,
    endTime: null,
    endTimeString: null,
    duration: null,
    description: null
  });
});