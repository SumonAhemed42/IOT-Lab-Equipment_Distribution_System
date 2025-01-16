export default function LineLoader() {
  return (
    <div className="lineLoaderId lineLoader">
      <div className="wrapper">
        <div className="b">
          <span className="b1"></span>
        </div>
        <div className="c">
          <span className="c1"></span>
        </div>
      </div>
    </div>
  );
}

export function showLoader() {
  const elements = document.querySelectorAll(".lineLoaderId");
  elements.forEach((el: any) => {
    if (el) el.style.display = "block";
  });
}

export async function hideLoader() {
  const elements = document.querySelectorAll(".lineLoaderId");
  elements.forEach((el: any) => {
    if (el) el.style.display = "none";
  });
}
