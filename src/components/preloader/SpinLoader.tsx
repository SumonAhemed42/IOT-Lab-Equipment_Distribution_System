/*****
 * Spin preloader type 1
 * Google's used blue spin preloader design
 ******/
export default function SpinLoader({ size = 34 }: { size?: number }) {
  return (
    <div className="w-fit spinLoader">
      <div
        className="loader"
        style={{
          width: size + "px",
          height: size + "px",
        }}
      >
        <svg className="circularLoader" viewBox="25 25 50 50">
          <circle className="loaderPath" cx="50" cy="50" r="20"></circle>
        </svg>
      </div>
    </div>
  );
}

/*****
 * Spin preloader type 11
 * Google's used blue spin preloader design
 ******/
export function SpinLoader11({ size = 34 }: { size?: number }) {
  return (
    <div
      className="relative"
      style={{
        width: size + "px",
        height: size + "px",
      }}
    >
      <div className="w-fit spinLoader11Bg absolute top-0 left-0">
        <div
          className="loader"
          style={{
            width: size + "px",
            height: size + "px",
          }}
        >
          <svg className="circularLoader" viewBox="25 25 50 50">
            <circle className="loaderPath" cx="50" cy="50" r="20"></circle>
          </svg>
        </div>
      </div>
      <div className="w-fit spinLoader absolute top-0 left-0">
        <div
          className="loader"
          style={{
            width: size + "px",
            height: size + "px",
          }}
        >
          <svg className="circularLoader" viewBox="25 25 50 50">
            <circle className="loaderPath" cx="50" cy="50" r="20"></circle>
          </svg>
        </div>
      </div>
    </div>
  );
}

/*****
 * Spin preloader type 2
 ******/
export function SpinLoader2() {
  return <div className="spinLoader2"></div>;
}

/*****
 * Spin preloader type 3
 ******/
export function SpinLoader3({ size = 26 }: { size?: number }) {
  return (
    <div
      className="spinLoader3"
      style={{
        width: size + "px",
      }}
    ></div>
  );
}

/*****
 * Spin preloader type 4
 ******/
export function SpinLoader4({ size = 28 }: { size?: number }) {
  return (
    <img
      src="/image/spin-loader-4.svg"
      width={size}
      height={size}
      alt="loader"
    />
  );
}
