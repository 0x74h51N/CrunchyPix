export function mockIntersectionObserver(
  isIntersectingItems?: Array<boolean>,
): [jest.MockedObject<IntersectionObserver>, jest.MockedFn<any>] {
  const intersectionObserverInstanceMock: any = {
    root: null,
    rootMargin: '',
    thresholds: [0],
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
    takeRecords: jest.fn(),
  };

  window.IntersectionObserver = jest
    .fn()
    .mockImplementation(
      (callback: (entries: Array<IntersectionObserverEntry>) => void) => {
        if (isIntersectingItems === undefined) {
          callback([]);

          return intersectionObserverInstanceMock;
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
        );

        return intersectionObserverInstanceMock;
      },
    );

  return [
    intersectionObserverInstanceMock,
    window.IntersectionObserver as jest.MockedFn<any>,
  ];
}
