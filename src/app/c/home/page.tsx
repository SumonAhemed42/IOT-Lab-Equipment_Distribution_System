"use client";
import GoogleIcons from "@/components/icons/GoogleIcons";
import PaginatedItems from "./Pagination";

export default function Page() {
  return (
    <div className="max-w-[50%] m-3 flex-1 bg-white rounded-lg overflow-hidden flex flex-col">
      {/* Header */}
      <div className="px-4 py-1 relative">
        <div className="flex items-center gap-2">
          <GoogleIcons.arrow.back className="hover:scale-125 cursor-pointer" />
        </div>
        <div className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] rounded-md text-gray-500 text-xs">
          Inventory List
        </div>
      </div>

      <div className="p-4 flex-1 overflow-y-auto customThinScrollBar">
        {[
          1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        ].map((_, i) => (
          <div key={i}>
            {i} - Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ut
            dolores fugiat repellat minima modi eum quis dolore quod placeat
            officiis! Nobis suscipit ex delectus id eum? In, quae. Nostrum
            dolores quos distinctio delectus, fugit optio voluptate sint,
            temporibus quia necessitatibus suscipit quis eos ut ad, aliquam
            omnis atque quibusdam minus consectetur quas magni. Laboriosam,
            maiores repellendus voluptatum natus sapiente numquam voluptates
            sit. Repudiandae qui rerum unde velit fugit corrupti repellat,
            blanditiis et sint quasi officiis! Quae consectetur eum minus
            voluptate maxime assumenda labore, neque odio, eius sint fugiat
            impedit ad tempore dignissimos incidunt recusandae doloribus minima
            obcaecati beatae. Quam, nisi?
          </div>
        ))}
        <br />
        <PaginatedItems />
      </div>
    </div>
  );
}
