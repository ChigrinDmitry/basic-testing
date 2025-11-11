import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import { existsSync } from 'fs';
import { readFile } from 'fs/promises';
import { join } from 'path';

jest.mock('fs');
jest.mock('fs/promises');
jest.mock('path');

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const callback = jest.fn();
    const setTimeoutSpy = jest.spyOn(global, 'setTimeout');
    doStuffByTimeout(callback, 1000);
    expect(setTimeoutSpy).toHaveBeenCalledWith(callback, 1000);
    setTimeoutSpy.mockRestore();
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    doStuffByTimeout(callback, 1000);
    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const callback = jest.fn();
    const setIntervalSpy = jest.spyOn(global, 'setInterval');
    doStuffByInterval(callback, 1000);
    expect(setIntervalSpy).toHaveBeenCalledWith(callback, 1000);
    setIntervalSpy.mockRestore();
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    doStuffByInterval(callback, 1000);
    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(1);
    jest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(2);
    jest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(3);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const joinMock = join as jest.MockedFunction<typeof join>;
    joinMock.mockReturnValue('/mocked/path');
    (existsSync as jest.MockedFunction<typeof existsSync>).mockReturnValue(false);
    
    await readFileAsynchronously('test.txt');
    
    expect(joinMock).toHaveBeenCalled();
  });

  test('should return null if file does not exist', async () => {
    const joinMock = join as jest.MockedFunction<typeof join>;
    joinMock.mockReturnValue('/mocked/path');
    (existsSync as jest.MockedFunction<typeof existsSync>).mockReturnValue(false);
    
    const result = await readFileAsynchronously('nonexistent.txt');
    
    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const joinMock = join as jest.MockedFunction<typeof join>;
    const mockPath = '/mocked/path/file.txt';
    joinMock.mockReturnValue(mockPath);
    (existsSync as jest.MockedFunction<typeof existsSync>).mockReturnValue(true);
    (readFile as jest.MockedFunction<typeof readFile>).mockResolvedValue(Buffer.from('file content'));
    
    const result = await readFileAsynchronously('file.txt');
    
    expect(result).toBe('file content');
    expect(readFile).toHaveBeenCalledWith(mockPath);
  });
});
