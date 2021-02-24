import formatTime from './formatTime';

test('correctly formats time', () => {
  expect(formatTime(1000)).toEqual('00:01:100');
  expect(formatTime(43123455)).toEqual('58:43:45');
});
