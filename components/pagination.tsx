"use client";

import {
  Pagination as PaginationComponent,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { link } from "fs";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useId } from "react";

type PaginationProps = {
  links: {
    url: string;
    label: string;
    active: boolean;
  }[];
};

export default function Pagination({ links }: PaginationProps) {
  const itemId = useId();

  const searchParams = useSearchParams();

  const pathname = usePathname();

  const { replace } = useRouter();

  function handleClickPage(pageNumber: number) {
    const params = new URLSearchParams(searchParams);

    if (pageNumber > 1) {
      params.set("page", String(pageNumber));
    } else {
      params.delete("page");
    }

    replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <PaginationComponent>
      <PaginationContent>
        <PaginationItem
          className={`${
            links[0].url ? "cursor-pointer " : "pointer-events-none opacity-50"
          }`}
          onClick={() =>
            handleClickPage(Number(searchParams.get("page") || 1) - 1)
          }
        >
          <PaginationPrevious />
        </PaginationItem>
        {links.map((link) => {
          if (
            link.label.includes("Anterior") ||
            link.label.includes("Próximo")
          ) {
            return null;
          }

          if (link.label.includes("...")) {
            return (
              <PaginationItem>
                <PaginationEllipsis
                  key={itemId}
                  className="hidden md:inline-flex"
                ></PaginationEllipsis>
              </PaginationItem>
            );
          }
          return (
            <PaginationItem className="cursor-pointer" key={link.url}>
              <PaginationLink
                onClick={() => handleClickPage(Number(link.label))}
                isActive={link.active}
                dangerouslySetInnerHTML={{ __html: link.label }}
              ></PaginationLink>
            </PaginationItem>
          );
        })}

        <PaginationItem
          className={`${
            links[links.length - 1].url
              ? "cursor-pointer"
              : "pointer-events-none opacity-50"
          }`}
          onClick={() =>
            links[links.length - 1].url &&
            handleClickPage(Number(searchParams.get("page") || 1) + 1)
          }
        >
          <PaginationNext />
        </PaginationItem>
      </PaginationContent>
    </PaginationComponent>
  );
}
