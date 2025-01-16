import React, { useState } from "react";
import ReactPaginate from "react-paginate";

const recordLength = 1000;

export default function PaginatedItems({
  itemsPerPage = 50,
}: {
  itemsPerPage?: number;
}) {
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const pageCount = Math.ceil(recordLength / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % recordLength;
    console.log("Selected page index =", event.selected);
    setItemOffset(newOffset);
  };

  return (
    <ReactPaginate
      className="pagination"
      previousLabel="Previous"
      breakLabel="..."
      nextLabel="Next"
      onPageChange={handlePageClick}
      pageRangeDisplayed={5}
      pageCount={pageCount}
      renderOnZeroPageCount={null}
    />
  );
}
