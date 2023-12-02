import { RootState } from "@/store";
import { rotateChange, setRotate } from "@/store/redux/mobileRotate";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

interface PhoneFrameProps {
  screenImage?: string;
  children?: React.ReactNode;
}

const PhoneFrame = ({ screenImage, children }: PhoneFrameProps) => {
  const dispatch = useDispatch();

  const [isRotating, setIsRotating] = useState(false);
  const isMobile = useSelector((state: RootState) => state.isMobile.mobile);
  const isRotate = useSelector(
    (state: RootState) => state.rotateChange.isRotate
  );
  const rotate = useSelector((state: RootState) => state.rotateChange.rotate);

  const handleClick = () => {
    if (isRotate) {
      dispatch(setRotate(false));
    } else if (!isRotate) {
      dispatch(setRotate(true));
    }
  };

  useEffect(() => {
    const rotationTimeout = setTimeout(() => {
      isRotate ? dispatch(rotateChange(true)) : dispatch(rotateChange(false));
    }, 500);

    return () => clearTimeout(rotationTimeout);
  }, [isRotate]);

  useEffect(() => {
    setIsRotating(true);
    const rotationTimeout = setTimeout(() => {
      setIsRotating(false);
    }, 500);

    return () => clearTimeout(rotationTimeout);
  }, [isRotate]);

  return (
    <div
      className={`relative delay-500 ${
        isRotate ? ` w-[600px] h-[300px]` : `w-[300px] h-[600px]`
      }
      ${!isRotate && "transition-all ease-in"} `}
    >
      <div
        className={`absolute w-full h-full top-0 left-0 z-10 flex flex-1 items-center justify-center pointer-events-none `}
      >
        <Image
          width={295}
          height={600}
          quality={100}
          loading="lazy"
          src="/phone.svg"
          alt="Phone Frame"
          style={{
            transform: `rotate(${isRotate ? 90 : 0}deg)`,
            transition: "transform 0.5s ease",
            zIndex: 50,
          }}
        />
      </div>
      <button onClick={handleClick}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 28 23"
          fill="none"
          stroke="white"
          stroke-width="1"
          stroke-linecap="round"
          stroke-linejoin="round"
          className={`absolute -right-28 -top-14 w-[170px] h-[150px] rounded-xl -z-10 path-animation ${
            isRotate
              ? "transform scale-x-[-1] rotate-[130deg] -top-24 -right-[70px]"
              : "-rotate-[30deg]"
          }   ${
            isRotating
              ? "opacity-0 "
              : "opacity-100 transition-all duration-100 delay-1000"
          }    z-20`}
        >
          <path d="M 0 0 C 7 0 14 4 14 12 L 16 9 L 14 12 L 12 10" />
        </svg>
        <svg
          width="200"
          height="50"
          viewBox="0 0 298.5 75.701"
          xmlns="http://www.w3.org/2000/svg"
          className={`absolute -right-28 top-10 w-[170px] h-[150px] rounded-xl path-animation-text ${
            isRotate ? "opacity-0" : "opacity-100 rotate-[90deg] delay-[3s] "
          }    z-20`}
        >
          <g
            id="svgGroup"
            stroke-linecap="round"
            fill-rule="evenodd"
            font-size="6pt"
            stroke="white"
            stroke-width="0.5mm"
            fill="white"
          >
            <path
              d="M 38.4 40 L 31.9 48.4 Q 32 48.4 32.2 48.6 A 7.033 7.033 0 0 0 32.283 48.761 Q 32.399 48.978 32.472 49.069 A 0.411 0.411 0 0 0 32.5 49.1 L 34.7 50.3 A 307.955 307.955 0 0 1 38.096 52.149 Q 40.157 53.288 41.9 54.3 Q 44.673 55.91 46.486 57.12 A 43.603 43.603 0 0 1 46.9 57.4 Q 50.7 59.7 55 59.7 L 56.15 59.7 Q 56.6 59.7 57 59.6 Q 57.23 59.983 57.577 60.659 A 46.949 46.949 0 0 1 57.8 61.1 A 23.772 23.772 0 0 1 58.2 61.937 Q 58.374 62.322 58.512 62.671 A 13.284 13.284 0 0 1 58.6 62.9 A 7.315 7.315 0 0 1 58.843 63.994 A 5.853 5.853 0 0 1 58.9 64.8 A 4.358 4.358 0 0 1 58.768 65.906 A 3.119 3.119 0 0 1 57.95 67.35 A 3.174 3.174 0 0 1 56.249 68.225 A 4.578 4.578 0 0 1 55.4 68.3 Q 54.862 68.3 54.56 68.241 A 1.3 1.3 0 0 1 54.4 68.2 Q 52.2 67.7 50.4 67.15 A 30.948 30.948 0 0 1 48.921 66.659 Q 48.032 66.338 47.3 66 Q 45.356 65.074 40.667 62.005 A 232.649 232.649 0 0 1 39.9 61.5 Q 37.9 60.1 36.2 59.05 A 49.144 49.144 0 0 0 34.77 58.198 Q 33.888 57.694 33.1 57.3 Q 31.4 56.3 29.5 55.7 Q 27.6 55.1 25.6 54.7 Q 24.922 54.549 23.561 54.399 A 62.905 62.905 0 0 0 22.6 54.3 Q 20.722 54.121 17.803 53.782 A 471.579 471.579 0 0 1 17.1 53.7 Q 15.6 53.6 14.5 53.5 Q 13.516 53.411 12.853 53.321 A 19.287 19.287 0 0 1 12.7 53.3 L 10.9 68.1 L 11 69.7 A 23.887 23.887 0 0 1 10.954 71.256 Q 10.803 73.548 10.169 74.474 A 2.111 2.111 0 0 1 10.15 74.5 A 2.367 2.367 0 0 1 9.183 75.272 Q 8.379 75.642 7.108 75.692 A 10.38 10.38 0 0 1 6.7 75.7 Q 4 75.7 2 74 A 5.86 5.86 0 0 1 0.633 72.36 A 5.231 5.231 0 0 1 0 69.8 A 129.321 129.321 0 0 1 0.095 64.764 A 109.625 109.625 0 0 1 0.2 62.6 A 89.58 89.58 0 0 1 0.489 58.933 A 71.341 71.341 0 0 1 0.8 56.3 A 109.24 109.24 0 0 1 6.26 35.495 A 144.396 144.396 0 0 1 13.7 18.7 A 37.694 37.694 0 0 1 30.378 2.314 A 46.403 46.403 0 0 1 31.2 1.9 Q 34.9 0 38.9 0 Q 42.9 0 46.35 2.05 Q 49.8 4.1 52.1 8 A 14.983 14.983 0 0 1 53.59 11.135 A 11.544 11.544 0 0 1 54.2 14.8 A 12.957 12.957 0 0 1 53.077 19.97 Q 52.328 21.704 51.08 23.452 A 24.091 24.091 0 0 1 50.6 24.1 A 384.933 384.933 0 0 0 48.838 26.362 Q 48.057 27.372 47.197 28.494 A 734.73 734.73 0 0 0 45.4 30.85 Q 42.4 34.8 38.4 40 Z M 123.1 36.8 L 121.1 36.3 A 20.262 20.262 0 0 1 120.137 36.077 Q 118.758 35.718 118.229 35.312 A 1.31 1.31 0 0 1 118.1 35.2 A 4.805 4.805 0 0 1 117.484 34.322 A 3.948 3.948 0 0 1 117.15 33.5 A 10.145 10.145 0 0 1 116.999 32.869 Q 116.861 32.208 116.74 31.303 A 35.803 35.803 0 0 1 116.7 31 A 3.637 3.637 0 0 1 117.513 29.788 Q 118.439 28.9 120 28.9 A 25.867 25.867 0 0 0 120.429 28.968 Q 120.769 29.019 121.05 29.05 Q 121.465 29.096 121.667 29.1 A 1.849 1.849 0 0 0 121.7 29.1 A 5.601 5.601 0 0 0 122.538 29.043 Q 123.888 28.838 124.2 27.9 A 4.678 4.678 0 0 0 124.407 27.142 Q 124.661 25.864 124.695 23.403 A 57.483 57.483 0 0 0 124.7 22.6 L 125 16.6 Q 125.1 12.7 125.6 4.8 A 6.815 6.815 0 0 1 125.805 3.228 Q 126.361 1.128 128.406 0.772 A 5.23 5.23 0 0 1 129.3 0.7 A 12.467 12.467 0 0 1 129.729 0.707 Q 130.069 0.719 130.35 0.75 A 6.672 6.672 0 0 1 130.991 0.852 A 5.804 5.804 0 0 1 131.2 0.9 Q 135.3 1.8 136.7 3.5 A 5.383 5.383 0 0 1 137.568 4.944 Q 137.888 5.757 137.888 6.637 A 5.062 5.062 0 0 1 137.85 7.25 Q 137.6 9.3 137.3 11.5 A 442.01 442.01 0 0 0 136.554 16.008 Q 134.671 27.794 135.235 29.371 A 0.372 0.372 0 0 0 135.4 29.6 A 0.937 0.937 0 0 0 135.678 30.253 Q 135.963 30.558 136.541 30.8 A 5.196 5.196 0 0 0 136.8 30.9 Q 138.1 31.3 140.8 31.2 Q 143.1 30.7 144.85 30.35 Q 146.6 30 147.8 29.9 A 0.697 0.697 0 0 1 147.933 29.852 Q 148.127 29.8 148.45 29.8 L 149.4 29.8 A 7.522 7.522 0 0 1 149.919 29.817 Q 150.69 29.87 150.997 30.098 A 0.69 0.69 0 0 1 151 30.1 Q 151.9 30.6 151.9 33.4 A 8.399 8.399 0 0 1 151.83 34.512 A 6.562 6.562 0 0 1 151.65 35.4 A 3.745 3.745 0 0 1 151.536 35.75 Q 151.314 36.322 151 36.4 Q 149.7 36.8 148.1 37.15 A 29.096 29.096 0 0 1 146.205 37.496 A 36.646 36.646 0 0 1 144.6 37.7 Q 143.088 37.975 141.859 38.227 A 79.756 79.756 0 0 0 140.8 38.45 A 77.463 77.463 0 0 0 139.671 38.706 Q 139.229 38.809 138.837 38.908 A 37.972 37.972 0 0 0 138.1 39.1 A 3.568 3.568 0 0 0 137.138 39.535 Q 136.751 39.779 136.364 40.134 A 7.658 7.658 0 0 0 135.9 40.6 A 7.086 7.086 0 0 0 135.361 41.259 Q 134.772 42.081 134.7 42.8 L 134.4 52.8 Q 134.3 56.7 134.7 60.6 A 20.229 20.229 0 0 0 134.917 62.267 Q 135.274 64.297 136 65.35 A 3.254 3.254 0 0 0 138.385 66.763 A 4.911 4.911 0 0 0 139 66.8 A 6.206 6.206 0 0 0 139.94 66.718 Q 140.954 66.561 142.404 66.103 A 36.038 36.038 0 0 0 143.6 65.7 Q 144.978 65.057 146.188 65.005 A 4.924 4.924 0 0 1 146.4 65 Q 147.975 65 148.744 66.302 A 4.141 4.141 0 0 1 149.1 67.1 A 3.678 3.678 0 0 1 149.371 68.063 A 3.292 3.292 0 0 1 149.4 68.5 A 2.881 2.881 0 0 1 149.219 69.542 A 2.584 2.584 0 0 1 148.45 70.6 A 6.584 6.584 0 0 1 147.514 71.251 Q 146.813 71.658 145.9 72 Q 142.9 73.1 139.8 73.2 A 33.549 33.549 0 0 1 137.094 73.086 A 41.466 41.466 0 0 1 135.3 72.9 A 10.678 10.678 0 0 1 131.642 71.729 A 12.901 12.901 0 0 1 130.65 71.15 A 8.982 8.982 0 0 1 128.787 69.518 Q 128.045 68.676 127.378 67.575 A 18.693 18.693 0 0 1 126.7 66.35 A 18.22 18.22 0 0 1 125.638 63.722 Q 124.74 60.947 124.217 57.025 A 60.102 60.102 0 0 1 124.2 56.9 Q 124.269 56.217 124.29 55.299 A 38.229 38.229 0 0 0 124.3 54.4 L 124.3 50.9 Q 124.3 47.7 124.15 44.4 Q 124 41.1 123.8 37.7 A 1.75 1.75 0 0 0 123.531 37.182 A 1.53 1.53 0 0 0 123.1 36.8 Z M 218.7 36.8 L 216.7 36.3 A 20.262 20.262 0 0 1 215.737 36.077 Q 214.358 35.718 213.829 35.312 A 1.31 1.31 0 0 1 213.7 35.2 A 4.805 4.805 0 0 1 213.084 34.322 A 3.948 3.948 0 0 1 212.75 33.5 A 10.145 10.145 0 0 1 212.599 32.869 Q 212.461 32.208 212.34 31.303 A 35.803 35.803 0 0 1 212.3 31 A 3.637 3.637 0 0 1 213.113 29.788 Q 214.039 28.9 215.6 28.9 A 25.867 25.867 0 0 0 216.029 28.968 Q 216.369 29.019 216.65 29.05 Q 217.065 29.096 217.267 29.1 A 1.849 1.849 0 0 0 217.3 29.1 A 5.601 5.601 0 0 0 218.138 29.043 Q 219.488 28.838 219.8 27.9 A 4.678 4.678 0 0 0 220.007 27.142 Q 220.261 25.864 220.295 23.403 A 57.483 57.483 0 0 0 220.3 22.6 L 220.6 16.6 Q 220.7 12.7 221.2 4.8 A 6.815 6.815 0 0 1 221.405 3.228 Q 221.961 1.128 224.006 0.772 A 5.23 5.23 0 0 1 224.9 0.7 A 12.467 12.467 0 0 1 225.329 0.707 Q 225.669 0.719 225.95 0.75 A 6.672 6.672 0 0 1 226.591 0.852 A 5.804 5.804 0 0 1 226.8 0.9 Q 230.9 1.8 232.3 3.5 A 5.383 5.383 0 0 1 233.168 4.944 Q 233.488 5.757 233.488 6.637 A 5.062 5.062 0 0 1 233.45 7.25 Q 233.2 9.3 232.9 11.5 A 442.01 442.01 0 0 0 232.154 16.008 Q 230.271 27.794 230.835 29.371 A 0.372 0.372 0 0 0 231 29.6 A 0.937 0.937 0 0 0 231.278 30.253 Q 231.563 30.558 232.141 30.8 A 5.196 5.196 0 0 0 232.4 30.9 Q 233.7 31.3 236.4 31.2 Q 238.7 30.7 240.45 30.35 Q 242.2 30 243.4 29.9 A 0.697 0.697 0 0 1 243.533 29.852 Q 243.727 29.8 244.05 29.8 L 245 29.8 A 7.522 7.522 0 0 1 245.519 29.817 Q 246.29 29.87 246.597 30.098 A 0.69 0.69 0 0 1 246.6 30.1 Q 247.5 30.6 247.5 33.4 A 8.399 8.399 0 0 1 247.43 34.512 A 6.562 6.562 0 0 1 247.25 35.4 A 3.745 3.745 0 0 1 247.136 35.75 Q 246.914 36.322 246.6 36.4 Q 245.3 36.8 243.7 37.15 A 29.096 29.096 0 0 1 241.805 37.496 A 36.646 36.646 0 0 1 240.2 37.7 Q 238.688 37.975 237.459 38.227 A 79.756 79.756 0 0 0 236.4 38.45 A 77.463 77.463 0 0 0 235.271 38.706 Q 234.829 38.809 234.437 38.908 A 37.972 37.972 0 0 0 233.7 39.1 A 3.568 3.568 0 0 0 232.738 39.535 Q 232.351 39.779 231.964 40.134 A 7.658 7.658 0 0 0 231.5 40.6 A 7.086 7.086 0 0 0 230.961 41.259 Q 230.372 42.081 230.3 42.8 L 230 52.8 Q 229.9 56.7 230.3 60.6 A 20.229 20.229 0 0 0 230.517 62.267 Q 230.874 64.297 231.6 65.35 A 3.254 3.254 0 0 0 233.985 66.763 A 4.911 4.911 0 0 0 234.6 66.8 A 6.206 6.206 0 0 0 235.54 66.718 Q 236.554 66.561 238.004 66.103 A 36.038 36.038 0 0 0 239.2 65.7 Q 240.578 65.057 241.788 65.005 A 4.924 4.924 0 0 1 242 65 Q 243.575 65 244.344 66.302 A 4.141 4.141 0 0 1 244.7 67.1 A 3.678 3.678 0 0 1 244.971 68.063 A 3.292 3.292 0 0 1 245 68.5 A 2.881 2.881 0 0 1 244.819 69.542 A 2.584 2.584 0 0 1 244.05 70.6 A 6.584 6.584 0 0 1 243.114 71.251 Q 242.413 71.658 241.5 72 Q 238.5 73.1 235.4 73.2 A 33.549 33.549 0 0 1 232.694 73.086 A 41.466 41.466 0 0 1 230.9 72.9 A 10.678 10.678 0 0 1 227.242 71.729 A 12.901 12.901 0 0 1 226.25 71.15 A 8.982 8.982 0 0 1 224.387 69.518 Q 223.645 68.676 222.978 67.575 A 18.693 18.693 0 0 1 222.3 66.35 A 18.22 18.22 0 0 1 221.238 63.722 Q 220.34 60.947 219.817 57.025 A 60.102 60.102 0 0 1 219.8 56.9 Q 219.869 56.217 219.89 55.299 A 38.229 38.229 0 0 0 219.9 54.4 L 219.9 50.9 Q 219.9 47.7 219.75 44.4 Q 219.6 41.1 219.4 37.7 A 1.75 1.75 0 0 0 219.131 37.182 A 1.53 1.53 0 0 0 218.7 36.8 Z M 281.3 71.4 Q 278.5 71.4 275.3 71 A 17.854 17.854 0 0 1 270.877 69.836 A 22.01 22.01 0 0 1 268.85 68.9 A 16.488 16.488 0 0 1 266.016 66.992 Q 264.768 65.962 263.527 64.603 A 32.515 32.515 0 0 1 262.4 63.3 Q 260.075 60.467 257.909 55.996 A 67.391 67.391 0 0 1 256.3 52.4 Q 255.9 50.8 255.7 49.3 Q 255.5 47.8 255.5 46.3 A 13.576 13.576 0 0 1 255.889 42.965 A 9.757 9.757 0 0 1 258.15 38.7 A 15.461 15.461 0 0 1 260.356 36.742 Q 262.829 34.906 266.7 33.2 Q 272.2 30.9 276.7 30.9 A 20.589 20.589 0 0 1 281.769 31.51 A 18.769 18.769 0 0 1 283.1 31.9 Q 292.7 34.9 292.7 40.1 Q 292.7 43.01 289.669 47.007 A 31.87 31.87 0 0 1 288.8 48.1 A 18.495 18.495 0 0 1 286.243 50.549 A 20.486 20.486 0 0 1 286.05 50.7 Q 284.864 51.619 283.208 52.655 A 56.794 56.794 0 0 1 282.15 53.3 Q 279.8 54.7 275.9 56.9 Q 274.8 57.6 272.6 57.7 Q 271.5 57.8 270.75 57.9 Q 270.132 57.983 269.752 58.065 A 4.936 4.936 0 0 0 269.6 58.1 A 7.555 7.555 0 0 0 273.124 62.937 A 9.388 9.388 0 0 0 273.4 63.1 Q 276.4 64.8 280.1 64.8 Q 283.2 64.8 285.8 63.4 Q 289.4 61.5 292.2 58.9 A 9.488 9.488 0 0 1 293.253 57.982 Q 293.828 57.556 294.383 57.315 A 3.544 3.544 0 0 1 295.8 57 A 2.078 2.078 0 0 1 297.199 57.544 A 3.322 3.322 0 0 1 297.7 58.1 A 6.09 6.09 0 0 1 298.462 60.532 A 7.556 7.556 0 0 1 298.5 61.3 Q 298.5 62.634 298.144 63.568 A 3.567 3.567 0 0 1 297.7 64.4 A 14.36 14.36 0 0 1 294.447 67.986 A 12.808 12.808 0 0 1 290.95 69.9 A 24.222 24.222 0 0 1 286.236 71.059 Q 284.066 71.379 281.627 71.399 A 39.892 39.892 0 0 1 281.3 71.4 Z M 194.7 68.6 L 194 67.4 Q 193.729 66.654 193.412 66.368 A 0.662 0.662 0 0 0 193.1 66.2 Q 192.2 66.2 191.1 67.05 A 15.195 15.195 0 0 0 189.9 68.077 A 12.249 12.249 0 0 0 189.2 68.8 A 18.544 18.544 0 0 1 188.3 69.644 A 16.377 16.377 0 0 1 188 69.9 Q 187.4 70.4 186.7 70.8 A 4.385 4.385 0 0 1 186.013 71.144 Q 184.832 71.627 182.524 72.059 A 44.249 44.249 0 0 1 182.3 72.1 A 30.477 30.477 0 0 1 181.717 72.178 Q 181.449 72.211 181.208 72.235 A 17.851 17.851 0 0 1 181.05 72.25 A 12.112 12.112 0 0 1 180.286 72.296 A 10.431 10.431 0 0 1 180 72.3 A 20.55 20.55 0 0 1 176.032 71.898 A 24.924 24.924 0 0 1 174.15 71.45 A 24.616 24.616 0 0 1 170.05 69.918 A 21.609 21.609 0 0 1 168.6 69.15 Q 166.576 67.976 165.339 66.639 A 8.924 8.924 0 0 1 164.8 66 Q 162.896 63.143 162.896 60.286 A 8.575 8.575 0 0 1 162.9 60 A 14.381 14.381 0 0 1 164.481 54.103 A 20.565 20.565 0 0 1 166.9 50.4 Q 168.866 48.057 170.574 46.457 A 25.836 25.836 0 0 1 171.65 45.5 Q 173.8 43.7 176.35 42.75 A 18.276 18.276 0 0 1 178.783 42.043 Q 180.475 41.669 182.5 41.5 Q 183.223 41.5 184.395 41.337 A 29.868 29.868 0 0 0 184.65 41.3 A 17.531 17.531 0 0 0 186.071 41.032 A 13.628 13.628 0 0 0 187.1 40.75 Q 188.2 40.4 188.2 40 A 3.293 3.293 0 0 0 187.633 38.17 A 4.831 4.831 0 0 0 187 37.4 Q 185.867 36.509 183.224 36.34 A 20.747 20.747 0 0 0 181.9 36.3 Q 181.2 36.3 180.15 36.35 Q 179.429 36.385 178.541 36.443 A 140.056 140.056 0 0 0 177.7 36.5 A 156.045 156.045 0 0 1 176.707 36.568 Q 176.316 36.594 175.964 36.614 A 80.25 80.25 0 0 1 175.3 36.65 Q 174.3 36.7 173.8 36.7 A 15.851 15.851 0 0 1 172.079 36.613 Q 170.05 36.391 168.9 35.6 Q 168.5 35.5 168.5 33.7 A 6.961 6.961 0 0 1 168.616 32.379 Q 168.754 31.665 169.058 31.142 A 2.713 2.713 0 0 1 170.6 29.9 Q 172.8 29.1 175 28.7 Q 177.2 28.3 179.5 28.2 Q 185.3 28.2 190.25 30.75 A 22.099 22.099 0 0 1 193.835 33.028 Q 196.135 34.844 197.5 37.1 Q 199.8 40.8 200.5 47.6 A 104.904 104.904 0 0 1 200.812 51.048 Q 200.944 52.812 201.04 54.772 A 179.063 179.063 0 0 1 201.1 56.1 Q 201.3 60.9 201.3 66.7 Q 201.3 69.9 200.4 70.4 A 3.937 3.937 0 0 1 199.838 70.695 Q 199.517 70.83 199.214 70.876 A 2.075 2.075 0 0 1 198.9 70.9 A 3.098 3.098 0 0 1 198.151 70.801 Q 197.803 70.714 197.419 70.551 A 7.33 7.33 0 0 1 196.8 70.25 Q 195.6 69.6 194.7 68.6 Z M 68.2 52.7 L 69.7 43.4 A 11.155 11.155 0 0 1 70.588 41.021 Q 71.452 39.357 72.835 38.37 A 6.86 6.86 0 0 1 73.5 37.95 Q 75.535 36.824 78.572 35.988 A 42.502 42.502 0 0 1 81 35.4 A 30.053 30.053 0 0 1 86.855 34.8 A 28.215 28.215 0 0 1 86.9 34.8 Q 96 34.8 102.4 41 A 12.801 12.801 0 0 1 102.452 41.052 Q 105.688 44.325 105.7 49.063 A 13.93 13.93 0 0 1 105.7 49.1 A 15.467 15.467 0 0 1 104.8 54.173 Q 104.123 56.129 102.938 58.16 A 29.023 29.023 0 0 1 102.3 59.2 A 37.72 37.72 0 0 1 98.681 63.88 Q 96.415 66.354 93.918 68.036 A 22.637 22.637 0 0 1 93.2 68.5 A 13.194 13.194 0 0 1 87.403 70.424 A 16.502 16.502 0 0 1 85.8 70.5 Q 81.3 70.5 77 68.8 Q 73.289 67.419 69.428 56.428 A 106.792 106.792 0 0 1 68.2 52.7 Z M 18.435 46.186 A 3.07 3.07 0 0 0 18.55 46.1 A 12.677 12.677 0 0 0 19.257 45.499 Q 20.235 44.61 21.6 43.1 Q 25.7 38.5 29.85 33.5 Q 34 28.5 37.2 24.1 A 17.837 17.837 0 0 0 38.626 21.884 A 16.331 16.331 0 0 0 38.75 21.65 A 21.815 21.815 0 0 0 39.247 20.626 Q 39.463 20.151 39.689 19.607 A 47.086 47.086 0 0 0 40.15 18.45 Q 40.725 16.957 41.563 14.614 A 383.313 383.313 0 0 0 42.1 13.1 A 0.545 0.545 0 0 0 42.139 12.984 Q 42.187 12.784 42.197 12.365 A 10.402 10.402 0 0 0 42.2 12.1 A 8.294 8.294 0 0 0 42.175 11.473 Q 42.152 11.171 42.108 10.828 A 18.911 18.911 0 0 0 42 10.1 A 143.351 143.351 0 0 0 41.907 9.544 Q 41.789 8.856 41.717 8.484 A 15.539 15.539 0 0 0 41.7 8.4 A 26.344 26.344 0 0 0 32.78 13.187 A 35.475 35.475 0 0 0 28.4 17.4 Q 22.5 24.1 15.4 46.8 Q 17.302 46.99 18.435 46.186 Z M 80.9 50.2 L 80.6 53.7 Q 80.6 54.4 80.65 55.9 Q 80.7 57.4 81 58.5 Q 82 61.6 83.6 62.4 Q 84.2 62.8 85.85 62.6 Q 87.5 62.4 88.5 61.6 A 8.631 8.631 0 0 0 89.129 60.964 Q 89.916 60.092 90.9 58.65 A 26.961 26.961 0 0 0 92.553 55.873 A 33.108 33.108 0 0 0 93.45 54 A 14.175 14.175 0 0 0 94.308 51.47 A 10.918 10.918 0 0 0 94.6 49 Q 94.6 45.8 92.8 43.15 Q 91 40.5 87.8 39.6 A 1.219 1.219 0 0 0 87.627 39.559 Q 87.322 39.506 86.732 39.501 A 15.016 15.016 0 0 0 86.6 39.5 Q 85.003 39.5 84.554 39.883 A 0.489 0.489 0 0 0 84.4 40.1 A 70.093 70.093 0 0 0 83.601 42.202 Q 83.208 43.283 82.804 44.489 A 113.076 113.076 0 0 0 82.75 44.65 L 80.9 50.2 Z M 176.9 65.3 Q 177.6 65.3 178.2 65.1 Q 180.5 64.4 182.85 63.55 Q 185.2 62.7 187.4 61.7 Q 188.31 61.246 189.053 60.212 A 7.174 7.174 0 0 0 189.2 60 L 190.2 58.5 A 0.818 0.818 0 0 0 190.284 58.318 Q 190.433 57.889 190.55 56.75 Q 190.7 55.3 190.6 54.4 A 0.792 0.792 0 0 1 190.518 54.221 Q 190.41 53.908 190.339 53.23 A 15.617 15.617 0 0 1 190.3 52.8 A 5.105 5.105 0 0 0 190.146 52.079 A 4.027 4.027 0 0 0 189.95 51.55 A 26.484 26.484 0 0 1 189.657 50.882 A 22.269 22.269 0 0 1 189.5 50.5 Q 189.089 49.841 188.27 49.25 A 7.629 7.629 0 0 0 187.9 49 A 4.883 4.883 0 0 0 187.264 48.655 Q 186.533 48.33 185.9 48.4 A 7.209 7.209 0 0 0 184.053 48.758 Q 183.249 49.019 182.397 49.467 A 13.833 13.833 0 0 0 181.8 49.8 A 15.61 15.61 0 0 0 178.948 51.983 A 19.179 19.179 0 0 0 177.7 53.3 A 22.565 22.565 0 0 0 175.832 55.903 A 18.078 18.078 0 0 0 174.75 57.95 Q 173.7 60.3 173.7 62.3 A 3.013 3.013 0 0 0 174.851 64.549 A 3.951 3.951 0 0 0 175.2 64.8 Q 176 65.3 176.9 65.3 Z M 268.9 50.5 A 282.213 282.213 0 0 0 272.006 48.162 Q 273.666 46.892 275.1 45.75 A 153.179 153.179 0 0 0 276.999 44.215 Q 277.737 43.608 278.388 43.054 A 75.429 75.429 0 0 0 279.6 42 A 1.623 1.623 0 0 0 279.942 41.469 Q 280.153 40.965 280.192 40.174 A 7.602 7.602 0 0 0 280.2 39.8 A 19.557 19.557 0 0 0 280.197 39.416 Q 280.182 38.644 280.1 38.4 A 2.006 2.006 0 0 0 279.733 37.814 A 2.676 2.676 0 0 0 279.4 37.5 Q 278.732 37.214 278.611 37.11 A 0.183 0.183 0 0 1 278.6 37.1 Q 276.8 36.9 274.6 38.4 A 17.941 17.941 0 0 0 272.358 40.226 Q 271.318 41.215 270.3 42.45 A 27.971 27.971 0 0 0 267.486 46.6 A 32.971 32.971 0 0 0 266.6 48.3 Q 267.4 52 268.9 50.5 Z"
              vector-effect="non-scaling-stroke"
            />
          </g>
        </svg>
      </button>
      <div
        className={`absolute w-full h-full top-0 left-0 overflow-hidden transition-all duration-500  ${
          isRotate ? "px-0 py-2 " : "px-2 py-0"
        }`}
        style={{
          transform: `rotate(${isRotating && isRotate ? 90 : 0}deg) rotate(${
            isRotating && !isRotate ? -90 : 0
          }deg)`,
          transition: isRotating ? "transform 0.5s ease" : "none",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default PhoneFrame;
