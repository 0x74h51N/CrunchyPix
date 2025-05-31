export function mockIntersectionObserver(
  isIntersectingItems?: Array<boolean>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): [jest.MockedObject<IntersectionObserver>, jest.Mocked<any>] {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const intersectionObserverInstanceMock: any = {
    root: null,
    rootMargin: '',
    thresholds: [0],
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
    takeRecords: jest.fn(),
  };

  class MockIntersectionObserver implements IntersectionObserver {
    readonly root: Element | Document | null = null;
    readonly rootMargin: string = '';
    readonly thresholds: ReadonlyArray<number> = [0];
    observe = jest.fn();
    unobserve = jest.fn();
    disconnect = jest.fn();
    takeRecords = jest.fn(() => []);

    constructor(callback: IntersectionObserverCallback) {
      if (isIntersectingItems === undefined) {
        callback([], this);
        return;
      }

      const rect = {
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        toJSON: () => '',
      };
      callback(
        isIntersectingItems.map((isIntersecting) => ({
          isIntersecting,
          intersectionRatio: 0,
          intersectionRect: rect,
          rootBounds: rect,
          boundingClientRect: rect,
          target: document.createElement('div'),
          time: 0,
        })),
        this,
      );
    }
  }

  window.IntersectionObserver = MockIntersectionObserver;

  return [
    intersectionObserverInstanceMock,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    window.IntersectionObserver as jest.Mocked<any>,
  ];
}
